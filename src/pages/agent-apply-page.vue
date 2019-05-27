<template>
    <f7-page>
        <!-- header -->
        <f7-navbar title="申请成为代理商" back-link="back">
        </f7-navbar>

        <f7-block-title>个人信息登记</f7-block-title>
        <f7-list no-hairlines-md>
            <f7-list-input
                label="真实姓名"
                type="text"
                placeholder="必填"
                clear-button
                :value="name"
                @input="name = $event.target.value"
            ></f7-list-input>
            <f7-list-input
                label="学号"
                type="text"
                placeholder="必填"
                clear-button
                :value="sno"
                @input="sno = $event.target.value"
            ></f7-list-input>
            <f7-list-input
                label="学校"
                type="text"
                placeholder="必填"
                clear-button
                :value="university"
                @input="university = $event.target.value"
            ></f7-list-input>
            <f7-list-input
                label="校区"
                type="text"
                placeholder="选填"
                clear-button
                :value="area"
                @input="area = $event.target.value"
            ></f7-list-input>
            <f7-list-input
                label="宿舍楼"
                type="text"
                placeholder="必填"
                clear-button
                :value="dorm"
                @input="dorm = $event.target.value"
            ></f7-list-input>
            <f7-list-input
                label="宿舍号"
                type="text"
                placeholder="必填"
                clear-button
                :value="dorm_number"
                @input="dorm_number = $event.target.value"
            ></f7-list-input>
        </f7-list>

        <f7-block-title>专业信息</f7-block-title>
        <f7-list no-hairlines-md>
            <f7-list-input
                label="学院"
                type="text"
                placeholder="必填"
                clear-button
                :value="college"
                @input="college = $event.target.value"
            ></f7-list-input>
            <f7-list-input
                label="专业"
                type="text"
                placeholder="必填"
                clear-button
                :value="major"
                @input="major = $event.target.value"
            ></f7-list-input>
        </f7-list>

        <f7-block-title>认证信息（能够证明所在学校和宿舍楼的图片）</f7-block-title>
        <f7-block>
            <div style="display: flex; flex-wrap: wrap; margin: 0 -0.3rem">
                <img style="width: 5rem; height: 5rem; margin: 0.3rem;"
                     v-for="(photo, index) of photos"
                     :key="photo + index"
                     :src="photo" alt="" />
            </div>
            <f7-icon f7="add" @click.native="$refs.upload_photo_input.click()"></f7-icon>
            <input ref="upload_photo_input" style="display: none;" type="file" @change="upload_photo">
        </f7-block>

        <f7-block-title>签约信息</f7-block-title>
        <f7-list no-hairlines-md>
            <f7-list-input
                label="签约时长"
                type="text"
                placeholder="必填"
                clear-button
                :value="lease"
                @input="lease = Number.parseInt($event.target.value) || 365"
            ></f7-list-input>
        </f7-list>

        <f7-block>
            <f7-button @click="submit">提交</f7-button>
        </f7-block>
    </f7-page>
</template>

<script>
    export default {
        data () {
            return {
                name: "",
                sno: "",
                university: "",
                area: "",
                dorm: "",
                dorm_number: "",
                college: "",
                major: "",
                lease: 365,
                photos: [
                    "filename1",
                    "filename2",
                    "filename3",
                    "filename4"
                ]
            }
        },
        methods: {
            upload_photo () {
                console.log(this.$refs.upload_photo_input.files)
            },
            submit () {
                console.log({
                    name: this.name,
                    sno: this.sno,
                    university: this.university,
                    area: this.area,
                    dorm: this.dorm,
                    dorm_number: this.dorm_number,
                    college: this.college,
                    major: this.major,
                    lease: this.lease,
                    photos: this.photos
                })
            }
        }
    }
</script>