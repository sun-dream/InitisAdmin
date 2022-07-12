const state = () => {
  return {
    fileObject: {}
  }
}

const getters = {
  fileObject: state => state.fileObject
}
const mutations = {
  UPDATA_FILES_OBJECT (state, val) {
    state.fileObject = val
  }
}
const actions = {
  uploadFiles ({ state, commit, dispatch }, { params, progressHandler = (progressEvent) => {} }) {
    return new Promise((resolve, reject) => {
      dispatch('logic/fetching/beforeUpdateFatching', true, { root: true }).then((_) => {
        dispatch('api/upload/uploadFiles', { params, progressHandler }, { root: true })
          .then((data) => {
            dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
            resolve(data)
          }).catch((error) => {
            dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
            reject(error)
          })
      })
    })
  },
  getFiles ({ state, commit, dispatch }, { id }) {
    return new Promise((resolve, reject) => {
      dispatch('api/upload/getFile', id, { root: true })
        .then((data) => {
          if (data) {
            commit('UPDATA_FILES_OBJECT', data)
          }
          resolve(data)
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
