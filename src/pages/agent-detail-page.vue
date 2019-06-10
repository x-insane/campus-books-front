<template>
    <f7-page>
        <!-- header -->
        <f7-navbar title="代理商入口二维码" back-link="back">
        </f7-navbar>

        <f7-block>
            <img v-if="url" :src="url" alt="qrcode" style="width: 100%">
        </f7-block>
    </f7-page>
</template>

<script>
    import api from "../utils/api";
    import config from "../config/config";

    export default {
        data () {
            return {
                url: ''
            }
        },
        created() {
            api.post("/agent/query").then(res => {
                if (res.error === 0) {
                    this.url = config.root_url + res.agent.qrcode
                } else {
                    this.$f7.dialog.alert(res.msg || "上传失败")
                }
            })
        }
    }
</script>