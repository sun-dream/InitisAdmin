import paginationMixins from '@/vuexUtils/paginationMixins'
const state = () => {
  return {
    withdrawalRequestsList: [],
    withdrawalRequestsQuery: '',
    withdrawalRequestsItem: {}
  }
}
const getters = {
  withdrawalRequestsList: state => state.withdrawalRequestsList,
  withdrawalRequestsQuery: state => state.withdrawalRequestsQuery,
  withdrawalRequestsItem: state => state.withdrawalRequestsItem
}
const mutations = {
  UPDATE_WITHDRAWAL_REQUESTS_LIST (state, val) {
    state.withdrawalRequestsList = val
  },
  UPDATE_WITHDRAWAL_REQUESTS_QUERY (state, val) {
    state.withdrawalRequestsQuery = val
  },
  UPDATE_WITHDRAWAL_REQUESTS_ITEM (state, val) {
    state.withdrawalRequestsItem = val
  }
}
const actions = {
  getWithdrawalRequestsList ({ state, commit, dispatch }, params = {}) {
    return new Promise((resolve) => {
      dispatch('beforeGetDataHandelr', params).then((data) => {
        dispatch('api/withdrawalRequests/getWithdrawalRequestsList', data, { root: true })
          .then((resp) => {
            dispatch('afterGetDataHandler', resp)
            if (resp && Array.isArray(resp)) {
              commit('UPDATE_WITHDRAWAL_REQUESTS_LIST', resp)
            }
            resolve(resp)
          })
      })
    })
  },
  getWithdrawalRequestsPagination ({ state, commit, dispatch }, params = { query: '' }) {
    return new Promise((resolve, reject) => {
      dispatch('beforeGetPaginationHandler', params).then((data) => {
        dispatch('api/withdrawalRequests/getWithdrawalRequestsPagination', params, { root: true })
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
  getWithdrawalRequestsItem ({ state, commit, dispatch }, id = null) {
    return new Promise((resolve) => {
      dispatch('logic/fetching/beforeUpdateFatching', {}, { root: true }).then((_) => {
        dispatch('api/withdrawalRequests/getWithdrawalRequestsItem', id, { root: true }).then((resp) => {
          commit('UPDATE_WITHDRAWAL_REQUESTS_ITEM', resp)
          resolve(resp)
          dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
        })
      })
    })
  },
  updateWithdrawalRequests ({ state, commit, dispatch }, { params, id }) {
    return new Promise((resolve, reject) => {
      dispatch('logic/fetching/beforeUpdateFatching', params, { root: true }).then((_) => {
        dispatch('api/withdrawalRequests/updateWithdrawalRequests', { params, id }, { root: true })
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
  updateWithdrawalRequestsOfSuccess ({ state, commit, dispatch }, { params, id }) {
    return new Promise((resolve, reject) => {
      dispatch('logic/fetching/beforeUpdateFatching', params, { root: true }).then((_) => {
        dispatch('api/withdrawalRequests/updateWithdrawalRequestsOfSuccess', { params, id }, { root: true })
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
