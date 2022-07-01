const state = () => {
    return {
    }
  }
  
  const getters = {
  }
  const mutations = {
  }
  const actions = {
    user ({ commit },params) {
      return new Promise((resolve) => {
        this.$axios.post('user',params).then((resp) => {
          resolve(resp.data.data)
        })
      })
    },
    createdUser ({ commit },params) {
        return new Promise((resolve) => {
            this.$axios.post('user/create',params).then((resp) => {
                resolve(resp.data.data)
            })
        })
    },
    updateUser ({ commit },params) {
        return new Promise((resolve) => {
            this.$axios.put('user',params).then((resp) => {
                resolve(resp.data.data)
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
  