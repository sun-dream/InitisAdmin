const state = () => {
  return {
    homeCpn: { text: 'Initi', cpnName: 'index' },
    breads: []
  }
}

const getters = {
  breads: (state) => {
    const arr = JSON.parse(JSON.stringify(state.breads))
    arr.unshift(state.homeCpn)
    return arr
  }
}
const mutations = {
  UPDATA_BREADS (state, val) {
    const arr = []
    if (Array.isArray(val)) {
      arr.push(...val)
    } else if (val.cpnName && val.text) {
      arr.push(val)
    }
    state.breads = JSON.parse(JSON.stringify(arr))
  }
}
const actions = {
}

export default {
  state,
  mutations,
  actions,
  getters
}
