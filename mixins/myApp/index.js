const myAppMixins = {
  data () {
    return {
      myAppVuexBasePath: 'logic/myApp/'
    }
  },
  computed: {
    sidebar () {
      return this.$store.getters[this.myAppVuexBasePath + 'sidebar']
    },
    isCollapse () {
      return this.$store.getters[this.myAppVuexBasePath + 'isCollapse']
    },
    isFooter () {
      return this.$store.getters[this.myAppVuexBasePath + 'isFooter']
    }
  },
  methods: {
  },
  beforeDestroy () {
  }
}

export default myAppMixins
