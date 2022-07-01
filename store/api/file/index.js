const state = () => {
  return {
  }
}

const getters = {
}
const mutations = {
}
const actions = {
  uploadFiles ({ commit }, { formData }) {
    return new Promise((resolve, reject) => {
      this.$axios.post('upload', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          timeout: 60 * 1000 * 60
        }
      ).then((resp) => {
        if (resp.data.status) {
          resolve(resp.data.data)
        } else {
          resolve(null)
        }
      }).catch((err) => {
        reject(err)
      })
    })
  },
  uploadAmazonCsvFile ({ commit }, { formData }) {
    return new Promise((resolve, reject) => {
      this.$axios.post('upload_amz_csv', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          timeout: 60 * 1000 * 60
        }
      ).then((resp) => {
        if (resp.data.status) {
          resolve(resp.data.data)
        } else {
          resolve(null)
        }
      }).catch((err) => {
        reject(err)
      })
    })
  },
  uploadAmazonOrderFile ({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios.post('upload_amazon_orders', data, {
        timeout: 60 * 1000 * 60
      }
      ).then((resp) => {
        resolve(resp.data.status)
      }).catch((err) => {
        reject(err)
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
