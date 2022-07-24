import paginationMixins from '@/vuexUtils/paginationMixins'
const state = () => {
  return {
    accountingTransactionsList: [],
    accountingTransactionsQuery: '',
    accountingTransactionsItem: {}
  }
}
const getters = {
  accountingTransactionsList: state => state.accountingTransactionsList,
  accountingTransactionsQuery: state => state.accountingTransactionsQuery,
  accountingTransactionsItem: state => state.accountingTransactionsItem
}
const mutations = {
  UPDATE_ACCOUNTING_TRANSACTIONS_LIST (state, val) {
    state.accountingTransactionsList = val
  },
  UPDATE_ACCOUNTING_TRANSACTIONS_QUERY (state, val) {
    state.accountingTransactionsQuery = val
  },
  UPDATE_ACCOUNTING_TRANSACTIONS_ITEM (state, val) {
    state.accountingTransactionsItem = val
  }
}
const actions = {
  getAccountingTransactionsList ({ state, commit, dispatch }, params = {}) {
    return new Promise((resolve) => {
      dispatch('beforeGetDataHandelr', params).then((data) => {
        dispatch('api/accountingTransactions/getAccountingTransactionsList', data, { root: true })
          .then((resp) => {
            dispatch('afterGetDataHandler', resp)
            if (resp && Array.isArray(resp)) {
              commit('UPDATE_ACCOUNTING_TRANSACTIONS_LIST', resp)
            }
            resolve(resp)
          })
      })
    })
  },
  getAccountingTransactionsPagination ({ state, commit, dispatch }, params = { query: '' }) {
    return new Promise((resolve, reject) => {
      dispatch('beforeGetPaginationHandler', params).then((data) => {
        dispatch('api/accountingTransactions/getAccountingTransactionsPagination', params, { root: true })
          .then((resp) => {
            dispatch('afterGetPaginationHandler', resp)
            resolve(resp)
          }).catch((err) => {
            dispatch('afterGetPaginationHandler', false)
            reject(err)
          })
      })
    })
  },
  updateAccountingTransactions ({ state, commit, dispatch }, { params, id }) {
    return new Promise((resolve, reject) => {
      dispatch('logic/fetching/beforeUpdateFatching', params, { root: true }).then((_) => {
        dispatch('api/accountingTransactions/updateAccountingTransactions', { params, id }, { root: true })
          .then((resp) => {
            dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
            resolve(resp)
          }).catch((error) => {
            dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
            reject(error)
          })
      })
    })
  },
  createAccountingTransactions ({ state, commit, dispatch }, { params, id }) {
    return new Promise((resolve, reject) => {
      dispatch('logic/fetching/beforeUpdateFatching', params, { root: true }).then((_) => {
        dispatch('api/accountingTransactions/createAccountingTransactions', { params, id }, { root: true })
          .then((resp) => {
            dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
            resolve(resp)
          }).catch((error) => {
            dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
            reject(error)
          })
      })
    })
  }
}

export default {
  state: paginationMixins.stateMixins(state),
  mutations: Object.assign(mutations, paginationMixins.mutationsMixins),
  actions: Object.assign(actions, paginationMixins.actionsMixins),
  getters: Object.assign(getters, paginationMixins.gettersMixins)
}
