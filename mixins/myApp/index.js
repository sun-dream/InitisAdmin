const myAppMixins = {
  data () {
    return {
      myAppVuexBasePath: 'logic/myApp/',
      fetchinggVuexBasePath: 'logic/fetching/'
    }
  },
  computed: {
    fetching () {
      return this.$store.getters[this.fetchinggVuexBasePath + 'fetching']
    }
  },
  methods: {
  }
}

export default myAppMixins
