const userMixins = {
  data () {
    return {
      userVuexBasePath: 'logic/user',
      userFormRules: {
        full_name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        hashed_password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
        phone: [{ required: true, message: '电话不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    userList () {
      return this.$store.getters[this.userVuexBasePath + '/usersList']
    }
  },
  methods: {
    getUserData (params = { query: '' }) {
      this.loadUserList(params)
      this.loadUserPagination(params)
    },
    loadUserList (params = { query: '' }) {
      this.$store.dispatch(this.userVuexBasePath + '/getUserData', params)
    },
    loadUserPagination (params = { query: '' }) {
      this.$store.dispatch(this.userVuexBasePath + '/getUserDataPagination', params)
    },
    updateUser ({ params = {}, id }) {
      return this.$store.dispatch(this.userVuexBasePath + '/updateUser', { params, id })
    }
  }
}

export default userMixins
