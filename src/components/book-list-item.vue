<template>
    <f7-list-item
        :title="book.name"
        :after="'¥ ' + book.price"
        :subtitle="book.isbn"
        :text="book.remark"
        @click="detail_page(book, nickname)"
        swipeout
    >
        <img slot="media" :src="book.cover" width="80" alt="cover" />
        <f7-list-item-row v-if="showCountChooser" slot="footer" style="margin-top: 5px; display: block; text-align: right;">
            <span style="margin-right: 10px">共 {{ book.count }} 本</span>
            <count-chooser :value="book.want_count" @input="$emit('want-count-change', $event)" :max-count="book.count"></count-chooser>
        </f7-list-item-row>
        <slot name="footer" slot="footer"></slot>
    </f7-list-item>
</template>

<script>
    import CountChooser from '../components/count-chooser';

    export default {
        props: {
            book: {
                type: Object,
                required: true
            },
            nickname: {
                type: String,
                required: true
            },
            showCountChooser: {
                type: Boolean,
                default: true
            }
        },

        components: {
            CountChooser
        },

        methods: {
            detail_page (book, nickname) {
                this.$f7router.navigate('/detail/' + book.book_id, {
                    props: {
                        book: book,
                        seller: nickname
                    }
                })
            },
        }
    }
</script>