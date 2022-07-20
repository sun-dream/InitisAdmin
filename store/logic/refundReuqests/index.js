import paginationMixins from '@/vuexUtils/paginationMixins'
const state = () => {
  return {
    refundreQuestsList: [],
    refundrequestsQuery: '',
    refundrequestsItem: {}
  }
}
const getters = {
  refundreQuestsList: state => state.refundreQuestsList,
  refundrequestsQuery: state => state.refundrequestsQuery,
  refundrequestsItem: state => state.refundrequestsItem
}
const mutations = {
  UPDATE_REFUND_REQUESTS_LIST (state, val) {
    state.refundreQuestsList = val
  },
  UPDATE_REFUND_REQUESTS_QUERY (state, val) {
    state.refundrequestsQuery = val
  },
  UPDATE_REFUND_REQUESTS_ITEM (state, val) {
    state.refundrequestsItem = val
  }
}
const actions = {
  getRefundRequestsList ({ state, commit, dispatch }, params = {}) {
    return new Promise((resolve) => {
      dispatch('beforeGetDataHandelr', params).then((data) => {
        dispatch('api/refundReuqests/getRefundRequestsList', data, { root: true })
          .then((resp) => {
            dispatch('afterGetDataHandler', resp)
            if (resp && Array.isArray(resp)) {
              commit('UPDATE_REFUND_REQUESTS_LIST', resp)
            }
            resolve(resp)
          })
      })
    })
  },
  getRefundRequestsPagination ({ state, commit, dispatch }, params = { query: '' }) {
    return new Promise((resolve, reject) => {
      dispatch('beforeGetPaginationHandler', params).then((data) => {
        dispatch('api/refundReuqests/getRefundRequestsPagination', params, { root: true })
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
  getRefundRequestsItem ({ state, commit, dispatch }, id = null) {
    return new Promise((resolve) => {
      dispatch('logic/fetching/beforeUpdateFatching', {}, { root: true }).then((_) => {
        dispatch('api/refundReuqests/getRefundRequestsItem', id, { root: true }).then((resp) => {
          commit('UPDATE_REFUND_REQUESTS_ITEM', resp)
          resolve(resp)
          dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
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
