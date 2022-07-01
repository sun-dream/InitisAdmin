import paginationMixins from '@/vuexUtils/paginationMixins'
// import favoriteList from "@/components/User/favorites/favoriteList";
const state = () => {
  return {
    favoriteList: [],
    favoriteStatus: null
  }
}

const getters = {
  favoriteList: state => state.favoriteList,
  favoriteStatus: state => state.favoriteStatus
}
const mutations = {
  UPDATA_FAVORITE_STATUS(state, val) {
    state.favoriteStatus = val
  },
  UPDATA_FAVORITE_DATA(state, val) {
    state.favoriteList = val
  },
}
const actions = {
  updateFavoriteStatus({ state, commit, dispatch }, { newStatus, productId }) {
    // return new Promise((resolve) => {
    //   dispatch('api/favorite/updateFavoriteStatus', { newStatus, productId }, { root: true }).then((resp) => {
    //     commit('UPDATA_FAVORITE_STATUS', resp)
    //     resolve(resp)
    //   })
    // })
  },
  loadFavoriteList({ state, commit, dispatch }, params) {
    return new Promise((resolve => {
      // dispatch('beforeGetAllHandler', params).then((data) => {
      //   dispatch('api/favorite/loadFavoriteList', data, { root: true }).then((data) => {
      //     dispatch('afterGetAllHandler', data)
      //     if (data && Array.isArray(data.items)) {
      //       commit('UPDATA_FAVORITE_DATA', data.items)
      //     }
          resolve(params)
      //   })
      // }).catch((err) => {
      //   dispatch('afterGetAllHandler', data)
      //   reject(err)
      // })
    }))
  }

}

export default {
  state: paginationMixins.stateMixins(state),
  mutations: Object.assign(mutations, paginationMixins.mutationsMixins),
  actions: Object.assign(actions, paginationMixins.actionsMixins),
  getters: Object.assign(getters, paginationMixins.gettersMixins)
}
