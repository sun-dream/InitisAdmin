const state = () => {
  return {
  }
}

const getters = {
}
const mutations = {
}
const actions = {
  getWithdrawalRequestsList ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.get('withdrawal_requests/admin/all', { params }).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  getWithdrawalRequestsPagination ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.get('withdrawal_requests/admin/all/pagination', { params }).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  getWithdrawalRequestsItem ({ commit }, id) {
    return new Promise((resolve) => {
      this.$axios.get('withdrawal_requests/admin/id/' + id).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  updateWithdrawalRequests ({ commit }, { id, params }) {
    return new Promise((resolve) => {
      this.$axios.put('withdrawal_requests/admin/id/' + id, params).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  updateWithdrawalRequestsOfSuccess ({ commit }, { id, params }) {
    return new Promise((resolve) => {
      this.$axios.put('withdrawal_requests/admin/id/' + id + '/success', params).then((resp) => {
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
