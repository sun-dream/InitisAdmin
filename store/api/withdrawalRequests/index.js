const state = () => {
  return {
  }
}
// eslint-disable-next-line no-unused-vars
const testData = [{
  user_id: 'string',
  status: 'PENDING',
  source_financial_account_id: 'string',
  target_financial_account_id: 'string',
  source_currency: 'AED',
  source_amount: 0,
  real_exchange_rate: 0,
  platform_exchange_rate: 0,
  target_currency: 'AED',
  target_amount: 0,
  reject_note: 'string',
  withdraw_note: 'string',
  transaction_fee: 0,
  transaction_currency: 'AED',
  wallet_id: 'string',
  id: 'string',
  create_at: '2022-07-22T11:19:14.167Z',
  update_at: '2022-07-22T11:19:14.167Z',
  target_financial_account: {
    user_id: 'string',
    type: 'PAYPAL',
    account: 'string',
    status: 'ACTIVE',
    expiration_year: 'string',
    expiration_month: 'string',
    cvv: 'string',
    billing_address_id: 'string',
    use_at: '2022-07-22T11:19:14.167Z',
    id: 'string',
    create_at: '2022-07-22T11:19:14.167Z',
    update_at: '2022-07-22T11:19:14.167Z'
  },
  accounting_transactions: [{
    method: 'BANK_TRANSACTION',
    third_party_transactional_id: 'string',
    withdrawal_request_id: 'string',
    source_amount: 0,
    source_currency: 'AED',
    transaction_fee: 0,
    transaction_currency: 'AED',
    target_amount: 0,
    target_currency: 'AED',
    status: 'ACTIVE',
    exchange_rate: 0,
    source_financial_account_id: 'string',
    target_financial_account_id: 'string',
    id: 'string',
    create_at: '2022-07-22T11:19:14.167Z',
    update_at: '2022-07-22T11:19:14.167Z'
  }
  ]
}
]
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
      // resolve(testData)
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
      // resolve(testData[0])
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
