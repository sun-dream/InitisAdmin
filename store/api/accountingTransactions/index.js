const state = () => {
  return {
  }
}

const getters = {
}
const mutations = {
}
const actions = {
  getAccountingTransactionsList ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.get('accounting_transactions/admin/all', { params }).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  getAccountingTransactionsPagination ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.get('accounting_transactions/admin/all/pagination', { params }).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  createAccountingTransactions ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.post('accounting_transactions/admin', params).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  updateAccountingTransactions  ({ commit }, { id, params }) {
    return new Promise((resolve) => {
      this.$axios.put('preset_libraries/admin/id/' + id, params).then((resp) => {
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
