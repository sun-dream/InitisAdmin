const allProductMixins = {
  data () {
    return {
      productVuexBasePath: 'logic/product',
      productFilterForm: {
        query: ''
      },
      formRules: {
        name: [v => !!v || 'name is required']
      }
    }
  },
  computed: {
    productQuery: {
      get () {
        return this.$store.getters[this.productVuexBasePath + '/productQuery']
      },
      set (val) {
        this.$store.commit(this.productVuexBasePath + '/UPDATE_PRODUCT_QUERY', val)
      }
    },
    productList () {
      return this.$store.getters[this.productVuexBasePath + '/productList']
    },
    productItem () {
      return this.$store.getters[this.productVuexBasePath + '/productItem']
    }
  },
  methods: {
    getProductAllData (params = { query: this.productQuery }) {
      this.loadProductList(params)
      this.loadProductPagination(params)
    },
    loadProductList (params = { query: '' }) {
      this.$store.dispatch(this.productVuexBasePath + '/getProductList', params)
    },
    loadProductPagination (params = { query: '' }) {
      this.$store.dispatch(this.productVuexBasePath + '/getProductPagination', params)
    },
    getProductItem (id) {
      return this.$store.dispatch(this.productVuexBasePath + '/getProductItem', id)
    },
    updateProduct ({ data, id }) {
      return this.$store.dispatch(this.productVuexBasePath + '/updateProduct', { data, id })
    }
  }
}

export default allProductMixins
