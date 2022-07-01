import paginationMixins from '@/vuexUtils/paginationMixins'
const state = () => {
    return {
      allUserData: [],
    }
  }
  
  const getters = {
    allUserData: state => state.allUserData
    
  }
  const mutations = {
    UPDATA_All_USER_Data (state, val) {
      state.allUserData = val
    }
  }
  const actions = {
    fetchAllUserData ({ state, commit, dispatch },params = {}) {
      return new Promise((resolve) => {

        dispatch('beforeGetAllHandler', params).then((data) => {
          dispatch('api/admin/user/user', data, { root: true })
              .then((data) => {
                  dispatch('afterGetAllHandler', data)
                  if (data && Array.isArray(data.items)) {
                      commit('UPDATA_All_USER_Data', data.items)
                  }
                  resolve(data)
                })
        }).catch((err) => {
            reject(err)
        })
      })
    },
    createUser({ state, commit, dispatch },params = {}) {
        return new Promise((resolve) => {
            dispatch('api/admin/user/createdUser', params, { root: true }).then((resp) => {
                dispatch('fetchAllUserData')
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
  