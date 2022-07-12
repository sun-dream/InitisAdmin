const state = () => {
  return {
  }
}

const getters = {
}
const mutations = {
}
const actions = {
  getUser ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.get('users/admin/all', { params }).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  getUserPagination ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.get('users/admin/all/pagination', { params }).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  updateUser ({ commit }, { params, id }) {
    return new Promise((resolve) => {
      this.$axios.put('users/admin/id/' + id, params).then((resp) => {
        resolve(resp.data)
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
