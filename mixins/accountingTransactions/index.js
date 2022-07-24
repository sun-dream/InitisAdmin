const accountingTransactionsMixins = {
  data () {
    return {
      accountingTransactionsVuexBasePath: 'logic/accountingTransactions',
      accountingTransactionsStatusOption: [
        { name: '待定', value: 'PENDING' },
        { name: '拒绝', value: 'REJECTED' },
        { name: '撤回', value: 'WITHDRAWN' },
        { name: '取消', value: 'CANCELLED' }
      ],
      paymentMethodTypeOption: [
        { name: 'Bank Transaction', value: 'BANK_TRANSACTION' },
        { name: 'Paypal', value: 'PAYPAL' },
        { name: 'Stripe', value: 'STRIPE' }
      ],
      accountStatusOption: [
        { name: 'Active', value: 'ACTIVE' },
        { name: 'InActive', value: 'INACTIVE' }
      ]
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
        this.$store.commit(this.accountingTransactionsVuexBasePath + '/UPDATE_WITHDRAWAL_REQUESTS_QUERY', val)
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
    getAccountingTransactionsStatus (data) {
      if (!data) {
        return ''
      }
      return this.accountingTransactionsStatusOption.find(item => data === item.value)
    },
    getPaymentMethodType (data) {
      if (!data) {
        return ''
      }
      return this.paymentMethodTypeOption.find(item => data === item.value)
    },
    getAccountStatus (data) {
      if (!data) {
        return ''
      }
      return this.accountStatusOption.find(item => data === item.value)
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
