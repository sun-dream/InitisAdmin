const state = () => {
  return {
  }
}

const getters = {
}
const mutations = {
}
const actions = {
  getOrderList ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.get('orders/admin/all', { params }).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  getOrderPagination ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.get('orders/admin/all/pagination', { params }).then((resp) => {
        resolve(resp.data)
      })
    })
  }
  // createOrder ({ commit }, params = {}) {
  //   return new Promise((resolve, reject) => {
  //     this.$axios.post('order/create', params).then((resp) => {
  //       resolve(resp.data.data)
  //     })
  //       .catch((error) => {
  //         reject(error)
  //       })
  //   })
  // },
  // userOrderCancel ({ commit }, params = {}) {
  //   return new Promise((resolve) => {
  //     this.$axios.put('order/cancel', params).then((resp) => {
  //       resolve(resp.data.data)
  //     })
  //   })
  // },
  // userOrderDelete ({ commit }, params = {}) {
  //   return new Promise((resolve) => {
  //     this.$axios.delete('order/delete', { data: params }).then((resp) => {
  //       resolve(resp.data.data)
  //     })
  //   })
  // },
  // userOrderPay ({ commit }, params = {}) {
  //   return new Promise((resolve) => {
  //     this.$axios.post('payment/pay', params).then((resp) => {
  //       resolve(resp.data.data)
  //     })
  //   })
  // },
  // adminOrderShipment ({ commit }, params = {}) {
  //   return new Promise((resolve) => {
  //     this.$axios.post('order/shipment', params).then((resp) => {
  //       resolve(resp.data.data)
  //     })
  //   })
  // }
}

export default {
  state,
  mutations,
  actions,
  getters
}
