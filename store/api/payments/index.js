const state = () => {
  return {
  }
}

const getters = {
}
const mutations = {
}
const actions = {
  getPaymentsList ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.get('payments/admin/all', { params }).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  getPaymentsListPagination ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.get('payments/admin/all/pagination', { params }).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  getPaymentItem ({ commit }, id) {
    return new Promise((resolve) => {
      this.$axios.get('payments/admin/id/' + id).then((resp) => {
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
