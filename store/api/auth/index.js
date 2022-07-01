const state = () => {
  return {
  }
}

const getters = {
}
const mutations = {
}
const actions = {
  login ({ commit }, { username, password }) {
    return new Promise((resolve,reject) => {
      this.$axios.post('users/login', {
        username, password
      }).then((resp) => {
        resolve(resp.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  passwordRecovery ({ commit }, data) {
    return new Promise((resolve) => {
      this.$axios.post('users/forgot_password', data).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  email ({ commit }, { email,type = 'REGISTER' }) {
    return new Promise((resolve) => {
      this.$axios.post('users/send_email', {
        email, type
      }).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  register ({ commit }, data) {
    return new Promise((resolve) => {
      this.$axios.post('register', data).then((resp) => {
        resolve(resp.data)
      })
    })
  },
 
  logout ({ commit }) {
    return this.$axios.post('logout', {
    })
  },


  getClientsOptions ({ commit }, { phone, password = null, confirmedResultCode = null }) {
    return new Promise((resolve, reject) => {
      this.$axios.post('get_clients_options', {
        phone, password, confirmedResultCode
      }).then((resp) => {
        resolve(resp.data.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
 
  createClient ({ commit }, { name }) {
    return new Promise((resolve) => {
      this.$axios.post('create_client', {
        name
      }).then((resp) => {
        resolve(resp.data.data)
      })
    })
  },
  createClientByPhoneAndPassword ({ commit }, { name, phone, password }) {
    return new Promise((resolve) => {
      this.$axios.post('create_client_by_phone_and_password', {
        name, phone, password
      }).then((resp) => {
        resolve(resp.data.data)
      })
    })
  },
  loginByCode ({ commit }, { phone, confirmedResultCode, clientId }) {
    return new Promise((resolve) => {
      this.$axios.post('login_by_code', {
        phone, confirmedResultCode, clientId
      }).then((resp) => {
        resolve(resp.data)
      })
    })
  },
  resetPassword ({ commit }, data) {
    return this.$axios.post('reset_password', data)
  },
  updateUserInfo ({ commit }, userData) {
    return new Promise((resolve) => {
      this.$axios.post('user_info_update', userData).then((resp) => {
        resolve(resp.data.data)
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
