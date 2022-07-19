const cashflowsMixins = {
  data () {
    return {
      cashflowsVuexBasePath: 'logic/cashflows',
      cashflowsTypeOption: [
        { name: '商户销售收入', value: 'MERCHANT_SALE_INCOME' },
        { name: '平台收入', value: 'PLATFORM_INCOME' }
      ]
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
    getCashflowsType (data) {
      if (!data) {
        return ''
      }
      return this.cashflowsTypeOption.find(item => data === item.value)
    },
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
