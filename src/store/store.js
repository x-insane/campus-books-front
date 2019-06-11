import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import config from '../config/config';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        books: [],
        shopping_cart: {},
        orders: [],
        user: null
    },
    getters: {
        shopping_cart_count: state => {
            let total = 0;
            Object.keys(state.shopping_cart).forEach(seller_id => {
                Object.keys(state.shopping_cart[seller_id].books).forEach(book_id => {
                    total += state.shopping_cart[seller_id].books[book_id].want_count || 0
                })
            });
            return total
        },
        seller_total_price: state => seller => {
            let price = 0.0;
            let seller_map = state.shopping_cart[seller.seller_id];
            if (seller_map) {
                Object.keys(seller_map.books).forEach(book_id => {
                    let book = seller_map.books[book_id];
                    price += book.price * book.want_count
                })
            }
            return price
        }
    },
    mutations: {
        update_books (state, books) {
            state.books = books
        },

        update_shopping_cart (state, shopping_cart) {
            state.shopping_cart = shopping_cart
        },
        delete_shopping_cart (state, seller_id) {
            Vue.delete(state.shopping_cart, seller_id);
            if (window.localStorage)
                localStorage.setItem("shopping_cart", JSON.stringify(state.shopping_cart));
        },

        update_book_want_count (state, { seller, book, count }) {
            book.want_count = count;
            if (count > 0) {
                state.shopping_cart = {
                    ...state.shopping_cart,
                    [seller.seller_id]: {
                        seller_id: seller.seller_id,
                        nickname: seller.nickname,
                        // loading: false,
                        books: {
                            ...(state.shopping_cart[seller.seller_id] || { books: {} }).books,
                            [book.book_id]: book
                        }
                    }
                };
            } else {
                delete state.shopping_cart[seller.seller_id].books[book.book_id];
                if (Object.keys(state.shopping_cart[seller.seller_id].books).length === 0)
                    delete state.shopping_cart[seller.seller_id];
                state.shopping_cart = { ...state.shopping_cart }
            }
            if (window.localStorage)
                localStorage.setItem("shopping_cart", JSON.stringify(state.shopping_cart));
        },

        update_orders (state, orders) {
            state.orders = orders
        },
    },
    actions: {
        fetch_books ({ commit }) {
            return new Promise((resolve, reject) => {
                axios.post(config.api_url + "/books/list")
                    .then(res => {
                        if (res.data && res.data.error === 0) {
                            if (window.localStorage) {
                                let shopping_cart = JSON.parse(localStorage.getItem("shopping_cart") || "{}");
                                commit('update_shopping_cart', shopping_cart);
                                res.data.data.forEach(seller => {
                                    let seller_map = shopping_cart[seller.seller_id];
                                    if (seller_map) {
                                        seller.books.forEach(book => {
                                            book.want_count = (seller_map.books[book.book_id] || {}).want_count || 0
                                        })
                                    } else {
                                        seller.books.forEach(book => {
                                            book.want_count = 0
                                        })
                                    }
                                })
                            }
                            commit('update_books', res.data.data);
                            resolve()
                        }
                        else
                            reject(res.data.msg);
                    }).catch (err => {
                        reject ("request fail! " + err, err)
                    })
            })
        },
        fetch_orders ({ commit }) {
            return new Promise((resolve, reject) => {
                axios.post(config.api_url + "/books/order/list")
                    .then(res => {
                        if (res.data && res.data.error === 0) {
                            commit('update_orders', res.data.orders);
                            resolve()
                        }
                        else
                            reject(res.data.msg);
                    }).catch (err => {
                        reject ("request fail!", err)
                    })
            })
        },
        submit_order ({ commit, state, dispatch }, seller_id) {
            return new Promise((resolve, reject) => {
                axios.post(config.api_url + "/books/order", {
                    seller: seller_id,
                    books: Object.keys(state.shopping_cart[seller_id].books).map(book_id => {
                        return {
                            book: Number.parseInt(book_id),
                            count: state.shopping_cart[seller_id].books[book_id].want_count
                        }
                    })
                }).then(res => {
                    if (res.data && res.data.error === 0) {
                        commit('delete_shopping_cart', seller_id);
                        dispatch("fetch_books");
                        resolve(res.data.order_id);
                    }
                    else
                        reject(res.data.msg);
                }).catch (err => {
                    reject ("request fail!", err)
                });
            })
        },
        fetch_user_info ({ state }, flush) {
            return new Promise((resolve, reject) => {
                if (state.user && !flush) {
                    resolve();
                    return;
                }
                axios.post(config.api_url + "/user/info").then(res => {
                    if (res.data && res.data.error === 0) {
                        state.user = res.data.user;
                        resolve();
                    } else
                        reject(res.data.msg);
                }).catch (err => {
                    reject ("request fail!", err)
                });
            })
        }
    }
});

export default store;