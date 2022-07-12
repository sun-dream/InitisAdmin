import paginationMixins from '@/vuexUtils/paginationMixins'
const state = () => {
  return {
    categoryData: []
  }
}

const getters = {
  categoryData: state => state.categoryData

}
const mutations = {
  UPDATA_CATEGORY_DATA (state, val) {
    state.categoryData = val
  }
}
const actions = {
  getCategoryData ({ state, commit, dispatch }, params = { query: '' }) {
    return new Promise((resolve, reject) => {
      dispatch('beforeGetDataHandelr', params).then((data) => {
        dispatch('api/product/category/getCategory', data, { root: true })
          .then((resp) => {
            dispatch('afterGetDataHandler', resp)
            if (Array.isArray(resp)) {
              commit('UPDATA_CATEGORY_DATA', resp)
            }
            resolve(resp)
          }).catch((err) => {
            dispatch('afterGetDataHandler', false)
            reject(err)
          })
      })
    })
  },
  getCategoryPagination ({ state, commit, dispatch }, params = { query: '' }) {
    return new Promise((resolve, reject) => {
      dispatch('beforeGetPaginationHandler', params).then((data) => {
        resolve(data)
        dispatch('api/product/category/getCategoryPagination', params, { root: true })
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
  createdProductCategory ({ state, commit, dispatch }, params = {}) {
    return new Promise((resolve, reject) => {
      dispatch('logic/fetching/beforeUpdateFatching', params, { root: true }).then((_) => {
        dispatch('api/product/category/createdProductCategory', params, { root: true })
          .then((resp) => {
            dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
            resolve(resp)
          }).catch((err) => {
            dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
            reject(err)
          })
      })
    })
  },
  updateProductCategory ({ state, commit, dispatch }, { params, categoryId }) {
    return new Promise((resolve) => {
      dispatch('api/product/category/updateProductCategory', { params, categoryId }, { root: true }).then((resp) => {
        resolve(resp)
      })
    })
  },
  deleteProductCategory ({ state, commit, dispatch }, { newCategoryId, categoryId }) {
    return new Promise((resolve) => {
      dispatch('api/product/category/deleteProductCategory', { newCategoryId, categoryId }, { root: true }).then((resp) => {
        resolve(resp)
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
