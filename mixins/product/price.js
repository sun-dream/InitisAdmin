const priceMixins = {
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    getDropshippingCostMin (product) {
      let min = 9999999
      if (Array.isArray(product.skus) && product.skus.length > 0) {
        product.skus.forEach((sku) => {
          if (sku.purchase_price < min ) { min = sku.purchase_price }
        })
        return min
      } else {
        return null
      }
    },
    getDropshippingCostMax (product) {
      let max = 0
      if (Array.isArray(product.skus) && product.skus.length > 0) {
        product.skus.forEach((sku) => {
          if (sku.purchase_price > max ) { max = sku.purchase_price }
        })
        return max
      } else {
        return null
      }
    },
    getRetailMin (product) {
      let min = 9999999
      if (Array.isArray(product.skus) && product.skus.length > 0) {
        product.skus.forEach((sku) => {
          if (sku.recommend_retail_price < min ) { min = sku.recommend_retail_price }
        })
        return min
      } else {
        return null
      }
    },
    getRetailMax (product) {
      let max = 0
      if (Array.isArray(product.skus) && product.skus.length > 0) {
        product.skus.forEach((sku) => {
          if (sku.recommend_retail_price > max ) { max = sku.recommend_retail_price }
        })
        return max
      } else {
        return null
      }
    },
    getSampleCostMin(product){
      let min = 9999999
      if (Array.isArray(product.skus) && product.skus.length > 0) {
        product.skus.forEach((sku) => {
          if (sku.sample_price < min ) { min = sku.sample_price }
        })
        return min
      } else {
        return null
      }
    },
    getSampleCostMax(product){
      let max = 0
      if (Array.isArray(product.skus) && product.skus.length > 0) {
        product.skus.forEach((sku) => {
          if (sku.sample_price > max ) { max = sku.sample_price }
        })
        return max
      } else {
        return null
      }
    }
  }
}

export default priceMixins
