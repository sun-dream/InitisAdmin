// 自定义校验函数
const emailMobile = (rule, value, callback) => {
  if (/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value)) {
    callback()
  } else {
    callback(new Error('请填写正确格式的邮箱'))
  }
}
const loginMixins = {

  data () {
    return {
      valid: false,
      showPassword: false,
      showAgainPassword: false,
      rules: {
        name: [v => !!v || 'name is required'],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 4, max: 20, message: '密码应为4-20位的长度', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { trigger: 'blur', validator: emailMobile }],
        verificationCode: [
          v => !!v || 'Verification Code is required',
          v => v.length !== 5 || 'The verification code must be six digits'
        ],
        againPassword: [v => !!v || 'Again Password Code Is Required']
      }
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    login ({ username, password }) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('api/auth/login', { username, password })
          .then((resp) => {
            this.$cookies.set('token', resp.token)
            localStorage.setItem('token', resp.token)
            // eslint-disable-next-line camelcase
            let is_superuser = false
            if (resp.user.is_superuser) {
              // eslint-disable-next-line camelcase
              is_superuser = true
              this.jumpTo({ name: 'index' })
            } else {
              // eslint-disable-next-line camelcase
              is_superuser = true
              this.jumpTo({ name: 'logout' })
            }
            resolve(is_superuser)
          }).catch((err) => {
            reject(err)
          })
      })
    }
  },
  beforeDestroy () {
  }
}

export default loginMixins
