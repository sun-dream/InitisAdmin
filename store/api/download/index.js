const state = () => {
    return {
    }
  }
  
  const getters = {
  }
  const mutations = {
  }
  const actions = {
    uploadProducts({ commit }) {
      return new Promise((resolve,reject) => {
        this.$axios.get('download/product').then((resp) => {
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
  