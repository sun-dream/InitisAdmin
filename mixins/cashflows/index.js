const cashflowsMixins = {
  data () {
    return {
      cashflowsVuexBasePath: 'logic/cashflows'
    }
  },
  computed: {
    cashflowsList () {
      return this.$store.getters[this.cashflowsVuexBasePath + '/cashflowsList']
    },
    cashflowsQuery: {
      get () {
        return this.$store.getters[this.cashflowsVuexBasePath + '/cashflowsQuery']
      },
      set (val) {
        this.$store.commit(this.cashflowsVuexBasePath + '/UPDATE_CASHFLOW_QUERY', val)
      }
    }
  },
  methods: {
    getCashflowsData (params = { query: this.cashflowsQuery }) {
      this.loadCashflowList(params)
      this.getCashflowPagination(params)
    },
    loadCashflowList (params = { query: '' }) {
      return this.$store.dispatch(this.cashflowsVuexBasePath + '/getCashflowList', params)
    },
    getCashflowPagination (params = { query: '' }) {
      return this.$store.dispatch(this.cashflowsVuexBasePath + '/getCashflowPagination', params)
    }
  }
}

export default cashflowsMixins
