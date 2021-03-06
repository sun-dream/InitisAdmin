
const state = () => {
  return {
  }
}

const getters = {

}
const mutations = {

}
const actions = {
  createdSku ({ state, commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      dispatch('logic/fetching/beforeUpdateFatching', params, { root: true }).then((_) => {
        dispatch('api/product/sku/createdProductSku', params, { root: true })
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
  updateSku ({ state, commit, dispatch }, { params, skuId }) {
    return new Promise((resolve, reject) => {
      dispatch('api/product/sku/updateSku', { params, skuId }, { root: true })
        .then((data) => {
          resolve(data)
        }).catch((err) => {
          reject(err)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
