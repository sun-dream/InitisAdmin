const defaultOption = {
    width:12,
    size:140,
    color:'primary',
    opacity:0.4,
    loadingText:'Loading...',
}
const state = () => {
    return {
        fetching: false,
        fetchingOption:{}
    }
}

const getters = {
    fetching: state => state.fetching,
    fetchingOption: state =>{
        if(Object.keys(state.fetchingOption).length === 0){
            return defaultOption
        }else{
            return state.fetchingOption
        }
    },
}
const mutations = {
    UPDATE_FETCHING(state, val) {
        state.fetching = val
        if(!val){
            state.fetchingOption = JSON.parse(JSON.stringify(defaultOption))
        }
    },
    CLOSE_FETCHING(state) {
        state.fetching = false
    },
    UPDATE_FETCHING_OPTION(state, {width,size,color,opacity,loadingText}) {
        if(width){
            state.fetchingOption.width = width
        }else{
            state.fetchingOption.width = defaultOption.width
        }
        if(size){
            state.fetchingOption.size = size
        }else{
            state.fetchingOption.size = defaultOption.size
        }
        if(color){
            state.fetchingOption.color = color
        }else {
            state.fetchingOption.color = defaultOption.color
        }
        if(opacity){
            state.fetchingOption.opacity = opacity
        }else {
            state.fetchingOption.opacity = defaultOption.opacity
        }
        if(loadingText){
            state.fetchingOption.loadingText = loadingText
        }else {
            state.fetchingOption.loadingText = defaultOption.loadingText
        }
    },
}
const actions = {
    beforeUpdateFatching ({ dispatch, commit, state, getters }, data) {
        return new Promise((resolve, reject) => {
            commit('UPDATE_FETCHING', true)
            resolve(data)
        })
    },
    afterUpdateFatching ({ dispatch, commit, state, getters }) {
        return new Promise((resolve, reject) => {
            commit('UPDATE_FETCHING', false)
        })
    },
    updateFatchingOption({ dispatch, commit, state, getters },data) {
        return new Promise((resolve, reject) => {
            commit('UPDATE_FETCHING_OPTION', data)
            commit('UPDATE_FETCHING', true)
        })
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}
