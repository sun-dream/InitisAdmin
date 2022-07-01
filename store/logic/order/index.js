import paginationMixins from '@/vuexUtils/paginationMixins'

const state = () => {
    return {
        orderList: [],
    }
}

const getters = {
    orderList: state => state.orderList,

}
const mutations = {
    UPDATA_ORDER_LIST_DATA(state, val) {
        state.orderList = val
    }
}
const actions = {
    getOrderList({ state, commit, dispatch }, params = {}) {
        return new Promise((resolve) => {
            dispatch('beforeGetAllHandler', params).then((data) => {
                dispatch('api/orders/getOrderList', data, { root: true })
                    .then((data) => {
                        dispatch('afterGetAllHandler', data)
                        if (data && Array.isArray(data.items)) {
                            commit('UPDATA_ORDER_LIST_DATA', data.items)
                        }
                        resolve(data)
                    })
            }).catch((err) => {
                reject(err)
            })
            
        })
    },
    createOrder({ state, commit, dispatch }, params ) {
        return new Promise((resolve) => {
            dispatch('logic/fetching/beforeUpdateFatching', params, { root: true }).then((resp) => {
                dispatch('api/orders/createOrder', params, { root: true }).then((resp) => {
                    resolve(resp)
                    dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
                })
                .catch(error => {
                    dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
                    reject(error)
                })
            })
        })
    },
    userOrderCancel({ state, commit, dispatch }, params ) {
        return new Promise((resolve) => {
            dispatch('api/orders/userOrderCancel', params, { root: true }).then((resp) => {
                dispatch('getOrderList')
                resolve(resp)
            })
        })
    },
    userOrderDelete({ state, commit, dispatch }, params ) {
        return new Promise((resolve) => {
            dispatch('api/orders/userOrderDelete', params, { root: true }).then((resp) => {
                resolve(resp)
                dispatch('getOrderList')
            })
        })
    },
    userOrderPay({ state, commit, dispatch }, {data,factingOptin} ) {
        return new Promise((resolve) => {
            dispatch('logic/fetching/updateFatchingOption', factingOptin, { root: true })
            dispatch('logic/fetching/beforeUpdateFatching', data, { root: true }).then((resp) => {
                dispatch('api/orders/userOrderPay', data, { root: true }).then((resp) => {
                    resolve(resp)
                    // dispatch('logic/fetching/afterUpdateFatching', data, { root: true })
                })
            })
           
        })
    },
    adminOrderShipment({ state, commit, dispatch }, params ) {
        return new Promise((resolve) => {
            dispatch('logic/fetching/beforeUpdateFatching', params, { root: true }).then((_) => {
                dispatch('api/orders/adminOrderShipment', params, { root: true }).then((resp) => {
                    resolve(resp)
                    dispatch('getOrderList')
                    dispatch('logic/fetching/afterUpdateFatching', resp, { root: true })
                })
            })
           
        })
    },
    orderImportSource({ state, commit, dispatch }, {source,params} ) {
        return new Promise((resolve,reject) => {
            dispatch('logic/fetching/beforeUpdateFatching', params, { root: true }).then((_) => {
                dispatch('api/orders/orderImportSource', {source,params}, { root: true })
                .then((resp) => {
                    resolve(resp)
                    dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
                })
                .catch(error=>{
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
