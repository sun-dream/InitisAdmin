// define a mixin object
const timeMixins = {
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    getEpochBeforeDisplay (epoch) {
      const n = new Date().getTime() / 1000
      const secs = n - epoch
      return this.secondsDisplay(secs) + '前'
    },
    secondsDisplay (secs) {
      const secNum = parseInt(secs, 10) // don't forget the second param
      const hours = Math.floor(secNum / 3600)
      const minutes = Math.floor((secNum - (hours * 3600)) / 60)
      const seconds = secNum - (hours * 3600) - (minutes * 60)
      let result = ''
      if (hours > 0) { result = hours + '小时' }
      if (minutes > 0) { result += minutes + '分钟' }
      if (seconds > 0) { result += seconds + '秒' }
      return result
    },
    timeDisplay (epoch) {
      return new Date(epoch * 1000).toLocaleString()
    },
    fullFormatDate (value) {
      const valueNum = value.toString().length === 13
        ? value : parseInt(value * 1000)
      const date = new Date(valueNum)
      const y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '年' + MM + '月' + d + '日-' + h + '点' + m + '分' + s + '秒'
    }
  },
  filters: {
    formatDate (value) {
      const valueNum = value.toString().length === 13
        ? value : parseInt(value * 1000)
      const date = new Date(valueNum)
      const y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      // let h = date.getHours();
      // h = h < 10 ? ('0' + h) : h;
      // let m = date.getMinutes();
      // m = m < 10 ? ('0' + m) : m;
      // let s = date.getSeconds();
      // s = s < 10 ? ('0' + s) : s;
      return y + '年' + MM + '月' + d + '日'
    },
    formatDateAndTime (value) {
      const valueNum = value.toString().length === 13
        ? value : parseInt(value * 1000)
      const date = new Date(valueNum)
      const y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '年' + MM + '月' + d + '日 ' + h + ':' + m + ':' + s
    }
  }
}

export default timeMixins
