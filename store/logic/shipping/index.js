import paginationMixins from '@/vuexUtils/paginationMixins'

const state = () => {
    return {
        shippingList: []
    }
}
const getters = {
    shippingList: state => state.shippingList
}
const mutations = {
    UPDATE_SHIPPING_LIST(state, val) {
        state.shippingList = val
    }
}
const actions = {
    getShippingList({ state, commit, dispatch }, params = {}) {
        new Promise((resolve) => {
            dispatch('logic/fetching/beforeUpdateFatching', params, { root: true }).then((_) => {
                dispatch('api/shipping/getShippingList', params, { root: true })
                    .then((data) => {
                        dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
                        if (data && Array.isArray(data)) {
                            commit('UPDATE_SHIPPING_LIST', data)
                        }
                        resolve(data)
                    }).catch((err) => {
                        dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
                        reject(err)
                    })
            })
        })
    },
    createShipping({ state, commit, dispatch }, params) {
        return new Promise((resolve, reject) => {
            dispatch('logic/fetching/beforeUpdateFatching', params, { root: true }).then((_) => {
                dispatch('api/shipping/createShipping', params, { root: true })
                    .then((data) => {
                        dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
                        resolve(data)
                    }).catch(error => {
                        dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
                        reject(error)
                    })

            })
        })
    },
    updateShipping({ state, commit, dispatch }, { data, shippingId }) {
        return new Promise((resolve) => {
            dispatch('logic/fetching/beforeUpdateFatching', data, { root: true }).then((_) => {
                dispatch('api/shipping/updateShipping', { data, shippingId }, { root: true })
                    .then((data) => {
                        dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
                        resolve(data)
                    }).catch(error => {
                        dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
                        reject(error)
                    })

            })
        })
    },
    deleteShipping({ state, commit, dispatch }, { newShippingId, shippingId }) {
        return new Promise((resolve) => {
            dispatch('logic/fetching/beforeUpdateFatching', shippingId, { root: true }).then((_) => {
                dispatch('api/shipping/deleteShipping', { newShippingId, shippingId }, { root: true })
                    .then((data) => {
                        dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
                        resolve(data)
                    }).catch(error => {
                        dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
                        reject(error)
                    })

            })
        })
    },
    //   getProductBlockList({ state, commit, dispatch }, params = {}) {
    //     return new Promise((resolve, reject) => {
    //       dispatch('beforeGetAllHandler', params).then((data) => {
    //         dispatch('api/product/getProductList', data, { root: true })
    //           .then((data) => {
    //             dispatch('afterGetAllHandler', data)
    //             if (data && Array.isArray(data.items)) {
    //               commit('UPDATE_PRODUCT_BLOCK_LIST', data.items)
    //             }
    //             resolve(data)
    //           })
    //           .catch((err) => {
    //             dispatch('afterGetAllHandler', false)
    //             reject(err)
    //           })
    //       })
    //     })
    //   },
    //   getProductList({ state, commit, dispatch }, params = {}) {
    //     return new Promise((resolve, reject) => {
    //       dispatch('beforeGetAllHandler', params).then((data) => {
    //         dispatch('api/product/getProductList', data, { root: true })
    //           .then((data) => {
    //             dispatch('afterGetAllHandler', data)
    //             if (data && Array.isArray(data.items)) {
    //               commit('UPDATE_PRODUCT_LIST_DATA', data.items)
    //             }
    //             resolve(data)
    //           }).catch((err) => {
    //             dispatch('afterGetAllHandler', false)
    //             reject(err)
    //           })
    //       })
    //     })
    //   },
    //   getProduct({ state, commit, dispatch }, id = null) {
    //     return new Promise((resolve) => {
    //       dispatch('api/product/getProduct', id, { root: true }).then((resp) => {
    //         commit('UPDATE_PRODUCT_OBJECT_DATA', resp)
    //       })
    //     })
    //   },
    //   getProductByNumber({ state, commit, dispatch }, number = null) {
    //     return new Promise((resolve) => {
    //       dispatch('api/product/getProductByNumber', number, { root: true }).then((resp) => {
    //         commit('UPDATE_PRODUCT_OBJECT_DATA', resp)
    //         resolve(resp)
    //       })
    //     })
    //   },
    //   createdProduct({ state, commit, dispatch }, params) {
    //     return new Promise((resolve, reject) => {
    //       dispatch('beforeGetAllHandler', params).then((data) => {
    //         dispatch('api/product/createProduct', params, { root: true })
    //           .then((data) => {
    //             dispatch('afterGetAllHandler', data)
    //             resolve(data)
    //           }).catch((err) => {
    //             dispatch('afterGetAllHandler', false)
    //             reject(err)
    //           })
    //       })
    //     })
    //   },

    //   uploadProductImage({ state, commit, dispatch }, params = {}) {
    //     return new Promise((resolve) => {
    //       dispatch('api/product/uploadProductImage', params, { root: true })
    //         .then((resp) => {
    //           resolve(resp)
    //         })
    //     })
    //   },

    //   checkSkuNumber({ state, commit, dispatch }, skuNumber) {
    //     return new Promise((resolve, reject) => {
    //       dispatch('logic/fetching/beforeUpdateFatching', true, { root: true }).then((_) => {
    //         dispatch('api/product/checkSkuNumber', skuNumber, { root: true })
    //           .then((data) => {
    //             dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
    //             resolve(data)
    //           }).catch(error => {
    //             dispatch('logic/fetching/afterUpdateFatching', false, { root: true })
    //             reject(error)
    //           })
    //       })
    //     })
    //   }
}

export default {
    state: paginationMixins.stateMixins(state),
    mutations: Object.assign(mutations, paginationMixins.mutationsMixins),
    actions: Object.assign(actions, paginationMixins.actionsMixins),
    getters: Object.assign(getters, paginationMixins.gettersMixins)
}
