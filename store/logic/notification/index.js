const state = () => {
    return {
        alerts: {}
    }
}

const getters = {
    alerts: state => state.alerts
}
const mutations = {
    SET_ALERTS(state, val) {
        let time = new Date().getTime()
        let cloneData = JSON.parse(JSON.stringify(state.alerts))
        cloneData[time] = val
        state.alerts = cloneData
    },
    REMOVE_ALERTS(state, val) {
        let cloneData = JSON.parse(JSON.stringify(state.alerts))
        if (val && val > 0) {
           delete cloneData[val] 
        }else{
            delete cloneData[Object.keys(state.alerts)[0]]  //如果没有传值，默认删除第一个
        }
        state.alerts = cloneData

    },
    CLEAR_ALERTS(state, val) {
        state.alerts = {}
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
