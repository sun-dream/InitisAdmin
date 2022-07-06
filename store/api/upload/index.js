const state = () => {
  return {
  }
}

const getters = {
}
const mutations = {
}
const actions = {
  uploadFiles ({ commit }, { params, progressHandler = (progressEvent) => {} }) {
    const forms = new FormData()
    const configs = {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        progressHandler(progressEvent)
      }
    }
    if (Array.isArray(params) && params.length > 0) {
      for (let i = 0; i < params.length; i++) {
        forms.append('file', params[i])
      }
    } else {
      forms.append('file', params)
    }
    return new Promise((resolve, reject) => {
      this.$axios.post('files/user', forms, configs).then((resp) => {
        resolve(resp.data)
      }).catch((error) => {
        reject(error)
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
