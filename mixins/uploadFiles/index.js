const uploadFilesMixins = {
  data () {
    return {
      uploadFilesVuexBasePath: 'logic/uploadFiles'
    }
  },
  computed: {
    // productList () {
    //   return this.$store.getters[this.uploadFilesVuexBasePath + '/productList']
    // }
  },
  methods: {
    getFiles (id) {
      return this.$store.dispatch(this.uploadFilesVuexBasePath + '/getFiles', { id })
    }
  }
}

export default uploadFilesMixins
