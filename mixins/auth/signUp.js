const signUpMixins = {
  data () {
    return {
      emailManualVerificationError: {
        text: '',
        state: false
      },
      sendVerificationCodeState: false
    }
  },
  computed: {
  },
  methods: {
    emailManualVerificationHandler (val, verificationFun) {
      if (!val) {
        this.emailManualVerificationError.text = 'E-mail is required'
        this.emailManualVerificationError.state = true
        return
      }
      if (Object.prototype.toString.call(verificationFun(val)) === '[object String]') {
        this.emailManualVerificationError.text = 'E-mail must be valid'
        this.emailManualVerificationError.state = true
        return
      }
      this.emailManualVerificationError.text = ''
      this.emailManualVerificationError.state = false
    }
  },
  beforeDestroy () {
  }
}

export default signUpMixins
