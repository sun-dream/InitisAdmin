
import Vue from 'vue'
const vueGo = {}

// eslint-disable-next-line no-unused-vars
function epochToShortLocalDate (ts) {
  return new Date(ts * 1000).toLocaleString().split(',')[0]
}
const generalMixins = {
  methods: {
    isDef (val) {
      return val !== undefined && val !== null
    },
    isUndef (val) {
      return val === undefined || val === null
    },
    isDict (val) {
      return val !== null && typeof val === 'object' && !Array.isArray(val)
    },
    isFilled (v) {
      if (this.isDef(v)) {
        if (v.constructor === ''.constructor) {
          return v.length > 0
        } else if (v.constructor === [].constructor) {
          return v.length > 0
        } else if (v.constructor === {}.constructor) {
          return Object.keys(v).length > 0
        } else if (typeof v === 'number') {
          return true
        } else {
          // eslint-disable-next-line no-console
          throw console.error('[Global Mixins isFilled] Expected type to be either productBlock, dict/object, number or string. but got ' + typeof v)
        }
      }
      return false
    },
    toggleFromArray (_arr, _key) {
      const i = _arr.indexOf(_key)
      if (i >= 0) {
        _arr.splice(i, 1)
      } else {
        _arr.push(_key)
      }
    },
    removeFromArray (_arr, _key) {
      const i = _arr.indexOf(_key)
      if (i >= 0) {
        _arr.splice(i, 1)
      }
    },
    pushToArray (_arr, _key, unique = true) {
      const i = _arr.indexOf(_key)
      if (!unique || i < 0) {
        _arr.push(_key)
      }
    },
    jumpTo (routeObj, newTab = false) {
      if (!newTab) {
        this.$router.push(routeObj)
      } else {
        window.open((this.$router.resolve(routeObj)).href, '_blank')
      }
    },
    updateLoading (val) {
      // eslint-disable-next-line no-console
      console.error('updateLoading: ', val)
      // this.$store.dispatch('logic/loading/updateLoading', val)
    },
    enableMask (closeCallback) {
      this.$store.dispatch('logic/mask/enableShowMask', closeCallback)
    },
    cloneObj (val) { // 修改数据中转 数据条，为防止vuex数据修改
      if (val) {
        return JSON.parse(JSON.stringify(val))
      }
      return val
    },
    insertStr (soure, start, newStr) {
      return soure.slice(0, start) + newStr + soure.slice(start)
    },
    shortenString (string, length = 10) {
      if (string.length <= length) {
        return string
      } else {
        return string.substring(0, length) + '...'
      }
    },
    notification (obj) {
      // this.$store.commit('logic/notification/SET_ALERTS', obj)
      this.$notify({ ...obj, duration: 3000 })
    },
    notificationClear () {
      this.$store.commit('logic/notification/CLEAR_ALERTS')
    },
    copyText (t) {
      const el = document.createElement('textarea')
      el.value = t
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      this.notification({
        message: '<div>Copied</div>',
        type: 'success'
      })
    }
  },
  computed: {
  },
  data () {
    return {
      version: 'v1.02',
      recursivePeriods: [
        {
          value: 'daily',
          name: '每日'
        },
        {
          value: 'weekly',
          name: '每周'
        },
        {
          value: 'monthly',
          name: '每月'
        }
      ]
    }
  }
}

const _globalMixins = [
  generalMixins
]

vueGo.install = function (Vue, option) {
  Vue.prototype.$config = {}
  // global mixin
  _globalMixins.forEach((_globalMixin) => {
    Vue.mixin(_globalMixin)
  })
}

Vue.use(vueGo)
