const brandStoresMixins = {
  data () {
    return {
      brandStoresVuexBasePath: 'logic/brandStores'
    }
  },
  computed: {
    brandStoresQuery: {
      get () {
        return this.$store.getters[this.brandStoresVuexBasePath + '/brandStoresQuery']
      },
      set (val) {
        this.$store.commit(this.brandStoresVuexBasePath + '/UPDATE_BRAND_STORES_QUERY', val)
      }
    },
    brandStoresList () {
      return this.$store.getters[this.brandStoresVuexBasePath + '/brandStoresList']
    },
    brandStoreItem () {
      return this.$store.getters[this.brandStoresVuexBasePath + '/brandStoreItem']
    }
  },
  methods: {
    getBrandStoresData (params = { query: this.brandStoresQuery }) {
      this.loadBrandStoresList(params)
      this.loadBrandStoresPagination(params)
    },
    loadBrandStoresList (params = { query: '' }) {
      this.$store.dispatch(this.brandStoresVuexBasePath + '/getBrandStoresList', params)
    },
    loadBrandStoresPagination (params = { query: '' }) {
      this.$store.dispatch(this.brandStoresVuexBasePath + '/getBrandStoresPagination', params)
    }

  }
}

export default brandStoresMixins
