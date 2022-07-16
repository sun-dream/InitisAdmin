const brandStoresMixins = {
  data () {
    return {
      brandStoresVuexBasePath: 'logic/brandStores',
      brandStoresStatusOption: [
        { name: 'Active', value: 'ACTIVE' },
        { name: 'Banndn', value: 'BANNED' },
        { name: 'Pending', value: 'PENDING' }
      ]
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
    },
    loadBrandStoreItem (id) {
      this.$store.dispatch(this.brandStoresVuexBasePath + '/getBrandStoreItem', id)
    },
    getBrandStoresStatus (data) {
      if (!data) {
        return ''
      }
      return this.brandStoresStatusOption.find(item => data === item.value)
    }

  }
}

export default brandStoresMixins
