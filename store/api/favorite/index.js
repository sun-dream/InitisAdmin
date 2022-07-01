const state = () => {
    return {
    }
  }

  const getters = {
  }
  const mutations = {
  }
  const actions = {
    updateFavoriteStatus ({ commit },{newStatus,productId}) {
      return new Promise((resolve) => {
        this.$axios.put('favorite/'+productId, {status:newStatus}).then((resp)=>{
          resolve(resp.data.data.status)
        })
      })
    },
    loadFavoriteList({ commit },{page,size}){
      return new Promise((resolve => {
        this.$axios.get(`favorite?page=${page}&size=${size}`).then((resp)=>{
          resolve(resp.data.data)
        })
      }))
    }
  }

  export default {
    state,
    mutations,
    actions,
    getters
  }
