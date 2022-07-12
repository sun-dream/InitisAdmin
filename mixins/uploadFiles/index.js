const uploadFilesMixins = {
  data () {
    return {
      uploadFilesVuexBasePath: 'logic/uploadFiles'
    }
  },
  computed: {
    fileObject () {
      return this.$store.getters[this.uploadFilesVuexBasePath + '/fileObject']
    }
  },
  methods: {
    getFiles (id) {
      return this.$store.dispatch(this.uploadFilesVuexBasePath + '/getFiles', { id })
    },
    uploadFiles ({ data, progressHandler = (progressEvent) => {} }) {
      return this.$store.dispatch(this.uploadFilesVuexBasePath + '/uploadFiles', { params: data, progressHandler })
    }
  }
}

export default uploadFilesMixins
