<template>
    <f7-page>
        <!-- header -->
        <f7-navbar title="订单详情" back-link="back">
            <f7-link slot="nav-right" iconF7="icon-bars" panel-open="right"></f7-link>
        </f7-navbar>

        <!-- main -->
        <f7-list v-if="final_order" media-list>
            <f7-list-item group-title>
                <span>订单信息</span>
            </f7-list-item>
            <f7-list-item>订单ID：{{ final_order.order_id }}</f7-list-item>
<!--            <f7-list-item>-->
<!--                订单状态：{{ final_order.status === "pending" ? "待取货" : ( final_order.status === "success" ? "交易完成" : "交易取消" ) }}-->
<!--                <a href="#" v-if="final_order.status === 'pending'" style="margin-left: 8px">取消订单</a>-->
<!--            </f7-list-item>-->
            <f7-list-item v-if="final_order.cancel_reason">订单取消原因：{{ final_order.cancel_reason }}</f7-list-item>
            <f7-list-item>订单总价：{{ final_order.price.toFixed(2) }} 元</f7-list-item>
            <f7-list-item>创建时间：{{ final_order.create_time }}</f7-list-item>
            <f7-list-item>最迟交易时间：{{ final_order.deadline }}</f7-list-item>
        </f7-list>
        <f7-list v-if="final_order" media-list>
            <f7-list-item group-title>
                <span>卖家信息</span>
            </f7-list-item>
            <f7-list-item>卖家昵称：{{ final_order.seller.nickname }}</f7-list-item>
            <f7-list-item>卖家姓名：{{ final_order.seller.name }}</f7-list-item>
            <f7-list-item>是否为代理商：{{ final_order.seller.is_agent ? '是' : '否' }}</f7-list-item>
            <f7-list-item>学校：{{ final_order.seller.univisity }} {{ final_order.seller.area }}</f7-list-item>
            <!-- <f7-list-item>学院：{{ final_order.seller.college }}</f7-list-item>-->
            <!-- <f7-list-item>专业：{{ final_order.seller.major }}</f7-list-item>-->
            <f7-list-item>宿舍：{{ final_order.seller.dorm }} - {{ final_order.seller.dorm_number }}</f7-list-item>
            <f7-list-item>联系电话：{{ final_order.seller.phone }}</f7-list-item>
        </f7-list>
        <f7-list v-if="final_order" media-list>
            <f7-list-item group-title>
                <span>预定书籍列表</span>
            </f7-list-item>
            <book-list-item v-for="book in final_order.books" :key="book.book.book_id"
                            :show-count-chooser="false"
                            :book="book.book" :nickname="final_order.seller.nickname" >
                <f7-list-item-row slot="footer" style="margin-top: 10px; display: block; text-align: right;">
                    <span style="font-size: 13px">预定 {{ book.count }} 本，共 {{ (book.count * book.book.price).toFixed(2) }} 元</span>
                </f7-list-item-row>
            </book-list-item>
        </f7-list>
    </f7-page>
</template>

<script>
    import api from '../utils/api';
    import BookListItem from '../components/book-list-item';

    export default {
        props: [
            'order'
        ],

        data() {
            return {
                remote: {}
            }
        },

        computed: {
            final_order() {
                return this.order || this.remote.order
            }
        },

        components: {
            BookListItem
        },

        created() {
            if (!this.order) {
                let $this = this;
                api.fetch_order_detail(this.$f7route.params.order_id).then(data => {
                    if (data && data.error === 0) {
                        this.remote = {
                            order: data.order
                        };
                    }
                    else
                        $this.$f7.dialog.alert(data.msg);
                })
            }
        }
    }
</script>