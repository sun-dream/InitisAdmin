
const state = () => {
  return {
    shippingList: []
  }
}
const getters = {
  shippingList: state => state.shippingList
}
const mutations = {
  UPDATE_SHIPPING_LIST (state, val) {
    state.shippingList = val
  }
}
const actions = {
  createShipments ({ state, commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      dispatch('logic/fetching/beforeUpdateFatching', params, { root: true }).then((_) => {
        dispatch('api/shipments/createShipments', params, { root: true })
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
  updateShipments ({ state, commit, dispatch }, { params, id }) {
    return new Promise((resolve, reject) => {
      dispatch('logic/fetching/beforeUpdateFatching', params, { root: true }).then((_) => {
        dispatch('api/shipments/updateShipments', { params, id }, { root: true })
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
  state,
  mutations,
  actions,
  getters
}
