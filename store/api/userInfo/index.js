const state = () => {
  return {
  }
}

const getters = {
}
const mutations = {
}
const actions = {
  fetchUserInfo ({ commit, dispatch }) {
    return new Promise((resolve) => {
      this.$axios.post('user_info', {
      }).then((resp) => {
        resolve(resp)
      }).catch((_) => {
        resolve(null)
      })
    })
  },
  getAllUsers ({ commit, dispatch }, data) {
    return new Promise((resolve) => {
      this.$axios.post('admin/get_all_users', data).then((resp) => {
        resolve(resp.data.data)
      }).catch((_) => {
        resolve(null)
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
