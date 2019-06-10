<template>
    <f7-page>
        <!-- header -->
        <f7-navbar title="个人中心" back-link="back">
        </f7-navbar>

        <!-- main -->
        <div class="personal-info" v-if="user">
            <img class="avatar" alt="avatar" :src="user.avatar">
            <div class="meta">
                <div class="title">{{ user.nickname }}</div>
                <div class="subtitle">{{ user.phone }}</div>
            </div>
        </div>
        <f7-list v-if="user">
<!--            <f7-list-item title="修改资料" link="/user/edit">-->
<!--                <f7-icon slot="media" f7="edit"></f7-icon>-->
<!--            </f7-list-item>-->
            <f7-list-item title="我的订单" link="/orders">
                <f7-icon slot="media" f7="document_text"></f7-icon>
            </f7-list-item>
            <f7-list-item title="书籍挂售" link="/books/upload">
                <f7-icon slot="media" f7="add"></f7-icon>
            </f7-list-item>
            <f7-list-item title="挂售订单" link="/books/upload/list">
                <f7-icon slot="media" f7="keyboard_fill"></f7-icon>
            </f7-list-item>
            <f7-list-item :title="user.agent ? (user.agent.lease_time ? '代理商入口' : '正在申请代理商，请耐心等待') : '申请成为代理商'"
                          :link="user.agent ? (user.agent.lease_time ? '/agent' : '') : '/agent/apply'">
                <f7-icon slot="media" f7="infinite"></f7-icon>
            </f7-list-item>
        </f7-list>
    </f7-page>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        created() {
            this.fetch_user_info(true).then(() => {
                if (!this.user)
                    this.$f7router.navigate('/user/login')
            });
        },

        computed: {
            ...mapState([
                'user'
            ])
        },

        methods: {
            ...mapActions([
                'fetch_user_info'
            ])
        }
    }
</script>

<style scoped lang="less">
    .personal-info {
        display: flex;
        align-items: center;
        padding: 1.2rem;
        margin: 0.5rem 0;

        .avatar {
            width: 5rem;
            height: 5rem;
            border-radius: 2.5rem;
        }

        .meta {
            flex-grow: 1;
            margin-left: 1.5rem;

            .title {
                font-size: 1.2rem;
            }

            .subtitle {
                font-size: 1rem;
                color: grey;
            }
        }
    }
</style>