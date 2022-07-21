import paginationMixins from '@/vuexUtils/paginationMixins'
const state = () => {
  return {
    presetLibrarieList: [],
    presetLibrarieQuery: 'MERCHANT_BG_COVER',
    presetLibrarieItem: {}
  }
}
const getters = {
  presetLibrarieList: state => state.presetLibrarieList,
  presetLibrarieQuery: state => state.presetLibrarieQuery,
  presetLibrarieItem: state => state.presetLibrarieItem
}
const mutations = {
  UPDATE_PRESET_LIBRARIE_LIST (state, val) {
    state.presetLibrarieList = val
  },
  UPDATE_PRESET_LIBRARIE_QUERY (state, val) {
    state.presetLibrarieQuery = val
  },
  UPDATE_PRESET_LIBRARIE_ITEM (state, val) {
    state.presetLibrarieItem = val
  }
}
const actions = {
  getPresetLibrarieList ({ state, commit, dispatch }, params = {}) {
    return new Promise((resolve) => {
      dispatch('beforeGetDataHandelr', params).then((data) => {
        dispatch('api/presetLibraries/getPresetLibrarieList', data, { root: true })
          .then((resp) => {
            dispatch('afterGetDataHandler', resp)
            if (resp && Array.isArray(resp)) {
              commit('UPDATE_PRESET_LIBRARIE_LIST', resp)
            }
            resolve(resp)
          })
      })
    })
  },
  getPresetLibrariePagination ({ state, commit, dispatch }, params = { query: '' }) {
    return new Promise((resolve, reject) => {
      dispatch('beforeGetPaginationHandler', params).then((data) => {
        dispatch('api/presetLibraries/getPresetLibrariePagination', params, { root: true })
          .then((resp) => {
            dispatch('afterGetPaginationHandler', resp)
            resolve(resp)
          }).catch((err) => {
            dispatch('afterGetPaginationHandler', false)
            reject(err)
          })
      })
    })
  },
  getPresetLibrarieItem ({ state, commit, dispatch }, id = null) {
    return new Promise((resolve) => {
      dispatch('logic/fetching/beforeUpdateFatching', {}, { root: true }).then((_) => {
        dispatch('api/presetLibraries/getPresetLibrarieItem', id, { root: true }).then((resp) => {
          commit('UPDATE_PRESET_LIBRARIE_ITEM', resp)
          resolve(resp)
          dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
        })
      })
    })
  },
  updatePresetLibrarie ({ state, commit, dispatch }, { params, id }) {
    return new Promise((resolve, reject) => {
      dispatch('logic/fetching/beforeUpdateFatching', params, { root: true }).then((_) => {
        dispatch('api/presetLibraries/updatePresetLibrarie', { params, id }, { root: true })
          .then((resp) => {
            dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
            resolve(resp)
          }).catch((error) => {
            dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
            reject(error)
          })
      })
    })
  },
  createPresetLibrarie ({ state, commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      dispatch('logic/fetching/beforeUpdateFatching', params, { root: true }).then((_) => {
        dispatch('api/presetLibraries/createPresetLibrarie', params, { root: true })
          .then((resp) => {
            dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
            resolve(resp)
          }).catch((error) => {
            dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
            reject(error)
          })
      })
    })
  },
  createPresetLibraries ({ state, commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      dispatch('logic/fetching/beforeUpdateFatching', params, { root: true }).then((_) => {
        dispatch('api/presetLibraries/createPresetLibraries', params, { root: true })
          .then((resp) => {
            dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
            resolve(resp)
          }).catch((error) => {
            dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
            reject(error)
          })
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
