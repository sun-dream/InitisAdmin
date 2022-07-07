const productDetailMixins = {
  data () {
    return {
      productVuexBasePath: 'logic/product',
      productNumber: null
    }
  },
  computed: {
    productDetail () {
      return this.$store.getters[this.productVuexBasePath + '/productObject']
    }

  },
  methods: {
    loadProductByNumber (number) {
      return this.$store.dispatch(this.productVuexBasePath + '/getProductByNumber', number)
    },
    detectionRouteProductNumber () {
      const productNumber = this.$route.params.productNumber
      if (!this.isDef(productNumber) || productNumber === '') {
        this.notification({
          type: 'error',
          message: '<h4>Tip</h4><div>No information about the target product was found, 3 seconds later will return to the home page...</div>'
        })
        setTimeout(() => {
          this.jumpTo({ name: 'index' })
        }, 3000)
        return
      }
      this.productNumber = productNumber
    }
  }
}

export default productDetailMixins
