const state = () => {
  return {
  }
}

const getters = {
}
const mutations = {
}
const actions = {
  getPresetLibrarieList ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.get('preset_libraries/public/all', { params }).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  getPresetLibrariePagination ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.get('preset_libraries/public/all/pagination', { params }).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  getPresetLibrarieItem ({ commit }, id) {
    return new Promise((resolve) => {
      this.$axios.get('preset_libraries/public/id/' + id).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  createPresetLibrarie ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.post('preset_libraries/admin', params).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  createPresetLibraries ({ commit }, params) {
    return new Promise((resolve) => {
      this.$axios.post('preset_libraries/admin/multiple', params).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  updatePresetLibrarie ({ commit }, { id, params }) {
    return new Promise((resolve) => {
      this.$axios.put('preset_libraries/admin/id/' + id, params).then((resp) => {
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
