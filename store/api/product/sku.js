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
  }
  // updateProductCategory({ commit }, { params, categoryId }) {
  //   return new Promise((resolve) => {
  //     this.$axios.put('categories/admin/id/' + categoryId, params).then((resp) => {
  //       resolve(resp.data)
  //     })
  //   })
  // }
}

export default {
  state,
  mutations,
  actions,
  getters
}
