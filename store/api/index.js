const state = () => {
  return {
  }
}

const getters = {
}
const mutations = {
}
const actions = {
  getData ({ commit, dispatch }, {
    data,
    path,
    resultKey
  }) {
    return new Promise((resolve) => {
      this.$axios.post(path, data).then((resp) => {
        resolve(resp.data[resultKey])
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
