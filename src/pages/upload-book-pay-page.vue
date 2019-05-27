<template>
    <f7-page hide-navbar-on-scroll>
        <!-- header -->
        <f7-navbar :title="final_book ? final_book.name : '校园二手书交易平台'" back-link="back">
            <f7-link slot="nav-right" iconF7="icon-bars" panel-open="right"></f7-link>
        </f7-navbar>

        <f7-list media-list v-if="final_book">
            <f7-list-item
                :title="final_book.name"
                :after="'¥ ' + final_book.price"
                :subtitle="final_book.isbn"
                :text="final_book.remark"
                @click="detail_page(final_book)"
            >
                <img slot="media" :src="final_book.cover" width="80" alt="cover" />
            </f7-list-item>
        </f7-list>

        <f7-list v-if="final_book">
            <f7-list-item :title="'挂售天数：' + final_book.lease + ' 天'">
            </f7-list-item>
            <f7-list-item :title="'挂售费用：' + final_book.upload_fee + ' 元'">
            </f7-list-item>
            <f7-list-item :title="'支付状态：' + (final_book.pay_time ? '已支付' : '未支付')">
            </f7-list-item>
        </f7-list>

        <f7-row v-if="final_book && !final_book.pay_time">
            <f7-col style="padding: 1.6rem;">
                <img @click="request_alipay" :src="logo_alipay" alt="支付宝支付" style="width: 100%; margin-top: .1rem">
            </f7-col>
            <f7-col style="padding: 1.4rem;">
<!--                <f7-link popover-open=".popover-wxpay">-->
                    <img @click="request_wxpay" :src="logo_wxpay" alt="微信支付" style="width: 100%">
<!--                </f7-link>-->
            </f7-col>
        </f7-row>

<!--        <f7-popover @popover:closed="stop_wxpay" class="popover-wxpay" style="width: 110px;">-->
<!--            <img v-if="wxpay_qrcode" :src="wxpay_qrcode" alt="微信支付二维码">-->
<!--        </f7-popover>-->
    </f7-page>
</template>

<script>
    import api from '../utils/api';
    import config from "../config/config";
    import logo_alipay from '../assets/img/alipay.png';
    import logo_wxpay from '../assets/img/wxpay.png';

    export default {
        props: [ 'book' ],

        wxpay_check_timer: null,

        data() {
            return {
                remote: {},
                logo_wxpay,
                logo_alipay,
                // wxpay_qrcode: null
            }
        },

        computed: {
            final_book() {
                return this.book || this.remote.book
            },
            final_seller() {
                return this.seller || this.remote.seller
            },
            book_photos() {
                return [ this.final_book.cover, ...this.final_book.photos ]
            }
        },

        created () {
            if (!this.book) {
                let $this = this;
                api.upload_book_detail(this.$f7route.params.upload_id).then(data => {
                    if (data && data.error === 0) {
                        $this.remote = {
                            book: data.book
                        }
                    }
                    else
                        $this.$f7.dialog.alert(data.msg);
                })
            }
        },

        // destroyed() {
        //     if (this.wxpay_check_timer) {
        //         clearTimeout(this.wxpay_check_timer);
        //         this.wxpay_check_timer = null;
        //     }
        // },

        methods: {
            detail_page (book) {
                this.$f7router.navigate('/books/upload/detail/' + book.id, {
                    props: { book }
                })
            },

            request_alipay () {
                location.href = config.root_url + "/redirect/alipay?upload_id=" + this.$f7route.params.upload_id
            },

            request_wxpay () {
                location.href = config.root_url + "/redirect/wxpay?upload_id=" + this.$f7route.params.upload_id
                // let $this = this;
                // api.upload_book_wxpay(this.$f7route.params.upload_id).then(data => {
                //     if (data && data.error === 0) {
                //         if (data.method === "jsapi") {
                //             this.call_jsapi_wxpay(data.parameter);
                //         } else {
                //             this.wxpay_qrcode = config.root_url + "/util/qrcode?url=" + encodeURI(data.code_url);
                //             if (this.wxpay_check_timer) {
                //                 clearTimeout(this.wxpay_check_timer);
                //                 this.wxpay_check_timer = null;
                //             }
                //             this.wxpay_check_timer = setTimeout(function loop() {
                //                 api.upload_book_wxpay_query($this.$f7route.params.upload_id).then(res => {
                //                     if (res && res.error === 0) {
                //                         if (res.pay)
                //                             location.reload();
                //                         else
                //                             $this.wxpay_check_timer = setTimeout(loop, 1000);
                //                     } else {
                //                         location.reload();
                //                     }
                //                 })
                //             }, 1000);
                //         }
                //     }
                //     else
                //         $this.$f7.dialog.alert(data.msg);
                // })
            },
            // stop_wxpay () {
            //     if (this.wxpay_check_timer) {
            //         clearTimeout(this.wxpay_check_timer);
            //         this.wxpay_check_timer = null;
            //     }
            // },
            // jsapi_wxpay_callback (parameter) {
            //     return () => {
            //         window.WeixinJSBridge.invoke(
            //             'getBrandWCPayRequest',
            //             parameter,
            //             res => {
            //                 window.WeixinJSBridge.log(res.err_msg);
            //                 alert(res.err_code + res.err_desc + res.err_msg);
            //             }
            //         );
            //     }
            // },
            // call_jsapi_wxpay (parameter) {
            //     if (typeof WeixinJSBridge == "undefined") {
            //         if (document.addEventListener )
            //             document.addEventListener('WeixinJSBridgeReady', this.jsapi_wxpay_callback(parameter), false);
            //         else if (document.attachEvent) {
            //             document.attachEvent('WeixinJSBridgeReady', this.jsapi_wxpay_callback(parameter));
            //             document.attachEvent('onWeixinJSBridgeReady', this.jsapi_wxpay_callback(parameter));
            //         }
            //     } else
            //         this.jsapi_wxpay_callback(parameter)();
            // }
        }
    }
</script>