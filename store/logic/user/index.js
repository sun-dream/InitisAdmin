import paginationMixins from '@/vuexUtils/paginationMixins'
const state = () => {
  return {
    usersQuery: '',
    usersList: []
  }
}

const getters = {
  usersQuery: state => state.usersQuery,
  usersList: state => state.usersList
}
const mutations = {
  UPDATA_USERS_QUERY (state, val) {
    state.usersQuery = val
  },
  UPDATA_USERS_LIST (state, val) {
    state.usersList = val
  }
}
const actions = {
  getUserData ({ state, commit, dispatch }, params = {}) {
    return new Promise((resolve, reject) => {
      dispatch('beforeGetDataHandelr', params).then((data) => {
        dispatch('api/user/getUser', data, { root: true })
          .then((resp) => {
            dispatch('afterGetDataHandler', resp)
            if (resp && Array.isArray(resp)) {
              commit('UPDATA_USERS_LIST', resp)
            }
            resolve(data)
          })
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getUserDataPagination ({ state, commit, dispatch }, params = {}) {
    return new Promise((resolve, reject) => {
      dispatch('beforeGetPaginationHandler', params).then((_) => {
        dispatch('api/user/getUserPagination', params, { root: true })
          .then((resp) => {
            dispatch('afterGetPaginationHandler', resp)
            resolve(resp)
          })
      }).catch((err) => {
        dispatch('afterGetPaginationHandler', false)
        reject(err)
      })
    })
  },
  updateUser ({ state, commit, dispatch }, { params = {}, id }) {
    return new Promise((resolve) => {
      dispatch('api/user/updateUser', { params, id }, { root: true }).then((resp) => {
        resolve(resp)
      })
    })
  }
}

export default {
  state: paginationMixins.stateMixins(state),
  mutations: Object.assign(mutations, paginationMixins.mutationsMixins),
  actions: Object.assign(actions, paginationMixins.actionsMixins),
  getters: Object.assign(getters, paginationMixins.gettersMixins)
}
