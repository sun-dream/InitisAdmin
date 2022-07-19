import paginationMixins from '@/vuexUtils/paginationMixins'

const state = () => {
  return {
    cashflowsQuery: '',
    cashflowsList: []
  }
}
const getters = {
  cashflowsQuery: state => state.cashflowsQuery,
  cashflowsList: state => state.cashflowsList
}
const mutations = {
  UPDATE_CASHFLOW_QUERY (state, val) {
    state.cashflowsQuery = val
  },
  UPDATE_CASHFLOW_LIST_DATA (state, val) {
    state.cashflowsList = val
  }
}
const actions = {
  getCashflowList ({ state, commit, dispatch }, params = { query: '' }) {
    return new Promise((resolve, reject) => {
      dispatch('beforeGetDataHandelr', params).then((data) => {
        dispatch('api/cashflows/getCashflows', data, { root: true })
          .then((resp) => {
            dispatch('afterGetDataHandler', resp)
            if (Array.isArray(resp)) {
              commit('UPDATE_CASHFLOW_LIST_DATA', resp)
            }
            resolve(resp)
          }).catch((err) => {
            dispatch('afterGetDataHandler', false)
            reject(err)
          })
      })
    })
  },
  getCashflowPagination ({ state, commit, dispatch }, params = { query: '' }) {
    return new Promise((resolve, reject) => {
      dispatch('beforeGetPaginationHandler', params).then((data) => {
        dispatch('api/cashflows/getCashflowsPagination', params, { root: true })
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
