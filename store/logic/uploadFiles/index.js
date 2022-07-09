const state = () => {
  return {
  }
}

const getters = {
}
const mutations = {
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
