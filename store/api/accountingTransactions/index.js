const state = () => {
  return {
  }
}

const getters = {
}
const mutations = {
}
const testData = [
  {
    method: 'BANK_TRANSACTION',
    third_party_transactional_id: 'string',
    withdrawal_request_id: 'string',
    source_amount: 0,
    source_currency: 'AED',
    transaction_fee: 0,
    transaction_currency: 'AED',
    exchange_rate: 0,
    target_amount: 0,
    target_currency: 'AED',
    status: 'ACTIVE',
    source_financial_account_id: 'string',
    target_financial_account_id: 'string',
    id: 'string',
    create_at: '2022-07-24T14:25:18.199Z',
    update_at: '2022-07-24T14:25:18.199Z'
  }
]
const actions = {
  getAccountingTransactionsList ({ commit }, params) {
    return new Promise((resolve) => {
      // this.$axios.get('accounting_transactions/admin/all', { params }).then((resp) => {
      //   resolve(resp.data)
      // })
      resolve(testData)
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
      this.$axios.put('accounting_transactions/admin/id/' + id, params).then((resp) => {
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
