import config from '../config/config'
import axios from 'axios/index';

export default {
    login (phone, captcha) {
        return axios.post(config.api_url + "/user/login", { phone, captcha })
            .then(res => res.data)
    },
    login_send_message (phone) {
        return axios.post(config.api_url + "/user/login/captcha", { phone })
            .then(res => res.data)
    },

    fetch_book_detail (book_id) {
        return axios.post(config.api_url + "/books/detail", { book_id })
            .then(res => res.data)
    },
    fetch_order_detail (order_id) {
        return axios.post(config.api_url + "/order/query", { order_id })
            .then(res => res.data)
    }
}