<template>
  <the-frame :title="frameTitle">
    <el-form ref="form" label-position="top" :rules="rules" :model="restPasswordForm" label-width="80px">
      <el-form-item label="E-mail" prop="email" class="phone-input">
        <el-input v-model="restPasswordForm.email" onkeyup="this.value = this.value.replace(/[^\d.]/g,'')" />
        <el-button
          v-if="!checkingAllowToUsePhone"
          :disabled="!validPhone || phoneSendConfirmationCodeFrozen"
          class="sendBtn"
          type="primary"
          @click="sendVerificationCodeHandler"
        >
          {{
            !phoneSendConfirmationCodeFrozen
              ? confirmationCodeSent
                ? "再发送"
                : "发送"
              : sentCountDown+'秒后再尝试'
          }}
        </el-button>
        <i v-else class="el-icon-loading" />
        </el-col>
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
  <!-- <v-form ref="form" v-model="valid">
      <v-card class="elevation-12">
        <v-card-text class="p-0">
          <v-text-field
            v-model="restPasswordForm.email"
            outlined
            prepend-inner-icon="mdi-email"
            name="E-mail"
            type="text"
            :rules="rules.email"
            label="E-mail"
            required
            :error-messages="
              emailManualVerificationError.state
                ? emailManualVerificationError.text
                : ''
            "
            :disabled="verifyCoolDown.status"
            @keyup.enter="submit"
          >
            <template #append-outer>
              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    depressed
                    color="primary"
                    :disabled="verifyCoolDown.status"
                    v-on="on"
                    @click.prevent="
                      sendVerificationCodeHandler(restPasswordForm.email)
                    "
                  >
                    {{
                      verifyCoolDown.status
                        ? verifyCoolDown.counter
                        : "Send code"
                    }}
                  </v-btn>
                </template>
                <span>
                  {{
                    verifyCoolDown.status
                      ? "Try again after " + verifyCoolDown.counter + " second"
                      : "Resend code"
                  }}</span>
              </v-tooltip>
            </template>
          </v-text-field>
          <v-text-field
            v-model="restPasswordForm.verificationCode"
            outlined
            prepend-inner-icon="mdi-shield-key"
            label="Verification Code"
            type="text"
            maxlength="6"
            required
            :rules="rules.verificationCode"
            :disabled="!sendVerificationCodeState"
          />
          <v-text-field
            id="password"
            v-model="restPasswordForm.password"
            outlined
            prepend-inner-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            name="password"
            label="Password"
            type="password"
            :type="showPassword ? 'text' : 'password'"
            :rules="rules.password"
            required
            maxlength="20"
            @keyup.enter="submit"
            @click:append="showPassword = !showPassword"
          />
          <v-text-field
            id="againPassword"
            v-model="restPasswordForm.againPassword"
            outlined
            prepend-inner-icon="mdi-lock"
            :append-icon="showAgainPassword ? 'mdi-eye' : 'mdi-eye-off'"
            name="againPassword"
            label="Again-Password"
            type="password"
            :type="showAgainPassword ? 'text' : 'password'"
            :rules="rules.againPassword"
            required
            maxlength="20"
            :error-messages="
              againPasswordStatus ? 'Inconsistent passwords!' : ''
            "
            @keyup.enter="submit"
            @click:append="showAgainPassword = !showAgainPassword"
          />
        </v-card-text>
        <v-card-actions class=" p-0 pb-6">
          <v-btn
            class="w-100"
            color="primary"
            depressed
            elevation="2"
            @click.prevent="submit"
          >
            Reset Password
          </v-btn>
        </v-card-actions>
        <p>
          <n-link :to="{ name: isAdmin ? 'admin-login' : 'login' }">
            Back to {{ isAdmin ? "Admin-Login" : "Login" }}
          </n-link>
        </p>
      </v-card>
    </v-form> -->
  </the-frame>
</template>

<script>
import Frame from './Frame'
import loginMixins from '@/mixins/auth/login'
import signUpMixins from '@/mixins/auth/signUp'
import verifyPhoneMixins from '@/mixins/auth/verifyPhone'
import VLink from '@/baseComponents/VLink'
import VButton from '@/baseComponents/VButton'
export default {
  name: 'ResetPassword',
  components: {
    theFrame: Frame,
    VLink,
    VButton
  },
  mixins: [loginMixins, signUpMixins, verifyPhoneMixins],
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
                message: '<div>Login successful! </div>',
                type: 'success'
              })
            } else {
              this.notification({
                title: '请求结果',
                message: '<div>Login failed, non administrator user, exiting login! </div>',
                type: 'error'
              })
            }
          })
      })
    },
    sendVerificationCodeHandler (val) {
      this.emailManualVerificationHandler(val, this.rules.email[1])
      if (this.emailManualVerificationError.state) {
        return
      }
      this.$store
        .dispatch('api/auth/email', { email: val, type: 'RESET_PASSWORD' })
        .then((resp) => {
          if (this.isDef(resp)) {
            this.sendVerificationCodeState = true
            this.startSendCoolDown()
          }
        })
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
