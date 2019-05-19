<template>
    <f7-page>
        <!-- header -->
        <f7-navbar title="我的订单" back-link="back">
            <f7-link slot="nav-right" iconF7="icon-bars" panel-open="right"></f7-link>
        </f7-navbar>

        <!-- main -->
        <f7-list v-for="order of orders" media-list :key="order.order_id">
            <f7-list-item
                :after="'¥ ' + order.price"
                :subtitle="order.create_time"
                :text="'《' + order.books[0].book.name + '》等' + order.books.length + '种书，请在 ' + order.deadline + ' 前到 ' + order.seller.dorm + ' 取书'"
                @click="detail_page(order)"
            >
                <img slot="media" :src="order.books[0].book.cover" width="80" />
                <div slot="title">
                    <span v-if="order.status === 'pending'">[待交易]</span>
                    <span v-else-if="order.status === 'canceled'">[已取消]</span>
                    <span v-else-if="order.status === 'success'">[已完成]</span>
                    <span v-else>[未知订单]</span>
                    <span> {{ order.seller.nickname }}的订单</span>
                </div>
            </f7-list-item>
        </f7-list>
    </f7-page>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        computed: {
            ...mapState([
                'orders',
            ])
        },

        methods: {
            ...mapActions([
                'fetch_orders'
            ]),
            detail_page (order) {
                this.$f7router.navigate('/order/' + order.order_id, {
                    props: {
                        order
                    }
                })
            }
        },

        created() {
            if (!this.orders.length) {
                this.fetch_orders().then(() => {

                })
            }
        }
    }
</script>