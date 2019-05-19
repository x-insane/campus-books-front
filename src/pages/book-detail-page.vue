<template>
    <f7-page hide-navbar-on-scroll>
        <!-- header -->
        <f7-navbar :title="final_book ? final_book.name : '校园二手书交易平台'" back-link="back">
            <f7-link slot="nav-right" iconF7="icon-bars" panel-open="right"></f7-link>
        </f7-navbar>

        <div v-if="final_book" class="block">
            <img :src="final_book.cover" alt="cover" style="width: 100%" @click="$refs.photo_browser.open(0)">
<!--            <p style="text-align: right"><count-chooser v-model="book.buy_count" :max-count="book.count"></count-chooser></p>-->
            <p>书名：{{ final_book.name }}</p>
            <p v-if="final_book.isbn">ISBN：{{ final_book.isbn }}</p>
            <p>价格：{{ final_book.price }} 元</p>
            <p>余量：{{ final_book.count }}</p>
            <p>卖家：{{ final_seller }}</p>
            <p>学校：{{ final_book.univisity }} {{ final_book.area }}</p>
            <p>宿舍楼：{{ final_book.dorm }}</p>
            <p v-if="final_book.college">学院：{{ final_book.college }}</p>
            <p v-if="final_book.major">专业：{{ final_book.major }}</p>
            <p v-if="final_book.remark">备注：{{ final_book.remark }}</p>
            <p v-if="final_book.photos">更多详情：</p>
            <img v-for="(photo, index) of final_book.photos" alt="detail"
                 :src="photo" :key="photo + index"
                 @click="$refs.photo_browser.open(index+1)"
                 style="width: 100%; margin: 5px 0;">
        </div>

        <f7-photo-browser v-if="final_book"
            :photos="book_photos"
            ref="photo_browser"
        ></f7-photo-browser>
    </f7-page>
</template>

<script>
    import api from '../utils/api'

    export default {
        props: [ 'book', 'seller' ],

        components: {
            // CountChooser
        },

        data() {
            return {
                remote: {}
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
                api.fetch_book_detail(this.$f7route.params.book_id).then(data => {
                    if (data && data.error === 0) {
                        $this.remote = {
                            book: data.book,
                            seller: data.seller.nickname
                        };
                    }
                    else
                        $this.$f7.dialog.alert(data.msg);
                })
            }
        }
    }
</script>