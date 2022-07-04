<template>
  <the-frame :title="frameTitle">
    <el-form ref="form" label-position="top" :rules="rules" :model="loginForm" label-width="80px">
      <el-form-item label="E-mail" prop="email">
        <el-input v-model="loginForm.email" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="loginForm.password" show-password />
      </el-form-item>
      <v-button type="primary" class="w-100 login-btn" @click="submit">
        Log In
      </v-button>
      <p class="login__register mt-2">
        <v-link :name="'reset-password'">
          Forgot Password?
        </v-link>
      </p>
    </el-form>
  </the-frame>
</template>

<script>
import Frame from './Frame'
import loginMixins from '@/mixins/auth/login'
import VLink from '@/baseComponents/VLink'
import VButton from '@/baseComponents/VButton'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  components: {
    theFrame: Frame,
    VLink,
    VButton
  },
  mixins: [loginMixins],
  props: {
    frameTitle: {
      type: String,
      required: false,
      default: 'Administrator Login'
    }
  },
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      isError: false,
      errorMessages: ''
    }
  },
  watch: {},
  mounted () {
    this.initTestEmailAndPassword({
      email: 'admin@admin.com',
      password: 'admin'
    })
  },
  methods: {
    initTestEmailAndPassword (val) {
      this.loginForm = val
    },
    submit () {
      // this.$refs.form.validate()
      this.$refs.form.validate((valid) => {
        if (!valid) {
          this.notification({
            title: '请求结果',
            message: '请正确填写内容！',
            type: 'warning'
          })
          return false
        }
        this.login({
          username: this.loginForm.email,
          password: this.$md5(this.loginForm.password).toLowerCase()
        })
          .then((resp) => {
            if (resp) {
              this.notification({
                title: '请求结果',
                message: '登录成功！',
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
          .catch((error) => {
            let errorText = ''
            if (
              error.request &&
              error.request.responseText &&
              Array.isArray(JSON.parse(error.request.responseText).detail)
            ) {
              errorText = JSON.parse(error.request.responseText).detail[0].msg
            } else if (error.request && error.request.responseText) {
              errorText = JSON.parse(error.request.responseText).detail
            }
            // this.errorMessages = 'Wrong account or password!'
            this.errorMessages = errorText + '!'
            this.notification({
              title: '登录失败',
              message: errorText + '!',
              type: 'error'
            })
          })
      })
    }
  }
}
</script>
<style scoped lang="scss">
@import "assets/sass/color";
.elevation-12 {
  box-shadow: none !important;
}
</style>
