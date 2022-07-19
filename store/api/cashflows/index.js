const state = () => {
  return {
  }
}

const getters = {
}
const mutations = {
}
const actions = {
  getCashflows ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.get('cashflows/admin/all', { params }).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  getCashflowsPagination ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.get('cashflows/admin/all/pagination', { params }).then((resp) => {
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
