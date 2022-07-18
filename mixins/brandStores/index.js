const brandStoresMixins = {
  data () {
    return {
      brandStoresVuexBasePath: 'logic/brandStores',
      brandStoresStatusOption: [
        { name: 'Active', value: 'ACTIVE' },
        { name: 'Banndn', value: 'BANNED' },
        { name: 'Pending', value: 'PENDING' }
      ],
      brandStoreRules: {
        name: [{ required: true, message: '店铺名称不可为空', trigger: 'blur' }],
        Path: [{ required: true, message: 'Path名称不可为空', trigger: 'blur' }],
        status: [{ required: true, message: '店铺状态为必填项', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱地址不可为空', trigger: 'blur' }],
        tiktok: [{ required: true, message: 'tiktok地址不可为空', trigger: 'blur' }],
        youtube: [{ required: true, message: 'youtube地址不可为空', trigger: 'blur' }],
        facebook: [{ required: true, message: 'facebook地址不可为空', trigger: 'blur' }],
        instagram: [{ required: true, message: 'instagram地址不可为空', trigger: 'blur' }],
        currency_code: [{ required: true, message: '货币代码为必选项', trigger: 'blur' }]
      },
      updateObject: {
        user_id: 'string',
        name: 'string',
        path: 'string',
        description: 'string',
        bg_cover_id: 'string',
        logo_id: 'string',
        sticker_id: 'string',
        status: 'ACTIVE',
        email: 'user@example.com',
        tiktok: 'string',
        youtube: 'string',
        facebook: 'string',
        instagram: 'string',
        currency_code: 'AED'
      }
    }
  },
  computed: {
    brandStoresQuery: {
      get () {
        return this.$store.getters[this.brandStoresVuexBasePath + '/brandStoresQuery']
      },
      set (val) {
        this.$store.commit(this.brandStoresVuexBasePath + '/UPDATE_BRAND_STORES_QUERY', val)
      }
    },
    brandStoresList () {
      return this.$store.getters[this.brandStoresVuexBasePath + '/brandStoresList']
    },
    brandStoreItem () {
      return this.$store.getters[this.brandStoresVuexBasePath + '/brandStoreItem']
    }
  },
  methods: {
    getBrandStoresData (params = { query: this.brandStoresQuery }) {
      this.loadBrandStoresList(params)
      this.loadBrandStoresPagination(params)
    },
    loadBrandStoresList (params = { query: '' }) {
      this.$store.dispatch(this.brandStoresVuexBasePath + '/getBrandStoresList', params)
    },
    loadBrandStoresPagination (params = { query: '' }) {
      this.$store.dispatch(this.brandStoresVuexBasePath + '/getBrandStoresPagination', params)
    },
    loadBrandStoreItem (id) {
      this.$store.dispatch(this.brandStoresVuexBasePath + '/getBrandStoreItem', id)
    },
    getBrandStoresStatus (data) {
      if (!data) {
        return ''
      }
      return this.brandStoresStatusOption.find(item => data === item.value)
    },
    updateBrandStores ({ params, id }) {
      const data = this.cloneObj(this.brandStoreItem)
      const updateParmas = this.cloneObj(params)
      Object.keys(this.updateObject).forEach((key) => {
        if (!updateParmas[key]) {
          updateParmas[key] = data[key]
        }
      })
      return this.$store.dispatch(this.brandStoresVuexBasePath + '/updateBrandStore', { params: updateParmas, id })
    }

  }
}

export default brandStoresMixins
