const state = () => {
    return {
    }
  }
  
  const getters = {
  }
  const mutations = {
  }
  const actions = {
    getPaymentList({ commit }, params) {
      return new Promise((resolve, reject) => {
        this.$axios.post('payment',params).then((resp) => {
          resolve(resp.data.data)
        })
        .catch(error=>{
          reject(error)
        })
      })
    },
    paymentPayOrder({ commit }, params) {
        return new Promise((resolve, reject) => {
          this.$axios.post('payment/pay_order',params).then((resp) => {
            resolve(resp.data.data)
          })
          .catch(error=>{
            reject(error)
          })
        })
    },
    paymentOrders({ commit }, params) {
        return new Promise((resolve, reject) => {
          this.$axios.post('payment/orders',params).then((resp) => {
            resolve(resp.data.data)
          })
          .catch(error=>{
            reject(error)
          })
        })
    },
  }
  
  export default {
    state,
    mutations,
    actions,
    getters
  }
  