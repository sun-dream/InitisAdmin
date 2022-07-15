const state = () => {
  return {
  }
}

const getters = {
}
const mutations = {
}
const actions = {
  createShipments ({ commit }, params) {
    return new Promise((resolve, reject) => {
      this.$axios.post('shipments/admin', params).then((resp) => {
        resolve(resp.data.data)
      })
        .catch((error) => {
          reject(error)
        })
    })
  },
  updateShipments ({ commit }, { params, id }) {
    return new Promise((resolve, reject) => {
      this.$axios.put('shipments/admin/id/' + id, params).then((resp) => {
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
