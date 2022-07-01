<template>
  <the-frame :title="frameTitle">
    <el-form ref="form" label-position="top" :rules="rules" :model="restPasswordForm" label-width="80px">
      <el-form-item label="E-mail" prop="email" class="phone-input">
        <el-input v-model="restPasswordForm.email" />
        <el-button
          :disabled="restPasswordForm.email.length<1"
          class="sendBtn"
          type="primary"
          @click="sendCodeHandler(restPasswordForm.email,'email')"
        >
          {{
            verifyCoolDown.status
              ? verifyCoolDown.counter
              : verifyCoolDown.sendAgain?'再次发送':'发送验证码'
          }}
        </el-button>
      </el-form-item>
      <el-form-item label="Verification Code" prop="verificationCode">
        <el-input v-model="restPasswordForm.verificationCode" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="restPasswordForm.password" show-password />
      </el-form-item>
      <el-form-item label="Again-Password" prop="password">
        <el-input v-model="restPasswordForm.againPassword" show-password />
      </el-form-item>
      <v-button type="primary" class="w-100 login-btn" @click="submit">
        Log In
      </v-button>
      <p class="login__register mt-2">
        <v-link :name="'login'">
          Back to Login
        </v-link>
      </p>
    </el-form>
  </the-frame>
</template>

<script>
import Frame from './Frame'
import loginMixins from '@/mixins/auth/login'
import verifyCodeMixins from '@/mixins/auth/verifyCode'
import VLink from '@/baseComponents/VLink'
import VButton from '@/baseComponents/VButton'
export default {
  name: 'ResetPassword',
  components: {
    theFrame: Frame,
    VLink,
    VButton
  },
  mixins: [loginMixins, verifyCodeMixins],
  props: {
    frameTitle: {
      type: String,
      required: false,
      default: 'Administrator change password'
    }
  },
  data () {
    return {
      againPasswordStatus: false,
      restPasswordForm: {
        email: '',
        password: '',
        verificationCode: '',
        againPassword: ''
      }
    }
  },
  mounted () {},
  methods: {
    submit () {
      this.againPasswordStatus = false
      this.$refs.form.validate()
      if (!this.valid) {
        return
      }
      if (this.restPasswordForm.password !== this.restPasswordForm.againPassword) {
        this.againPasswordStatus = true
        return
      }
      const params = {
        username: this.restPasswordForm.email,
        code: this.restPasswordForm.verificationCode,
        password: this.$md5(this.restPasswordForm.password).toLowerCase()
      }
      this.$store.dispatch('api/auth/passwordRecovery', params).then((resp) => {
        this.login({ username: params.username, password: params.password })
          .then((resp) => {
            if (resp) {
              this.notification({
                title: '请求结果',
                message: 'Login successful! ',
                type: 'success'
              })
            } else {
              this.notification({
                title: '请求结果',
                message: 'Login failed, non administrator user, exiting login! ',
                type: 'error'
              })
            }
          })
      })
    },
    sendCodeHandler (val) {
      const validateFieldList = []
      this.$refs.form.validateField(['email'],
        // eslint-disable-next-line require-await
        async (errorMsg) => {
          if (!errorMsg) {
            validateFieldList.push(errorMsg)
            if (validateFieldList.length === 1 && validateFieldList.every(item => item === '')) {
              // 之后的操作
              this.$store
                .dispatch('api/auth/email', { email: val, type: 'RESET_PASSWORD' })
                .then((resp) => {
                  if (this.isDef(resp)) {
                    this.sendVerificationCodeState = true
                    this.startSendCoolDown()
                  }
                })
            }
          } else {
            this.notification({
              title: '请求结果',
              message: '请书写正确邮箱格式 ！',
              type: 'error'
            })
            return false
          }
        }
      )
      // if (this.emailManualVerificationError.state) {
      //   return
      // }
    }
  }
}
</script>
<style scoped lang="scss">
::v-deep .phone-input {
    .el-input {
      width: 69%;
    }
  }
</style>
