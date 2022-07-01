const allProductMixins = {
  data() {
    return {
      productVuexBasePath: 'logic/product',
      productFilterForm: {
        query:''
      },
      formRules: {
        name: [(v) => !!v || "name is required"],
      }, 
    }
  },
  computed: {
    productList() {
      return this.$store.getters[this.productVuexBasePath + '/productList']
    },
    productObject() {
      return this.$store.getters[this.productVuexBasePath + '/productObject']
    },
    productAllList() { //滚动加载数据存放
      return this.$store.getters[this.productVuexBasePath + '/productAllList']
    }
  },
  methods: {
    getProductAllData(data){
      this.loadProductList(data)
      this.loadProductPagination()
    },
    loadProductList(data) {
      this.$store.dispatch(this.productVuexBasePath + '/getProductList', data)
    },
    loadProductPagination(data={query:''}) {
      this.$store.dispatch(this.productVuexBasePath + '/getProductPagination', data)
    },
    loadProduct(id) {
      this.$store.dispatch(this.productVuexBasePath + '/getProduct', id)
    },
    loadProductByNumber(number) {
      this.$store.dispatch(this.productVuexBasePath + '/getProductByNumber', number)
    },
    updateProduct({data, productId}) {
      return this.$store.dispatch(this.productVuexBasePath + '/updateProduct', {data, productId})
    },
 
    updateCoverSkuForProductId({data, productId}) {
      return this.$store.dispatch(this.productVuexBasePath + '/updateCoverSkuForProductId', {data, productId})
    },
    loadProductAllList(params) {
      return this.$store.dispatch(this.productVuexBasePath + '/getProductAllList',params)
    }
  }
}

export default allProductMixins
