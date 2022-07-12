const state = () => {
  return {
  }
}

const getters = {
}
const mutations = {
}
const actions = {
  createShipping ({ commit }, params) {
    return new Promise((resolve, reject) => {
      this.$axios.post('shipping', params).then((resp) => {
        resolve(resp.data.data)
      })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getShippingList ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.get('shipping').then((resp) => {
        resolve(resp.data.data)
      })
        .catch((error) => {
          reject(error)
        })
    })
  },
  updateShipping ({ commit }, { data, shippingId }) {
    return new Promise((resolve, reject) => {
      this.$axios.put('shipping/' + shippingId, data).then((resp) => {
        resolve(resp.data.data)
      })
        .catch((error) => {
          reject(error)
        })
    })
  },
  deleteShipping ({ commit }, { newShippingId, shippingId }) {
    return new Promise((resolve, reject) => {
      this.$axios.delete('shipping/' + shippingId + '?new_shipping_id=' + newShippingId).then((resp) => {
        resolve(resp.data.data)
      })
        .catch((error) => {
          reject(error)
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
