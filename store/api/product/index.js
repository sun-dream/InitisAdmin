const state = () => {
    return {
    }
  }

  const getters = {
  }
  const mutations = {
  }
  const actions = { 
    getProductList ({ commit },params) {
      return new Promise((resolve) => {
        this.$axios.get('products/admin/all',{params}).then((resp) => {
           resolve(Array.isArray(resp.data) && resp.data.length > 0 ? resp.data:[])
        })
      })
    },
    getProductPagination ({ commit },params) {
      return new Promise((resolve) => {
        this.$axios.get('products/admin/all/pagination',{params}).then((resp) => {
           resolve(resp.data)
        })
      })
    },
    getProduct ({ commit },id) {
      return new Promise((resolve) => {
        this.$axios.get('product/'+id).then((resp) => {
          resolve(resp.data)
        })
      })
    },
    getProductByNumber ({ commit },number) {
      return new Promise((resolve) => {
        this.$axios.get('product/number/'+number).then((resp) => {
          resolve(resp.data.data)
        })
      })
    },
    createProduct ({ commit },params) {
      return new Promise((resolve,reject) => {
        this.$axios.post('product',params).then((resp) => {
          resolve(resp.data.data)
        })
        .catch(error=>{
          reject(error)
        })
      })
    },
    uploadProductImage ({ commit },params) {
      let forms = new FormData()
      let configs = {
        headers:{'Content-Type':'multipart/form-data'}
      };
      if(Array.isArray(params) && params.length > 0){
        for (let i = 0; i < params.length; i++) {
          forms.append('files', params[i])
        }
      }else{
	      forms.append('files',params)
      }
      return new Promise((resolve) => {
        this.$axios.post('upload/product_image',forms,configs).then((resp) => {
          resolve(resp.data.data)
        })
      })
    },
    updateProduct ({ commit },{data,productId}) {
      return new Promise((resolve) => {
        this.$axios.put('product/'+productId,data).then((resp) => {
          resolve(resp.data.data)
        })
      })
    },
    checkSkuNumber ({ commit },skuNumber) {
      return new Promise((resolve,reject) => {
        this.$axios.get('sku/check_sku_number/'+skuNumber).then((resp) => {
          resolve(resp.data.data)
        })
        .catch(error=>{
          reject(error)
        })
      })
    },
    updateCoverSkuForProductId ({ commit },{productId,data}) {
      return new Promise((resolve,reject) => {
        this.$axios.put('sku/update_cover/'+productId,data).then((resp) => {
          resolve(resp.data.data)
        })
        .catch(error=>{
          reject(error)
        })
      })
    },
    calculateCalcCost ({ commit },params) {
      return new Promise((resolve,reject) => {
        this.$axios.post('calculate/calc_cost',params).then((resp) => {
          resolve(resp.data.data)
        })
        .catch(error=>{
          reject(error)
        })
      })
    },
  }

  export default {
    state,
    mutations,
    actions,
    getters
  }
