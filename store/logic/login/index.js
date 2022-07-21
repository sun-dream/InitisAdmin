const state = () => {
  return {
    loginStatusLocalKey: 'login_status',
    userDataLocalKey: 'user_data',
    user: {},
    isLoggedIn: false
  }
}

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  nickname: (state) => {
    return state.user.nickname
  },
  uid: (state) => {
    return state.user.uid
  },
  user: (state) => {
    return state.user
  },
  clientId: (state) => {
    return state.user.clientId
  },
  myPhone: (state) => {
    return state.user.phone
  },
  myPhoneDisplay: (state) => {
    if (state.user !== null && state.user.phone !== null) {
      return state.user.phone.slice(0, 3) + '***' + state.user.phone.slice(state.user.phone.length - 3, state.user.phone.length)
    }
    return ''
  },
  membership: (state) => {
    if (state.user) {
      return state.user.membership
    }
  }
}
const mutations = {
  CLEAR_USER_DATA (state) {
    state.user = {}
    state.isLoggedIn = false
  },
  SAVE_USER_DATA (state, val) {
    state.user = val
    if (val) {
      state.isLoggedIn = true
    }
  }
}
const actions = {
  fetchUserData ({ state, commit, dispatch }) {
    return new Promise((resolve) => {
      dispatch('api/userInfo/fetchUserInfo', {}, { root: true }).then((resp) => {
        if (resp !== null) {
          console.log('fetchUserInfo response: ', resp.data.data)
          if (resp.data.status && resp.data.data !== null && resp.data.data !== undefined) {
            commit('SAVE_USER_DATA', resp.data.data)
            resolve(resp.data.data)
          } else {
            commit('CLEAR_USER_DATA')
            resolve(null)
          }
        } else {
          commit('CLEAR_USER_DATA')
          resolve(null)
        }
      }).catch((_) => {
        // console.log('fetchUserData error')
        commit('CLEAR_USER_DATA')
        resolve(null)
      })
    })
  },
  logout ({ commit, dispatch }) {
    commit('CLEAR_USER_DATA')
    return dispatch('api/auth/logout', '', { root: true })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
