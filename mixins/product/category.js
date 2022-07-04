const categoryMixins = {
  data () {
    return {
      categoryVuexBasePath: 'logic/product/category',
      limit: 100,
      skip: 0,
      search: '',
      categoryFormRules: {
        query: [{ required: true, message: '查询内容不可为空', trigger: 'blur' }],
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ]
      },
      statusEnum: {
        ACTIVE: 'ACTIVE',
        INACTIVE: 'INACTIVE'
      }
    }
  },
  computed: {
    categoryData () {
      return this.$store.getters[this.categoryVuexBasePath + '/categoryData']
    },
    fetching () {
      return this.$store.getters[this.categoryVuexBasePath + '/fetching']
    },
    categoryDataOption () {
      if (this.categoryData.length < 1) {
        return []
      } else {
        return this.cloneObj(this.renderTreeClosure(this.categoryData))
      }
    }
  },
  methods: {
    getTime (val) {
      if (val === '' || !this.isDef(val)) {
        return
      }
      const d = val.split('.')
      let s = ''
      if (d[0].includes('T')) {
        s = d[0].replace(/T/g, ' ')
      }
      s = s.split(' ')[0]
      return s
    },
    getCategoryAllData (params = { query: '' }) {
      this.getCategoryData(params)
      this.getCategoryDataPagination()
    },
    getCategoryData (params = { query: '' }) {
      this.$store.dispatch(this.categoryVuexBasePath + '/getCategoryData', params)
    },
    getCategoryDataPagination (params = { query: '' }) {
      this.$store.dispatch(this.categoryVuexBasePath + '/getCategoryPagination', params)
    },
    createdProductCategory (data) {
      return this.$store.dispatch(this.categoryVuexBasePath + '/createdProductCategory', data)
    },
    getCategoryName (val) {
      if (!val) {
        return
      }
      let categoryIndex = null
      for (let index = 0; index < this.categoryData.length; index++) {
        if (this.categoryData[index].id === val) {
          categoryIndex = index
          break
        }
      }
      return categoryIndex === null ? val : this.categoryData[categoryIndex].name
    },
    updateProductCategory ({ params, categoryId }) {
      return this.$store.dispatch(this.categoryVuexBasePath + '/updateProductCategory', { params, categoryId })
    }
  }
}

export default categoryMixins
