const withdrawalRequestsMixins = {
  data () {
    return {
      withdrawalRequestsVuexBasePath: 'logic/withdrawalRequests',
      withdrawalRequestsStatusOption: [
        { name: '待定', value: 'PENDING' },
        { name: '拒绝', value: 'REJECTED' },
        { name: '撤回', value: 'WITHDRAWN' },
        { name: '取消', value: 'CANCELLED' }
      ],
      paymentMethodTypeOption: [
        { name: '银行卡', value: 'BANK_TRANSACTION' },
        { name: 'Paypal', value: 'PAYPAL' },
        { name: 'Stripe', value: 'STRIPE' }
      ],
      accountStatusOption: [
        { name: 'Active', value: 'ACTIVE' },
        { name: 'InActive', value: 'INACTIVE' }
      ],
      withdrawalRules: {
        source_financial_account_id: { required: true, message: '请输入转账号码', trigger: 'blur' },
        third_party_transactional_id: { required: true, message: '请输入支付订单号', trigger: 'blur' },
        source_amount: [{ required: true, message: '请输入钱包可提现金额', trigger: 'blur' }],
        transaction_fee: [{ required: true, message: '请输入交易手续费', trigger: 'blur' }],
        target_amount: [{ required: true, message: '请输入目标提现金额', trigger: 'blur' }],
        exchange_rate: [{ required: true, message: '请输入汇率', trigger: 'blur' }]
      }
    }
  },
  computed: {
    withdrawalRequestsList () {
      return this.$store.getters[this.withdrawalRequestsVuexBasePath + '/withdrawalRequestsList']
    },
    withdrawalRequeststItem () {
      return this.$store.getters[this.withdrawalRequestsVuexBasePath + '/withdrawalRequestsItem']
    },
    withdrawalRequestsQuery: {
      get () {
        return this.$store.getters[this.withdrawalRequestsVuexBasePath + '/withdrawalRequestsQuery']
      },
      set (val) {
        this.$store.commit(this.withdrawalRequestsVuexBasePath + '/UPDATE_WITHDRAWAL_REQUESTS_QUERY', val)
      }
    }
  },
  methods: {
    getWithdrawalRequestsData (params = { query: this.withdrawalRequestsQuery }) {
      this.loadWithdrawalRequestsList(params)
      this.loadWithdrawalRequestsPagination(params)
    },
    loadWithdrawalRequestsList (params = { query: '' }) {
      return this.$store.dispatch(this.withdrawalRequestsVuexBasePath + '/getWithdrawalRequestsList', params)
    },
    loadWithdrawalRequestsPagination (params = { query: '' }) {
      return this.$store.dispatch(this.withdrawalRequestsVuexBasePath + '/getWithdrawalRequestsPagination', params)
    },
    loadWithdrawalRequestsItem (id) {
      return this.$store.dispatch(this.withdrawalRequestsVuexBasePath + '/getWithdrawalRequestsItem', id)
    },
    getWithdrawalRequestsStatus (data) {
      if (!data) {
        return ''
      }
      return this.withdrawalRequestsStatusOption.find(item => data === item.value)
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
    updateWithdrawalRequests ({ id, params }) {
      return this.$store.dispatch(this.withdrawalRequestsVuexBasePath + '/updateWithdrawalRequests', { id, params })
    },
    updateWithdrawalRequestsOfSuccess ({ id, params }) {
      return this.$store.dispatch(this.withdrawalRequestsVuexBasePath + '/updateWithdrawalRequestsOfSuccess', { id, params })
    }
  }
}

export default withdrawalRequestsMixins
