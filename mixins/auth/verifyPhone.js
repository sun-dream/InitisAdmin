// define a mixin object
const verifyPhoneMixins = {
  data () {
    return {
      verifyCoolDown: { // 控制发送频率
        status: false,
        counter: 60,
        interval: null
      },
      verifyForm: { // 验证所需要的信息和数据
        phone: null,
        code: null,
        confirmationCode: null,
        password: ''
      },
      verifyingProgress: { // 验证的过程进度
        code: false, // 是否在验证 验证码
        phone: false, // 是否在 发送最后的数据 来验证手机号码
        verified: false // Checking Phone Verified Status
      },
      phoneVerified: {
        verified: [],
        unverified: [],
        unregister: []
      }
    }
  },
  computed: {
    verifyCodeIsValid () {
      return this.isDef(this.verifyForm.confirmationCode)
    }
  },
  watch: {
    'verifyForm.code': {
      handler () {
        this.validateCode()
      }
    }
  },
  methods: {
    checkPhoneVerifiedStatus (phone) {
      if (phone && !this.phoneVerified.verified.includes(phone) && !this.phoneVerified.unverified.includes(phone) && phone.length === 11) {
        this.verifyingProgress.verified = true
        return new Promise((resolve, reject) => {
          this.$store.dispatch('api/auth/isPhoneVerified', { phone }).then((verified) => {
            if (verified === true) {
              this.phoneVerified.verified.push(phone)
            } else if (verified === null) {
              this.phoneVerified.unregister.push(phone)
            } else {
              this.phoneVerified.unverified.push(phone)
            }
            resolve(verified)
          }).finally(() => { this.verifyingProgress.verified = false })
        })
      }
    },
    sendVerifyPhoneConfirmationCode (phone) {
      this.verifyForm.phone = phone
      this.startSendCoolDown()
      this.$store.dispatch('api/auth/sendPhoneVerifyConfirmationCode', { phone: this.verifyForm.phone }).then((sent) => {
        if (sent) {
          this.$notify(
            {
              title: '发送成功',
              message: '请检查手机短信',
              type: 'success'
            }
          )
        } else {
          this.$notify(
            {
              title: '发送失败',
              message: '请重新尝试，多次尝试失败可联系客服。',
              type: 'danger'
            }
          )
        }
      })
    },
    startValidatingCode () {
      this.verifyingProgress.code = true
    },
    endValidatingCode () {
      this.verifyingProgress.code = false
    },
    validateCode () {
      // 检查code是否是正确的
      if (this.verifyForm.code && this.verifyForm.code.length >= 6 && this.verifyForm.phone) {
        this.startValidatingCode()
        this.$store.dispatch('api/auth/confirmPhoneVerifyConfirmationCode', { phone: this.verifyForm.phone, code: this.verifyForm.code }).then((token) => {
          if (token) {
            this.verifyForm.confirmationCode = token
          }
        }).finally(() => {
          this.endValidatingCode()
        })
      }
    },
    startSendCoolDown () {
      clearInterval(this.verifyCoolDown.interval)
      this.verifyCoolDown.counter = 60
      this.verifyCoolDown.status = true
      this.verifyCoolDown.interval = setInterval(() => {
        this.verifyCoolDown.counter -= 1
        if (this.verifyCoolDown.counter <= 0) {
          this.coolDownEndHandler()
        }
      }, 1000)
    },
    coolDownEndHandler () {
      this.verifyCoolDown.status = false
      this.verifyCoolDown.counter = 60
      clearInterval((this.verifyCoolDown.interval))
    },
    verifyPhone () {
      // 发送最后的数据给服务器验证手机号码
      this.verifyingProgress.phone = true
      return new Promise((resolve, reject) => {
        this.$store.dispatch('api/auth/verifyPhone', { phone: this.verifyForm.phone, confirmedResultCode: this.verifyForm.confirmationCode, password: this.verifyForm.password }).then((status) => {
          resolve(status)
        }).catch(err => reject(err)).finally(() => { this.verifyingProgress.phone = false })
      })
    }
  }
}

export default verifyPhoneMixins
