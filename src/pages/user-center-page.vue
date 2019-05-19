<template>
    <f7-page>
        <!-- header -->
        <f7-navbar title="个人中心" back-link="back">
        </f7-navbar>

        <!-- main -->
        <div class="personal-info">
            <img class="avatar" alt="avatar"
                 src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg">
            <div class="meta">
                <div class="title">乌桥灵枫</div>
                <div class="subtitle">18723754836</div>
            </div>
        </div>
        <f7-list>
            <f7-list-item title="修改资料" link="/user/edit">
                <f7-icon slot="media" f7="edit"></f7-icon>
            </f7-list-item>
            <f7-list-item title="我的订单" link="/orders">
                <f7-icon slot="media" f7="document_text"></f7-icon>
            </f7-list-item>
            <f7-list-item title="代理商入口" link="/agent">
                <f7-icon slot="media" f7="infinite"></f7-icon>
            </f7-list-item>
        </f7-list>
    </f7-page>
</template>

<style scoped lang="less">
    .personal-info {
        display: flex;
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
                font-size: 1.4rem;
            }

            .subtitle {
                font-size: 1.15rem;
                color: grey;
            }
        }
    }
</style>