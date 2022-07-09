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
    productList () {
      return this.$store.getters[this.productVuexBasePath + '/productList']
    },
    productItem () {
      return this.$store.getters[this.productVuexBasePath + '/productItem']
    }
  },
  methods: {
    getProductAllData (params = { query: '' }) {
      this.loadProductList(params)
      this.loadProductPagination()
    },
    loadProductList (params = { query: '' }) {
      this.$store.dispatch(this.productVuexBasePath + '/getProductList', params)
    },
    loadProductPagination (params = { query: '' }) {
      this.$store.dispatch(this.productVuexBasePath + '/getProductPagination', params)
    },
    getProductItem (id) {
      return this.$store.dispatch(this.productVuexBasePath + '/getProductItem', id)
    }
    // loadProductByNumber (number) {
    //   this.$store.dispatch(this.productVuexBasePath + '/getProductByNumber', number)
    // },
    // updateProduct ({ data, productId }) {
    //   return this.$store.dispatch(this.productVuexBasePath + '/updateProduct', { data, productId })
    // },

    // updateCoverSkuForProductId ({ data, productId }) {
    //   return this.$store.dispatch(this.productVuexBasePath + '/updateCoverSkuForProductId', { data, productId })
    // },
    // loadProductAllList (params) {
    //   return this.$store.dispatch(this.productVuexBasePath + '/getProductAllList', params)
    // }
  }
}

export default allProductMixins
