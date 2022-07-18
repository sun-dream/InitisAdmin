import paginationMixins from '@/vuexUtils/paginationMixins'
const state = () => {
  return {
    paymentsList: [],
    paymentsQuery: '',
    paymentsItem: {}
  }
}
const getters = {
  paymentsList: state => state.paymentsList,
  paymentsQuery: state => state.paymentsQuery,
  paymentsItem: state => state.paymentsItem
}
const mutations = {
  UPDATE_PAYMENTS_LIST (state, val) {
    state.paymentsList = val
  },
  UPDATE_PAYMENTS_QUERY (state, val) {
    state.paymentsQuery = val
  },
  UPDATE_PAYMENTS_ITEM (state, val) {
    state.paymentsItem = val
  }
}
const actions = {
  getPaymentList ({ state, commit, dispatch }, params = {}) {
    return new Promise((resolve) => {
      dispatch('beforeGetDataHandelr', params).then((data) => {
        dispatch('api/payments/getPaymentsList', data, { root: true })
          .then((resp) => {
            dispatch('afterGetDataHandler', resp)
            if (resp && Array.isArray(resp)) {
              commit('UPDATE_PAYMENTS_LIST', resp)
            }
            resolve(resp)
          })
      })
    })
  },
  getPaymentListPagination ({ state, commit, dispatch }, params = { query: '' }) {
    return new Promise((resolve, reject) => {
      dispatch('beforeGetPaginationHandler', params).then((data) => {
        dispatch('api/payments/getPaymentsListPagination', params, { root: true })
          .then((resp) => {
            dispatch('afterGetPaginationHandler', resp)
            resolve(resp)
          }).catch((err) => {
            dispatch('afterGetPaginationHandler', false)
            reject(err)
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
