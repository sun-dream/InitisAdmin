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
    // isCollapse () {
    //   return this.$store.getters[this.myAppVuexBasePath + 'isCollapse']
    // },
    isFooter () {
      return this.$store.getters[this.myAppVuexBasePath + 'isFooter']
    },
    permission_routers () {
      return this.$store.getters[this.myAppVuexBasePath + 'permission/permission_routers']
    },
    menuIndex () {
      return this.$store.getters[this.myAppVuexBasePath + 'permission/menuIndex']
    }
  },
  methods: {
  },
  beforeDestroy () {
  }
}

export default myAppMixins
