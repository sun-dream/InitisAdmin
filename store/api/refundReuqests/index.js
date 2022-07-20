const state = () => {
  return {
  }
}

const getters = {
}
const mutations = {
}
const actions = {
  getRefundRequestsList ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.get('refund_requests/admin/all', { params }).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  getRefundRequestsPagination ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.get('refund_requests/admin/all/pagination', { params }).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  getRefundRequestsItem ({ commit }, id) {
    return new Promise((resolve) => {
      this.$axios.get('refund_requests/admin/id/' + id).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  updateRefundRequest ({ commit }, { id, params }) {
    return new Promise((resolve) => {
      this.$axios.put('refund_requests/admin/id/' + id, params).then((resp) => {
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
