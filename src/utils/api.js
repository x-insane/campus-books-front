import config from '../config/config'
import axios from 'axios/index';

export default {
    post (url, data) {
        return axios.post(config.api_url + url, data).then(res => res.data)
    },

    geetest_init () {
        return axios.post(config.api_url + "/geetest/init")
            .then(res => res.data)
    },
    login (phone, captcha) {
        return axios.post(config.api_url + "/user/login", { phone, captcha })
            .then(res => res.data)
    },
    login_send_message (data) {
        return axios.post(config.api_url + "/user/login/send_message", data)
            .then(res => res.data)
    },

    fetch_book_detail (book_id) {
        return axios.post(config.mock_api_url + "/books/detail", { book_id })
            .then(res => res.data)
    },
    fetch_order_detail (order_id) {
        return axios.post(config.mock_api_url + "/order/query", { order_id })
            .then(res => res.data)
    },

    upload_book_order (data) {
        return this.post("/books/upload", data)
    },
    upload_book_query_all () {
        return this.post("/books/upload/query_all")
    },
    upload_book_detail (upload_id) {
        return this.post("/books/upload/detail", { upload_id })
    },
    upload_book_wxpay (upload_id) {
        return this.post("/books/upload/wxpay", { upload_id })
    },
    upload_book_wxpay_query (upload_id) {
        return this.post("/books/upload/wxpay/query", { upload_id })
    },
}