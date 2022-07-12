const stateMixins = (oldState) => {
  const resultsFromOldState = oldState()
  return () => {
    return Object.assign(resultsFromOldState,
      {
        filter: {},
        fetching: false,
        limit: 12,
        skip: 0,
        pageSizes: [3, 12, 30, 50, 100],
        sort: [],
        data: [],
        total: 0,
        pageCount: 0,
        page: 0
      }
    )
  }
}
const gettersMixins = {
  filter: state => state.filter,
  fetching: state => state.fetching,
  limit: (state) => {
    return state.limit
  },
  sort: state => state.sort,
  isEmpty: state => state.all.length === 0,
  skip: state => state.skip,
  pageSizes: state => state.pageSizes,
  data: state => state.data,
  total: state => state.total,
  pageCount: state => state.pageCount,
  page: state => state.page
}
const mutationsMixins = {
  UPDATE_FILTER (state, val) {
    state.filter = val
  },
  UPDATE_FETCHING (state, val) {
    state.fetching = val
  },
  UPDATE_SKIP (state, val) {
    state.skip = val
  },
  UPDATE_LIMIT (state, val) {
    state.limit = val
  },
  UPDATE_DATA (state, val) {
    state.data = val
  },
  UPDATE_TOTAL (state, val) {
    state.total = val
  },
  UPDATE_PAGE_COUNT (state, val) {
    state.pageCount = val
  },
  UPDATE_PAGE (state, val) {
    state.page = val
  }
}
const actionsMixins = {
  initPagination ({ commit, dispatch, state }) {
    commit('UPDATE_LIMIT', state.limit)
  },
  beforeGetDataHandelr ({ commit, dispatch, state }, data) {
    return new Promise((resolve, reject) => {
      commit('UPDATE_FETCHING', true)
      dispatch('logic/fetching/beforeUpdateFatching', {}, { root: true })
      data.limit = !data.limit ? state.limit : data.limit
      data.skip = !data.skip ? state.skip : data.skip
      const cloneFilterData = JSON.parse(JSON.stringify(data))
      delete cloneFilterData.limit
      delete cloneFilterData.skip
      // 如果有缓存filter,那么合并filter，
      if (Object.keys(state.filter).length > 0 && Object.keys(cloneFilterData).length > 0) {
        Object.assign(cloneFilterData, state.filter)
      } else if (Object.keys(state.filter).length === 0) {
        commit('UPDATE_FILTER', cloneFilterData)
      }
      Object.keys(state.filter).forEach((item) => {
        if (data[item] === undefined) {
          data[item] = state.filter[item]
        }
      })
      resolve(data)
    })
  },
  afterGetDataHandler ({ commit, dispatch, state }, data) {
    if (!Array.isArray(data)) {
      commit('UPDATE_DATA', [])
    } else {
      commit('UPDATE_DATA', data)
    }
    commit('UPDATE_FETCHING', false)
    dispatch('logic/fetching/afterUpdateFatching', {}, { root: true })
  },
  beforeGetPaginationHandler ({ commit, dispatch, state }, data) {
    return new Promise((resolve, reject) => {
      data.limit = state.limit
      resolve(data)
    })
  },
  afterGetPaginationHandler ({ commit, dispatch, state }, data) {
    if (data && data.total && data.pages) {
      commit('UPDATE_TOTAL', data.total)
      commit('UPDATE_PAGE_COUNT', data.pages)
      commit('UPDATE_PAGE', (state.skip / state.limit + 1))
    } else {
      commit('UPDATE_TOTAL', data.total)
      commit('UPDATE_PAGE_COUNT', 1)
      commit('UPDATE_PAGE', (state.skip / state.limit + 1))
    }
  },
  updatePage ({ commit, state }, data) {
    commit('UPDATE_PAGE', data)
    commit('UPDATE_SKIP', ((data - 1) * state.limit))
  },
  getAllHandler ({ dispatch }, { apiStorePath, data = {} }) {
    return new Promise((resolve) => {
      dispatch('beforeGetAllHandler', data).then((data) => {
        dispatch(apiStorePath, data, { root: true }).then((resp) => {
          resolve(resp)
          dispatch('afterGetAllHandler', resp)
        })
      })
    })
  },
  updateLimit ({ state, commit, dispatch }, limit) {
    if (limit !== state.limit) {
      commit('UPDATE_LIMIT', limit)
    }
  }
}

export default { stateMixins, actionsMixins, mutationsMixins, gettersMixins }
