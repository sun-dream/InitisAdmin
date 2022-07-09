const state = () => {
  return {
  }
}

const getters = {
}
const mutations = {
}
const actions = {
  getProductList ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.get('products/admin/all', { params }).then((resp) => {
        resolve(Array.isArray(resp.data) && resp.data.length > 0 ? resp.data : [])
      })
    })
  },
  getProductPagination ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.get('products/admin/all/pagination', { params }).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  createProduct ({ commit }, params) {
    return new Promise((resolve, reject) => {
      this.$axios.post('products/admin', params).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  getProductItem ({ commit }, id) {
    return new Promise((resolve) => {
      this.$axios.get('products/admin/id/' + id).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  updateProduct ({ commit }, { data, id }) {
    return new Promise((resolve) => {
      this.$axios.put('products/admin/id/' + id, data).then((resp) => {
        resolve(resp.data)
      })
    })
  }
  // getProductByNumber ({ commit }, number) {
  //   return new Promise((resolve) => {
  //     this.$axios.get('product/number/' + number).then((resp) => {
  //       resolve(resp.data.data)
  //     })
  //   })
  // },
  // },

  // checkSkuNumber ({ commit }, skuNumber) {
  //   return new Promise((resolve, reject) => {
  //     this.$axios.get('sku/check_sku_number/' + skuNumber).then((resp) => {
  //       resolve(resp.data.data)
  //     })
  //       .catch((error) => {
  //         reject(error)
  //       })
  //   })
  // },
  // updateCoverSkuForProductId ({ commit }, { productId, data }) {
  //   return new Promise((resolve, reject) => {
  //     this.$axios.put('sku/update_cover/' + productId, data).then((resp) => {
  //       resolve(resp.data.data)
  //     })
  //       .catch((error) => {
  //         reject(error)
  //       })
  //   })
  // },
  // calculateCalcCost ({ commit }, params) {
  //   return new Promise((resolve, reject) => {
  //     this.$axios.post('calculate/calc_cost', params).then((resp) => {
  //       resolve(resp.data.data)
  //     })
  //       .catch((error) => {
  //         reject(error)
  //       })
  //   })
  // }
}

export default {
  state,
  mutations,
  actions,
  getters
}
