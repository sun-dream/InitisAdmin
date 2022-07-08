import paginationMixins from '@/vuexUtils/paginationMixins'

const state = () => {
  return {
    productList: [],
    productAllList: [],
    productObject: {},
    productBlockList: []
  }
}
const getters = {
  productList: state => state.productList,
  productAllList: state => state.productAllList,
  productObject: state => state.productObject,
  productBlockList: state => state.productBlockList
}
const mutations = {
  UPDATE_PRODUCT_LIST_DATA (state, val) {
    state.productList = val
  },
  UPDATE_PRODUCT_All_LIST (state, val) {
    if (Array.isArray(val) && val.length) {
      state.productAllList.push.apply(state.productAllList, val)
    }
  },
  CLEAT_PRODUCT_ALL_LIST (state) {
    state.productAllList = []
  },
  UPDATE_PRODUCT_OBJECT_DATA (state, val) {
    state.productObject = val
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
        resolve(data)
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
  getProduct ({ state, commit, dispatch }, id = null) {
    return new Promise((resolve) => {
      dispatch('api/product/getProduct', id, { root: true }).then((resp) => {
        commit('UPDATE_PRODUCT_OBJECT_DATA', resp)
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
            console.log(err, 12312)

            dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
            reject(err)
          })
      })
    })
  },
  updateProduct ({ state, commit, dispatch }, { data, productId }) {
    return new Promise((resolve) => {
      dispatch('api/product/updateProduct', { data, productId }, { root: true })
        .then((resp) => {
          resolve(resp)
          if (resp === null && resp === undefined) {
            resolve(null)
          }
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
