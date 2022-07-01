const state = () => {
  return {
  }
}

const getters = {
}
const mutations = {
}
const actions = {
  getCategory({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.get('categories/admin/all', {params}).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  getCategoryPagination({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.get('categories/admin/all/pagination', {params}).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  createdProductCategory({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.post('categories/admin', params).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  updateProductCategory({ commit }, { params, categoryId }) {
    return new Promise((resolve) => {
      this.$axios.put('categories/admin/id/' + categoryId, params).then((resp) => {
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
