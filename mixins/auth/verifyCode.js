const verifyCodeMixins = {
  data () {
    return {
      verifyCoolDown: { // 控制发送频率
        status: false,
        counter: 60,
        interval: null,
        sendAgain: false
      }

    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    startSendCoolDown () {
      clearInterval(this.verifyCoolDown.interval)
      this.verifyCoolDown.counter = 60
      this.verifyCoolDown.status = true
      this.verifyCoolDown.sendAgain = true
      this.verifyCoolDown.interval = setInterval(() => {
        this.verifyCoolDown.counter -= 1
        if (this.verifyCoolDown.counter <= 0) {
          this.coolDownEndHandler()
        }
      }, 1000)
    },
    coolDownEndHandler () {
      this.verifyCoolDown.status = false
      this.verifyCoolDown.counter = 60
      clearInterval((this.verifyCoolDown.interval))
    }
  }
}

export default verifyCodeMixins
