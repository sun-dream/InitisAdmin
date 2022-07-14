import paginationMixins from '@/vuexUtils/paginationMixins'

const state = () => {
  return {
    brandStoresQuery: '',
    brandStoresList: [],
    brandStoreItem: {}
  }
}
const getters = {
  brandStoresQuery: state => state.brandStoresQuery,
  brandStoresList: state => state.brandStoresList,
  brandStoreItem: state => state.brandStoreItem
}
const mutations = {
  UPDATE_BRAND_STORES_QUERY (state, val) {
    state.brandStoresQuery = val
  },
  UPDATE_BRAND_STORES_LIST_DATA (state, val) {
    state.brandStoresList = val
  },
  UPDATE_BRAND_STORE_ITEM (state, val) {
    state.brandStoreItem = val
  }
}
const actions = {
  getBrandStoresList ({ state, commit, dispatch }, params = { query: '' }) {
    return new Promise((resolve, reject) => {
      dispatch('beforeGetDataHandelr', params).then((data) => {
        dispatch('api/brandStores/getBrandStores', data, { root: true })
          .then((resp) => {
            dispatch('afterGetDataHandler', resp)
            if (Array.isArray(resp)) {
              commit('UPDATE_BRAND_STORES_LIST_DATA', resp)
            }
            resolve(resp)
          }).catch((err) => {
            dispatch('afterGetDataHandler', false)
            reject(err)
          })
      })
    })
  },
  getBrandStoresPagination ({ state, commit, dispatch }, params = { query: '' }) {
    return new Promise((resolve, reject) => {
      dispatch('beforeGetPaginationHandler', params).then((data) => {
        dispatch('api/brandStores/getBrandStoresPagination', params, { root: true })
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
  getBrandStoreItem ({ state, commit, dispatch }, id = null) {
    return new Promise((resolve) => {
      dispatch('logic/fetching/beforeUpdateFatching', {}, { root: true }).then((_) => {
        dispatch('api/brandStores/getBrandStoreItem', id, { root: true }).then((resp) => {
          commit('UPDATE_BRAND_STORE_ITEM', resp)
          resolve(resp)
          dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
        })
      })
    })
  },
  updateBrandStore ({ state, commit, dispatch }, { params, id }) {
    return new Promise((resolve) => {
      dispatch('logic/fetching/beforeUpdateFatching', {}, { root: true }).then((_) => {
        dispatch('api/brandStores/updateBrandStoreItem', { params, id }, { root: true })
          .then((resp) => {
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
