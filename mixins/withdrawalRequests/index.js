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
