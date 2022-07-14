import paginationMixins from '@/vuexUtils/paginationMixins'

const state = () => {
  return {
    productQuery: '',
    productList: [],
    productItem: {}
  }
}
const getters = {
  productQuery: state => state.productQuery,
  productList: state => state.productList,
  productItem: state => state.productItem
}
const mutations = {
  UPDATE_PRODUCT_QUERY (state, val) {
    state.productQuery = val
  },
  UPDATE_PRODUCT_LIST_DATA (state, val) {
    state.productList = val
  },
  UPDATE_PRODUCT_ITEM (state, val) {
    state.productItem = val
  }
}
const actions = {
  getProductList ({ state, commit, dispatch }, params = { query: '' }) {
    return new Promise((resolve, reject) => {
      dispatch('beforeGetDataHandelr', params).then((data) => {
        dispatch('api/product/getProductList', data, { root: true })
          .then((resp) => {
            dispatch('afterGetDataHandler', resp)
            if (Array.isArray(resp)) {
              commit('UPDATE_PRODUCT_LIST_DATA', resp)
            }
            resolve(resp)
          }).catch((err) => {
            dispatch('afterGetDataHandler', false)
            reject(err)
          })
      })
    })
  },
  getProductPagination ({ state, commit, dispatch }, params = { query: '' }) {
    return new Promise((resolve, reject) => {
      dispatch('beforeGetPaginationHandler', params).then((data) => {
        dispatch('api/product/getProductPagination', params, { root: true })
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
  getProductItem ({ state, commit, dispatch }, id = null) {
    return new Promise((resolve) => {
      dispatch('logic/fetching/beforeUpdateFatching', {}, { root: true }).then((_) => {
        dispatch('api/product/getProductItem', id, { root: true }).then((resp) => {
          commit('UPDATE_PRODUCT_ITEM', resp)
          resolve(resp)
          dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
        })
      })
    })
  },
  createdProduct ({ state, commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      dispatch('logic/fetching/beforeUpdateFatching', params, { root: true }).then((_) => {
        dispatch('api/product/createProduct', params, { root: true })
          .then((data) => {
            dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
            resolve(data)
          }).catch((err) => {
            dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
            reject(err)
          })
      })
    })
  },
  updateProduct ({ state, commit, dispatch }, { data, id }) {
    return new Promise((resolve) => {
      dispatch('logic/fetching/beforeUpdateFatching', {}, { root: true }).then((_) => {
        dispatch('api/product/updateProduct', { data, id }, { root: true })
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
