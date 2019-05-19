<template>
    <f7-page>
        <!-- header -->
        <f7-navbar title="我的购物车" back-link="back">
            <f7-link slot="nav-right" iconF7="icon-bars" panel-open="right"></f7-link>
        </f7-navbar>

        <!-- main -->
        <f7-list v-for="seller of shopping_cart" media-list :key="seller.seller_id">
            <f7-list-item group-title>
                <span>华南理工大学 - 大学城校区 - C12 - {{ seller.nickname }}</span>
            </f7-list-item>
            <book-list-item v-for="(book, index) in seller.books" :key="index"
                            :book="book" :nickname="seller.nickname"
                            @want-count-change="update_book_want_count({ seller, book, count: $event })">
            </book-list-item>
            <f7-button round @click="do_submit_order(seller.seller_id)">
                结算 (¥{{seller_total_price(seller).toFixed(2)}})
            </f7-button>
        </f7-list>

        <!-- empty list -->
        <p style="font-size: 15px; text-align: center" v-if="!shopping_cart || Object.keys(shopping_cart).length === 0">空空如也～</p>
    </f7-page>
</template>

<script>
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
    import BookListItem from '../components/book-list-item';

    export default {
        data() {
            return {
                loading: false
            }
        },

        computed: {
            ...mapState([
                'shopping_cart'
            ]),
            ...mapGetters([
                'shopping_cart_count',
                'seller_total_price'
            ])
        },

        components: {
            BookListItem
        },

        methods: {
            ...mapMutations([
                'update_book_want_count'
            ]),
            ...mapActions([
                'submit_order'
            ]),
            do_submit_order (seller_id) {
                const $this = this;
                $this.$f7.dialog.preloader('提交中');
                this.submit_order(seller_id).then(order_id => {
                    $this.$f7.dialog.close();
                    $this.$f7router.navigate('/order/' + order_id);
                })
            }
        }
    }
</script>