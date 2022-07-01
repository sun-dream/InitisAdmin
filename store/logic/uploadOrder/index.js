const state = () => {
    return {
        uploadOrdersData: [],
        matchedItemOrders:[],
        unmatchedItemOrders:[]
    }
}

const getters = {
    uploadOrdersData: state => state.uploadOrdersData,
    matchedItemOrders: state => state.matchedItemOrders,
    unmatchedItemOrders: state => state.unmatchedItemOrders
}
const mutations = {
    UPDATA_ORDERS_DATA(state, val){
        state.uploadOrdersData = val
    },
    UPDATA_ORDERS_DATA_ITEM(state, {key,value,index}){
        state.uploadOrdersData[index][key] = value
       
    },
    UPDATA_MATCHED_ITEM_ORDERS(state, val){
        let data = []
        if(Object.prototype.toString.call(val)==='[object Object]' && Object.keys(val).length > 0){
            for(let i in val){
                 data.push({
                     productNumber:i,
                     product:val[i].product,
                     skus:val[i].skus
                 })
            }
        }else if(Object.prototype.toString.call(val)==='[object Array]' && val.length > 0){
            data = val
        }
        state.matchedItemOrders = data
       
    },
    UPDATA_MATCHED_ITEM_ORDERS_ITEM(state, {key,value,index}){
        state.matchedItemOrders[index][key] = value
    },
    UPDATA_UNMATCHED_ITEM_ORDERS(state, val){
        let data = []
        if(Object.prototype.toString.call(val)==='[object Object]' && Object.keys(val).length > 0){
            for(let i in val){
                 data.push({
                     sku:i,
                     total:val[i],
                     editSku:null
                 })
            }
        }else if(Object.prototype.toString.call(val)==='[object Array]' && val.length > 0){
            data = val
        }
        state.unmatchedItemOrders = data
       
    },
    UPDATA_UNMATCHED_ITEM_ORDERS_ITEM(state, {key,value,index}){
        state.unmatchedItemOrders[index][key] = value
    },
}
const actions = {
    uploadOrder({ state, commit, dispatch }, params = {}) {
        return new Promise((resolve,reject) => {
            dispatch('logic/fetching/beforeUpdateFatching', true, { root: true }).then((_) => {
                dispatch('api/upload/uploadOrder', params, { root: true })
                    .then((data) => {
                        dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
                        if (data && Array.isArray(data.orders)) {
                            commit('UPDATA_ORDERS_DATA', data.orders)
                        }
                        if(Object.prototype.toString.call(data.matched_item_orders)==='[object Object]' && Object.keys(data.matched_item_orders).length > 0){
                            commit('UPDATA_MATCHED_ITEM_ORDERS', data.matched_item_orders)
                        }
                        if(Object.prototype.toString.call(data.unmatched_item_orders)==='[object Object]' && Object.keys(data.unmatched_item_orders).length > 0){
                            commit('UPDATA_UNMATCHED_ITEM_ORDERS', data.unmatched_item_orders)
                        }
                        resolve(data)
                    }).catch(error=>{
                        dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
                        reject(error)
                    })
                    
            })
            
        })
    },
    uploadTemplate({ state, commit, dispatch }, params = {}) {
        return new Promise((resolve,reject) => {
            dispatch('logic/fetching/beforeUpdateFatching', true, { root: true }).then((_) => {
                dispatch('api/upload/uploadTemplate', params, { root: true })
                    .then((data) => {
                        dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
                        resolve(data)
                    }).catch(error=>{
                        dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
                        reject(error)
                    })
                    
            })
            
        })
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
