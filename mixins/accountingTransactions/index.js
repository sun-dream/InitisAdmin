const accountingTransactionsMixins = {
  data () {
    return {
      accountingTransactionsVuexBasePath: 'logic/accountingTransactions',
      accountRules: {

      }
    }
  },
  computed: {
    accountingTransactionsList () {
      return this.$store.getters[this.accountingTransactionsVuexBasePath + '/accountingTransactionsList']
    },
    accountingTransactionstItem () {
      return this.$store.getters[this.accountingTransactionsVuexBasePath + '/accountingTransactionsItem']
    },
    accountingTransactionsQuery: {
      get () {
        return this.$store.getters[this.accountingTransactionsVuexBasePath + '/accountingTransactionsQuery']
      },
      set (val) {
        this.$store.commit(this.accountingTransactionsVuexBasePath + '/UPDATE_ACCOUNTING_TRANSACTIONS_QUERY', val)
      }
    }
  },
  methods: {
    getAccountingTransactionsData (params = { query: this.accountingTransactionsQuery }) {
      this.loadAccountingTransactionsList(params)
      this.loadAccountingTransactionsPagination(params)
    },
    loadAccountingTransactionsList (params = { query: '' }) {
      return this.$store.dispatch(this.accountingTransactionsVuexBasePath + '/getAccountingTransactionsList', params)
    },
    loadAccountingTransactionsPagination (params = { query: '' }) {
      return this.$store.dispatch(this.accountingTransactionsVuexBasePath + '/getAccountingTransactionsPagination', params)
    },
    loadAccountingTransactionsItem (id) {
      return this.$store.dispatch(this.accountingTransactionsVuexBasePath + '/getAccountingTransactionsItem', id)
    },
    updateAccountingTransactions ({ id, params }) {
      return this.$store.dispatch(this.accountingTransactionsVuexBasePath + '/updateAccountingTransactions', { id, params })
    },
    createAccountingTransactions (params) {
      return this.$store.dispatch(this.accountingTransactionsVuexBasePath + '/createAccountingTransactions', params)
    }
  }
}

export default accountingTransactionsMixins
