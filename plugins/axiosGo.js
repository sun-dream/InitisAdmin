
import { Notification } from 'element-ui'
const debugMode = false
const _PATHS_DO_NOT_REDIRECT_401 = []
const _PATHS_IGNORE_ALERTS = [] // **引入element的通知组件**
export default ({ $axios, redirect, store, beforeNuxtRender, route }) => {
  // 开启浏览器端cookie传递
  $axios.defaults.withCredentials = true
  // check out https://axios.nuxtjs.org/v/dev/extend

  // 拦截器
  $axios.interceptors.request.use((config) => {
    // console.log('[Request interceptor] send request: ', config)
    if (!config.data) {
      config.data = {}
    }
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, (err) => {
    return Promise.reject(err)
  })

  // 请求成功
  $axios.interceptors.response.use((response) => {
    // console.log('[Response interceptor] receive response: ', response)
    if (!response.status && !beforeNuxtRender) {
      console.log('请求接口报错', response.data.msg)
      let noNeedToAlert = false
      // eslint-disable-next-line no-prototype-builtins
      if (response.hasOwnProperty('request')) {
        for (let k = 0; k < _PATHS_IGNORE_ALERTS.length; k++) {
          if (response.request.responseURL.includes(_PATHS_IGNORE_ALERTS[k])) {
            noNeedToAlert = true
          }
        }
      }
      if (!noNeedToAlert) {
        let title = '错误信息:' + response.data.code
        if (response.data.msg && response.data.msg.length > 0) {
          title = response.data.msg
        }
        console.error(`原始错误:${response.data}`)
        Notification({ title: `${title}`, message: `${response.data.msg}`, type: 'error', duration: 10000 })
      }
      return Promise.reject(response.data)
    } else { // 接口正常返回
      return response
    }
    // 请求失败
  }, (error) => {
    const status = error.response ? error.response.status : null
    let errorDetailText = ''
    if (!isJsonString(error.request.responseText)) {
      errorDetailText = 'Network error !'
    } else if (error.request && error.request.responseText && Array.isArray(JSON.parse(error.request.responseText).detail)) {
      errorDetailText = JSON.parse(error.request.responseText).detail[0].msg
    } else if (error.request && error.request.responseText && JSON.parse(error.request.responseText).error) {
      errorDetailText = JSON.parse(error.request.responseText).error
    } else if (error.request && error.request.responseText) {
      errorDetailText = JSON.parse(error.request.responseText).detail
    }
    if (status === 401 || status === '401' || status === 403 || status === '403') {
      if (debugMode) {
        console.log('Found 401')
      } else {
        console.log('Found 401')
        let noNeedToRedirect = false
        for (let k = 0; k < _PATHS_DO_NOT_REDIRECT_401.length; k++) {
          if (error.request.responseURL.includes(_PATHS_DO_NOT_REDIRECT_401[k])) {
            noNeedToRedirect = true
          }
        }
        if (!noNeedToRedirect) {
          Notification({ title: 'Error:' + status, message: `${errorDetailText}`, type: 'error' })
          setTimeout(() => {
            redirect('/logout?redirect=' + encodeURIComponent(location.href))
          }, 3000)
        }
      }
    } else if (!beforeNuxtRender) {
      // closeLoading()
      Notification({ title: 'Error:' + status, message: `${errorDetailText}`, type: 'error' })
      console.error('requests出错了:' + status)
    }
    return Promise.reject(error)
  })
}
function isJsonString (str) {
  try {
    if (typeof JSON.parse(str) === 'object') {
      return true
    }
  } catch (e) {
  }
  return false
}
