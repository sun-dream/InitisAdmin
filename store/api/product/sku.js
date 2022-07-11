const state = () => {
  return {
  }
}

const getters = {
}
const mutations = {
}
const actions = {
  createdProductSku ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.post('skus/admin', params).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  updateSku ({ commit }, { params, skuId }) {
    return new Promise((resolve) => {
      this.$axios.put('skus/admin/id/' + skuId, params).then((resp) => {
        resolve(resp.data)
      })
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
