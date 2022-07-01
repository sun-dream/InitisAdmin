const state = () => {
  return {
    homeCpn:{ text: "Initi", disabled: false, nuxt:true,exact:true,to: { name: "index" } },
    breads: []
  }
}

const getters = {
    breads: state => {
        let arr = JSON.parse(JSON.stringify(state.breads))
        arr.unshift(state.homeCpn)
        return arr
    }
}
const mutations = {
  UPDATA_BREADS(state, val) {
    state.breads = val
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
