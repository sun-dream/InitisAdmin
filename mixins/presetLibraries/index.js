const presetLibrariesMixins = {
  data () {
    return {
      presetLibrariesVuexBasePath: 'logic/presetLibraries',
      presetLibrariesTypeOption: [
        { name: '背景图', value: 'MERCHANT_BG_COVER' }
      ]
    }
  },
  computed: {
    presetLibrarieList () {
      return this.$store.getters[this.presetLibrariesVuexBasePath + '/presetLibrarieList']
    },
    presetLibrarieItem () {
      return this.$store.getters[this.presetLibrariesVuexBasePath + '/presetLibrarieItem']
    },
    presetLibrarieQuery: {
      get () {
        return this.$store.getters[this.presetLibrariesVuexBasePath + '/presetLibrarieQuery']
      },
      set (val) {
        this.$store.commit(this.presetLibrariesVuexBasePath + '/UPDATE_PRESET_LIBRARIE_QUERY', val)
      }
    }
  },
  methods: {
    getPresetLibrarieData (params = { type: this.presetLibrarieQuery }) {
      this.getPresetLibrarieList(params)
      this.getPresetLibrariePagination(params)
    },
    getPresetLibrarieList (params = { query: '' }) {
      return this.$store.dispatch(this.presetLibrariesVuexBasePath + '/getPresetLibrarieList', params)
    },
    getPresetLibrariePagination (params = { query: '' }) {
      return this.$store.dispatch(this.presetLibrariesVuexBasePath + '/getPresetLibrariePagination', params)
    },
    loadPresetLibrarieItem (id) {
      return this.$store.dispatch(this.presetLibrariesVuexBasePath + '/getPresetLibrarieItem', id)
    },
    updatePresetLibrarie ({ params, id }) {
      return this.$store.dispatch(this.presetLibrariesVuexBasePath + '/updatePresetLibrarie', { params, id })
    },
    createPresetLibrarie (params) {
      return this.$store.dispatch(this.presetLibrariesVuexBasePath + '/createPresetLibrarie', params)
    },
    createPresetLibraries (params) {
      return this.$store.dispatch(this.presetLibrariesVuexBasePath + '/createPresetLibraries', params)
    }
  }
}

export default presetLibrariesMixins
