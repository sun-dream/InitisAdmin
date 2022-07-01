import paginationMixins from '@/vuexUtils/paginationMixins'
const state = () => {
  return {
    
  }
}
const getters = {
}

const mutations = {
 
}

const actions = {

}

export default {
  state: paginationMixins.stateMixins(state),
  mutations: Object.assign(mutations, paginationMixins.mutationsMixins),
  actions: Object.assign(actions, paginationMixins.actionsMixins),
  getters: Object.assign(getters, paginationMixins.gettersMixins)
}
