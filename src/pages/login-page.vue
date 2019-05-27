<template>
    <f7-page no-toolbar no-navbar no-swipeback login-screen>
        <!-- header -->
        <f7-navbar title="登陆到校园二手书交易平台" back-link="back" back-link-url="/">
        </f7-navbar>

        <f7-login-screen-title>登陆到校园二手书交易平台</f7-login-screen-title>
        <f7-list form>
            <f7-list-input
                label="手机号"
                type="text"
                placeholder="请输入手机号"
                :value="phone"
                @input="phone = $event.target.value"
            ></f7-list-input>
            <f7-list-input
                label="短信验证码"
                type="text"
                placeholder="请输入短信验证码"
                :value="captcha"
                @input="captcha = $event.target.value"
            ></f7-list-input>
            <div id="captcha_box" style="display: flex; justify-content: center; margin-top: 15px"></div>
        </f7-list>
        <f7-block>
            <f7-row>
                <f7-col>
                    <f7-button @click="send_captcha" :disabled="!geetest_passed || captcha_send === 1 || captcha_resend_time > 0">
                        {{ captcha_send === 2 ? '重新' : ( captcha_send === 1 ? '正在' : '' ) }}发送验证码{{ captcha_resend_time ? `(${captcha_resend_time})` : '' }}
                    </f7-button>
                </f7-col>
                <f7-col>
                    <f7-button :disabled="captcha_send !== 2" @click="login">登陆</f7-button>
                </f7-col>
            </f7-row>
        </f7-block>
    </f7-page>
</template>

<script>
    import api from '../utils/api';
    import { mapState, mapActions } from 'vuex';
    import config from "../config/config";

    export default {
        data() {
            return {
                phone: '',
                captcha: '',
                geetest_passed: false,
                captcha_send: 0, // 0 暂未请求验证码；1 正在请求验证码；2 验证码已发送
                captcha_resend_time: 0,
                captchaObj: null
            }
        },

        computed: {
            ...mapState([
                'user'
            ])
        },

        created () {
            if (this.user)
                return this.$f7router.navigate('/');
            let recaptchaScript = document.createElement('script');
            recaptchaScript.setAttribute('src', config.root_url + '/static/js/gt.js');
            document.head.appendChild(recaptchaScript);
            let $this = this;
            window.onerror = e => {
                alert(JSON.stringify(e))
            };
            api.geetest_init().then(data => {
                setTimeout(function check() {
                    if (window.initGeetest) {
                        window.initGeetest({
                            gt: data.gt,
                            challenge: data.challenge,
                            offline: !data.success,
                            new_captcha: true
                        }, function (captchaObj) {
                            $this.captchaObj = captchaObj;
                            captchaObj.appendTo("#captcha_box");
                            captchaObj.onReady(function(){
                                //your code
                            }).onSuccess(() => {
                                let result = captchaObj.getValidate();
                                $this.geetest_challenge = result.geetest_challenge;
                                $this.geetest_validate = result.geetest_validate;
                                $this.geetest_seccode = result.geetest_seccode;
                                $this.geetest_passed = true;
                            }).onError(function(){
                                //your code
                            })
                        })
                    } else
                        setTimeout(check, 100);
                }, 100);
            })
        },

        methods: {
            ...mapActions([
                'fetch_user_info'
            ]),
            login () {
                const $this = this;
                $this.$f7.dialog.preloader('登陆中');
                api.login(this.phone, this.captcha).then(data => {
                    $this.$f7.dialog.close();
                    if (data && data.error === 0) {
                        this.fetch_user_info().then(() => {
                            $this.$f7router.navigate('/');
                        });
                    }
                    else
                        $this.$f7.dialog.alert(data.msg || "登陆失败");
                })
            },
            send_captcha () {
                const $this = this;
                this.captcha_send = 1;
                api.login_send_message({
                    phone: this.phone,
                    geetest_challenge: this.geetest_challenge,
                    geetest_validate: this.geetest_validate,
                    geetest_seccode: this.geetest_seccode
                }).then(data => {
                    if (data && data.error === 0) {
                        $this.captcha_send = true;
                        $this.captcha_resend_time = 60;
                        setTimeout(function loop() {
                            $this.captcha_resend_time --;
                            if ($this.captcha_resend_time)
                                setTimeout(loop, 1000);
                            else {
                                $this.captchaObj.reset();
                                $this.geetest_challenge = '';
                                $this.geetest_validate = '';
                                $this.geetest_seccode = '';
                                $this.geetest_passed = false;
                            }
                        }, 1000)
                    }
                    else
                        $this.$f7.dialog.alert(data.msg || "验证码发送失败");
                }).finally(() => {
                    $this.captcha_send = 2;
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