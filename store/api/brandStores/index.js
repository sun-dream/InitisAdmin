const state = () => {
  return {
  }
}

const getters = {
}
const mutations = {
}
const actions = {
  getBrandStores ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.get('brand_stores/admin/all', { params }).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  getBrandStoresPagination ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.get('brand_stores/admin/all/pagination', { params }).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  getBrandStoreItem ({ commit }, id) {
    return new Promise((resolve) => {
      this.$axios.get('brand_stores/admin/id/' + id).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  updateBrandStoreItem ({ commit }, { id, params }) {
    return new Promise((resolve) => {
      this.$axios.put('brand_stores/admin/id/' + id, params).then((resp) => {
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
