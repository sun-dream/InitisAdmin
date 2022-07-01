import paginationMixins from '@/vuexUtils/paginationMixins'

const state = () => {
  return {
    orderPayments: [],
  }
}
const getters = {
  orderPayments: state => state.orderPayments
}
const mutations = {
  UPDATE_ORDER_PAYMENTS(state, val) {
    state.orderPayments = val
  }
}
const actions = {
  getPaymentList({ state, commit, dispatch }, params = {}) {
    return new Promise((resolve, reject) => {
      dispatch('beforeGetAllHandler', params).then((data) => {
        dispatch('api/payment/getPaymentList', data, { root: true })
          .then((data) => {
            dispatch('afterGetAllHandler', data)
            if (data && Array.isArray(data.items)) {
              commit('UPDATE_ORDER_PAYMENTS', data.items)
            }
            resolve(data.items)
          })
          .catch((err) => {
            dispatch('afterGetAllHandler', false)
            reject(err)
          })
      })
    })
  },
  paymentPayOrder({ state, commit, dispatch }, { data, factingOptin }) {
    return new Promise((resolve, reject) => {
      dispatch('logic/fetching/updateFatchingOption', factingOptin, { root: true })
      dispatch('api/payment/paymentPayOrder', data, { root: true })
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
          reject(err)
        })
    })
  },
  getPaymentOrders({ state, commit, dispatch }, { data, factingOptin }) {
    return new Promise((resolve, reject) => {
      dispatch('logic/fetching/updateFatchingOption', factingOptin, { root: true })
      dispatch('api/payment/paymentOrders', data, { root: true })
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
          reject(err)
        })
    })
  },
}

export default {
  state: paginationMixins.stateMixins(state),
  mutations: Object.assign(mutations, paginationMixins.mutationsMixins),
  actions: Object.assign(actions, paginationMixins.actionsMixins),
  getters: Object.assign(getters, paginationMixins.gettersMixins)
}
