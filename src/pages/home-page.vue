<template>
    <f7-page>
        <!-- header -->
        <f7-navbar title="校园二手书交易平台">
            <f7-link slot="nav-left" iconF7="document_text" icon-size="1.5rem" href="/orders"></f7-link>
            <f7-link slot="nav-right" iconF7="person_round" icon-size="1.5rem" href="/user"></f7-link>
        </f7-navbar>

        <!-- main -->
        <f7-list v-for="seller of books" media-list :key="seller.seller">
            <f7-list-item group-title>
                <span>华南理工大学 - 大学城校区 - C12 - {{ seller.nickname }}</span>
            </f7-list-item>
            <book-list-item v-for="(book, index) in seller.books" :key="index"
                            :book="book" :nickname="seller.nickname"
                            @want-count-change="update_book_want_count({ seller, book, count: $event })">
            </book-list-item>
        </f7-list>

        <!-- bottom tab -->
        <f7-fab v-if="shopping_cart_count" position="center-bottom" slot="fixed" color="blue" href="/shopping-cart">
            <f7-icon f7="shopping_cart">
                <f7-badge color="red">{{ shopping_cart_count }}</f7-badge>
            </f7-icon>
        </f7-fab>

        <!-- right-panel -->
        <f7-panel right resizable theme-dark>
            <f7-view>
                <f7-page>
                    <f7-block>Right panel content</f7-block>
                </f7-page>
            </f7-view>
        </f7-panel>
    </f7-page>
</template>

<script>
    import { mapState, mapGetters, mapMutations } from 'vuex';
    import BookListItem from '../components/book-list-item';

    export default {
        computed: {
            ...mapState([
                'books',
                'shopping_cart'
            ]),
            ...mapGetters([
                'shopping_cart_count',
                // 'book_want_count'
            ])
        },

        components: {
            BookListItem
        },

        methods: {
            ...mapMutations([
                'update_book_want_count'
            ])
        }
    }
</script>

<style>
    .navbar, .navbar-inner {
        /*height: 3rem;*/
    }

    .list {
        margin: 0;
    }

    .navbar-inner .title {
        position: absolute;
        width: 100%;
        margin: 0;
        text-align: center;
        font-weight: normal;
        /*font-size: 1.15rem;*/
        z-index: -1;
    }
</style>