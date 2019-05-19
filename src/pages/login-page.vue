<template>
    <f7-page no-toolbar no-navbar no-swipeback login-screen>
        <f7-login-screen-title>登陆到校园二手书交易平台</f7-login-screen-title>
        <f7-list form>
            <f7-list-input
                label="手机号"
                type="text"
                placeholder="请输入手机号"
                :value="phone"
                @input="phone = $event.target.value"
            ></f7-list-input>
            <f7-list-input v-if="captcha_send"
                label="短信验证码"
                type="text"
                placeholder="请输入短信验证码"
                :value="captcha"
                @input="captcha = $event.target.value"
            ></f7-list-input>
        </f7-list>
        <f7-block>
            <f7-row>
                <f7-col>
                    <f7-button @click="send_captcha" :disabled="captcha_resend_time > 0">
                        {{ captcha_send ? '重新' : '' }}发送验证码{{ captcha_resend_time ? `(${captcha_resend_time})` : '' }}
                    </f7-button>
                </f7-col>
                <f7-col>
                    <f7-button :disabled="!captcha_send" @click="login">登陆</f7-button>
                </f7-col>
            </f7-row>
        </f7-block>
    </f7-page>
</template>

<script>
    import api from '../utils/api';

    export default {
        data() {
            return {
                phone: '',
                captcha: '',
                captcha_send: false,
                captcha_resend_time: 0
            }
        },

        methods: {
            login () {
                const $this = this;
                $this.$f7.dialog.preloader('登陆中');
                api.login(this.phone, this.captcha).then(data => {
                    $this.$f7.dialog.close();
                    if (data && data.error === 0)
                        $this.$f7router.navigate('/');
                    else
                        $this.$f7.dialog.alert(data.msg);
                })
            },
            send_captcha () {
                const $this = this;
                api.login_send_message(this.phone).then(data => {
                    if (data && data.error === 0) {
                        $this.captcha_send = true;
                        $this.captcha_resend_time = 60;
                        setTimeout(function loop() {
                            $this.captcha_resend_time --;
                            if ($this.captcha_resend_time)
                                setTimeout(loop, 1000)
                        }, 1000)
                    }
                    else
                        $this.$f7.dialog.alert(data.msg);
                })
            }
        }
    }
</script>

<style>
    .login-screen-title {
        font-size: 1.5rem;
    }
</style>