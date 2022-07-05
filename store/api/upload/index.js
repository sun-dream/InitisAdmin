const state = () => {
  return {
  }
}

const getters = {
}
const mutations = {
}
const actions = {
  uploadFiles ({ commit }, params) {
    const forms = new FormData()
    const configs = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    if (Array.isArray(params) && params.length > 0) {
      for (let i = 0; i < params.length; i++) {
        forms.append('file', params[i])
      }
    } else {
      forms.append('file', params)
    }
    return new Promise((resolve, reject) => {
      this.$axios.post('files/user', forms, configs).then((resp) => {
        resolve(resp.data)
      }).catch((error) => {
        reject(error)
      })
    })
  }
  // uploadOrder ({ commit },params) {
  //     let forms = new FormData()
  //     let configs = {
  //       headers:{'Content-Type':'multipart/form-data'}
  //     };
  //     forms.append('file',params)
  //     return new Promise((resolve,reject) => {
  //       this.$axios.post('upload/order',forms,configs).then((resp) => {
  //         resolve(resp.data.data)
  //       })
  //       .catch(error=>{
  //         reject(error)
  //       })
  //     })
  // },
  // uploadProductVideo ({ commit },params) {
  //   let forms = new FormData()
  //   let configs = {
  //     headers:{'Content-Type':'multipart/form-data'}
  //   };
  //   if(Array.isArray(params) && params.length > 0){
  //     for (let i = 0; i < params.length; i++) {
  //       forms.append('files', params[i])
  //     }
  //   }else{
  //     forms.append('files',params)
  //   }
  //   return new Promise((resolve,reject) => {
  //     this.$axios.post('upload/product_video',forms,configs).then((resp) => {
  //       resolve(resp.data.data)
  //     })
  //     .catch(error=>{
  //       reject(error)
  //     })
  //   })
  // },
  // uploadTemplate ({ commit },params) {
  //   return new Promise((resolve,reject) => {
  //     this.$axios.get('upload/template/'+params).then((resp) => {
  //       resolve(resp.data.data)
  //     })
  //     .catch(error=>{
  //       reject(error)
  //     })
  //   })
  // },
}

export default {
  state,
  mutations,
  actions,
  getters
}
