<template>
    <f7-page hide-navbar-on-scroll>
        <!-- header -->
        <f7-navbar title="挂售订单" back-link="back">
            <f7-link slot="nav-right" iconF7="icon-bars" panel-open="right"></f7-link>
        </f7-navbar>

        <f7-list media-list v-for="upload of list" :key="upload.id">
            <f7-list-item
                :title="upload.name"
                :after="'¥ ' + upload.pay_fee"
                :subtitle="'订单状态：' + (upload.pay_time ? '已支付' : '未支付')"
                :text="'过期时间：' + (upload.lease_time ? upload.lease_time : '暂未上架')"
                @click="detail_page(upload.id)"
            >
                <img slot="media" :src="upload.cover" width="80" alt="cover" />
            </f7-list-item>
        </f7-list>
    </f7-page>
</template>

<script>
    import api from "../utils/api";

    export default {
        data () {
            return {
                list: []
            }
        },
        created () {
            api.upload_book_query_all().then(res => {
                if (res && res.error === 0) {
                    this.list = res.orders
                } else
                    this.$f7.dialog.alert(res.msg);
            })
        },
        methods: {
            detail_page (upload_id) {
                this.$f7router.navigate('/books/upload/pay/' + upload_id)
            }
        }
    }
</script>