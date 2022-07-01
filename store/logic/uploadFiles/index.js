const state = () => {
    return {
    }
}

const getters = {
}
const mutations = {
}
const actions = {
    uploadFiles({ state, commit, dispatch }, params) {
        return new Promise((resolve, reject) => {
          dispatch('logic/fetching/beforeUpdateFatching', true, { root: true }).then((_) => {
            dispatch('api/upload/uploadFiles', params, { root: true })
              .then((data) => {
                dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
                resolve(data)
              }).catch(error => {
                dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
                reject(error)
              })
    
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
