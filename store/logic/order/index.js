import paginationMixins from '@/vuexUtils/paginationMixins'

const state = () => {
  return {
    orderQuery: '',
    orderList: []
  }
}

const getters = {
  orderQuery: state => state.orderQuery,
  orderList: state => state.orderList

}
const mutations = {
  UPDATE_ORDER_QUERY (state, val) {
    state.orderQuery = val
  },
  UPDATE_ORDER_LIST_DATA (state, val) {
    state.orderList = val
  }
}
const actions = {
  getOrderList ({ state, commit, dispatch }, params = {}) {
    return new Promise((resolve) => {
      dispatch('beforeGetDataHandelr', params).then((data) => {
        dispatch('api/orders/getOrderList', data, { root: true })
          .then((resp) => {
            dispatch('afterGetDataHandler', resp)
            if (resp && Array.isArray(resp)) {
              commit('UPDATE_ORDER_LIST_DATA', resp)
            }
            resolve(resp)
          })
      })
    })
  },
  getOrderPagination ({ state, commit, dispatch }, params = { query: '' }) {
    return new Promise((resolve, reject) => {
      dispatch('beforeGetPaginationHandler', params).then((data) => {
        dispatch('api/orders/getOrderPagination', params, { root: true })
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
