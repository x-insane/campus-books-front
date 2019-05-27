<template>
    <f7-page>
        <!-- header -->
        <f7-navbar title="书籍挂售" back-link="back">
        </f7-navbar>

        <!-- main -->
        <f7-block>
            <p>请确认你的宿舍位于华南理工大学大学城校区C12</p>
        </f7-block>

        <f7-block-title>书籍信息登记</f7-block-title>
        <f7-list no-hairlines-md>
            <f7-list-input
                label="书籍名称"
                type="text"
                placeholder="必填，挂售书籍的名称"
                clear-button
                :value="name"
                @input="name = $event.target.value"
            ></f7-list-input>
            <f7-list-input
                label="ISBN"
                type="text"
                placeholder="选填，挂售书籍的ISBN"
                clear-button
                :value="isbn"
                @input="isbn = $event.target.value"
            ></f7-list-input>
            <f7-list-input
                label="学院"
                type="text"
                placeholder="选填，使用该书的学院"
                clear-button
                :value="college"
                @input="college = $event.target.value"
            ></f7-list-input>
            <f7-list-input
                label="专业"
                type="text"
                placeholder="选填，使用该书的专业"
                clear-button
                :value="major"
                @input="major = $event.target.value"
            ></f7-list-input>
            <f7-list-input
                label="售价"
                type="text"
                placeholder="必填，价格过高会卖不出去哦～"
                clear-button
                :value="price"
                @input="price = Number.parseFloat($event.target.value) || 0"
            ></f7-list-input>
            <f7-list-input
                label="数量"
                type="number"
                placeholder="必填，挂售的数量"
                clear-button
                :value="count"
                @input="count = Number.parseInt($event.target.value) || 1"
            ></f7-list-input>
            <f7-list-input
                label="详细说明"
                type="textarea"
                placeholder="选填"
                :value="remark"
                @input="remark = $event.target.value"
            ></f7-list-input>
        </f7-list>

        <f7-block-title>图书封面</f7-block-title>
        <f7-block>
            <div>
                <img style="width: 5rem; height: 5rem;" :src="cover" alt=""
                     @click="$refs.photo_browser.open(0)" />
            </div>
            <f7-icon v-if="!cover" f7="add" @click.native="$refs.upload_cover_input.click()"></f7-icon>
            <input ref="upload_cover_input" style="display: none;" type="file" @change="upload_cover">
        </f7-block>

        <f7-block-title>额外的图片</f7-block-title>
        <f7-block>
            <div style="display: flex; flex-wrap: wrap; margin: 0 -0.3rem">
                <img style="width: 5rem; height: 5rem; margin: 0.3rem;"
                     v-for="(photo_url, index) of photos"
                     :key="photo_url + index"
                     :src="photo_url"
                     @click="$refs.photo_browser.open(index + 1)"
                     alt="" />
            </div>
            <f7-icon f7="add" @click.native="$refs.upload_photo_input.click()"></f7-icon>
            <input ref="upload_photo_input" style="display: none;" type="file" @change="upload_photo">
        </f7-block>

        <f7-block-title>挂售信息</f7-block-title>
        <f7-list no-hairlines-md>
            <f7-list-input
                label="挂售天数"
                type="text"
                placeholder="必填，挂售的天数"
                clear-button
                :value="lease"
                @input="lease = Number.parseInt($event.target.value) || 30"
            ></f7-list-input>
            <f7-list-input
                label="挂售租金"
                type="text"
                disabled
                :value="(lease * 0.1).toFixed(2) + ' 元'"
            ></f7-list-input>
        </f7-list>

        <f7-block>
            <f7-button :disabled="pending" @click="submit">提交</f7-button>
        </f7-block>

        <f7-photo-browser v-if="photos_all"
              :photos="photos_all"
              ref="photo_browser"
        ></f7-photo-browser>
    </f7-page>
</template>

<script>
    import api from "../utils/api";

    export default {
        data() {
            return {
                name: '',
                isbn: '',
                college: '',
                major: '',
                price: 0,
                remark: '',
                lease: 30,
                count: 1,
                cover: 'http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg',
                photos: [
                    'http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg',
                    'http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg',
                    'http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg',
                    'http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg',
                    'http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg',
                    'http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg',
                    'http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg',
                    'http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg',
                ],
                pending: false
            }
        },
        computed: {
            photos_all () {
                return [
                    this.cover,
                    ...this.photos
                ]
            }
        },
        methods: {
            upload_cover () {
                console.log(this.$refs.upload_cover_input.files)
            },
            upload_photo () {
                console.log(this.$refs.upload_photo_input.files)
            },
            submit () {
                this.pending = true;
                api.upload_book_order({
                    name: this.name,
                    isbn: this.isbn,
                    college: this.college,
                    major: this.major,
                    price: this.price,
                    remark: this.remark,
                    lease: this.lease,
                    count: this.count,
                    cover: this.cover,
                    photos: this.photos
                }).then(res => {
                    if (res && res.error === 0) {
                        this.$f7router.navigate('/books/upload/pay/' + res.upload_id);
                    } else {
                        this.$f7.dialog.alert(res.msg || "上传失败");
                        this.pending = false;
                    }
                }).catch(() => {
                    this.pending = false;
                })
            }
        }
    }
</script>