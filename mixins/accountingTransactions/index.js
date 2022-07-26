const accountingTransactionsMixins = {
  data () {
    return {
      accountingTransactionsVuexBasePath: 'logic/accountingTransactions',
      accountRules: {
        third_party_transactional_id: { required: true, message: '请输入支付订单号', trigger: 'blur' },
        withdrawal_request_id: { required: true, message: '请输入提现订单号', trigger: 'blur' },
        source_amount: [{ required: true, message: '请输入钱包可提现金额', trigger: 'blur' }],
        transaction_fee: [{ required: true, message: '请输入交易手续费', trigger: 'blur' }],
        target_amount: [{ required: true, message: '请输入目标提现金额', trigger: 'blur' }],
        exchange_rate: [{ required: true, message: '请输入汇率', trigger: 'blur' }],
        source_financial_account_id: [{ required: true, message: '请输入平台转账账号的ID', trigger: 'blur' }],
        target_financial_account_id: [{ required: true, message: '请输入提现账号的ID', trigger: 'blur' }]
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
    updateAccountingTransactions ({ id, params }) {
      return this.$store.dispatch(this.accountingTransactionsVuexBasePath + '/updateAccountingTransactions', { id, params })
    },
    createAccountingTransactions (params) {
      return this.$store.dispatch(this.accountingTransactionsVuexBasePath + '/createAccountingTransactions', params)
    }
  }
}

export default accountingTransactionsMixins
