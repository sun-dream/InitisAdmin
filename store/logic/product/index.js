import paginationMixins from '@/vuexUtils/paginationMixins'

const state = () => {
  return {
    productList: [],
    productAllList: [],
    productObject: {},
    productBlockMap: new Map(),
    productBlockList: []
  }
}
const getters = {
  productList: state => state.productList,
  productAllList: state => state.productAllList,
  productObject: state => state.productObject,
  productBlockMap: state => state.productBlockMap,
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
  },
  UPDATE_PRODUCT_BLOCK_LIST (state, val) {
    state.productBlockList = val
  },
  UPDATE_BLOCK_MAP (state, val) {
    state.productBlockMap.set(val.index, { name: val.name, items: val.items, filterData: val.filterData })
    const tempMap = state.productBlockMap
    state.productBlockMap = new Map()
    const sortIndex = []
    if (tempMap.size > 0) {
      tempMap.forEach(function (value, key, map) {
        sortIndex.push(key)
      })
    }
    // 冒泡排序，保证前端的数据展示顺序是正确的
    if (sortIndex.length > 1) {
      for (let i = 0; i < sortIndex.length - 1; i++) {
        // 如果前一个数 大于 后一个数 就交换两数位置
        if (sortIndex[i] > sortIndex[i + 1]) {
          const temp = sortIndex[i]
          sortIndex[i] = sortIndex[i + 1]
          sortIndex[i + 1] = temp
        }
      }
    }
    for (const i in sortIndex) {
      state.productBlockMap.set(sortIndex[i], tempMap.get(sortIndex[i]))
    }
  }
}
const actions = {
  getProductList ({ state, commit, dispatch }, params = {}) {
    return new Promise((resolve, reject) => {
      dispatch('beforeGetDataHandelr', params).then((data) => {
        dispatch('api/product/getProductList', data, { root: true })
          .then((data) => {
            dispatch('afterGetDataHandler', data)
            if (Array.isArray(data)) {
              commit('UPDATE_PRODUCT_LIST_DATA', data)
            }
            resolve(data)
          }).catch((err) => {
            dispatch('afterGetDataHandler', false)
            reject(err)
          })
      })
    })
  },
  getProductPagination ({ state, commit, dispatch }, params = {}) {
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
  getProductByNumber ({ state, commit, dispatch }, number = null) {
    return new Promise((resolve) => {
      dispatch('api/product/getProductByNumber', number, { root: true }).then((resp) => {
        commit('UPDATE_PRODUCT_OBJECT_DATA', resp)
        resolve(resp)
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
  },
  uploadProductImage ({ state, commit, dispatch }, params = {}) {
    return new Promise((resolve) => {
      dispatch('api/product/uploadProductImage', params, { root: true })
        .then((resp) => {
          resolve(resp)
        })
    })
  },
  checkSkuNumber ({ state, commit, dispatch }, skuNumber) {
    return new Promise((resolve, reject) => {
      dispatch('logic/fetching/beforeUpdateFatching', true, { root: true }).then((_) => {
        dispatch('api/product/checkSkuNumber', skuNumber, { root: true })
          .then((data) => {
            dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
            resolve(data)
          }).catch((error) => {
            dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
            reject(error)
          })
      })
    })
  },
  updateCoverSkuForProductId ({ state, commit, dispatch }, { data, productId }) {
    return new Promise((resolve, reject) => {
      dispatch('logic/fetching/beforeUpdateFatching', true, { root: true }).then((_) => {
        dispatch('api/product/updateCoverSkuForProductId', { data, productId }, { root: true })
          .then((data) => {
            dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
            resolve(data)
          }).catch((error) => {
            dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
            reject(error)
          })
      })
    })
  },
  calculateCalcCost ({ state, commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      dispatch('logic/fetching/beforeUpdateFatching', true, { root: true }).then((_) => {
        dispatch('api/product/calculateCalcCost', params, { root: true })
          .then((data) => {
            dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
            resolve(data)
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
