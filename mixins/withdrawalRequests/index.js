const withdrawalRequestsMixins = {
  data () {
    return {
      withdrawalRequestsVuexBasePath: 'logic/withdrawalRequests'
    //   refundRequestsStatusOption: [
    //     { name: '待定', value: 'PENDING' },
    //     { name: '确认退款', value: 'REFUNDED' },
    //     { name: '拒绝退款', value: 'REJECTED' },
    //     { name: '取消退款', value: 'CANCELLED' }
    //   ],
    //   refundRequestsRefundReasonOption: [
    //     { name: '客户要求', value: 'requested_by_customer ' },
    //     { name: '欺诈/诈骗', value: 'fraudulent' },
    //     { name: '重复申请', value: 'duplicate' }
    //   ],
    //   refundRules: {}
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
    // getRefundRequestsStatus (data) {
    //   if (!data) {
    //     return ''
    //   }
    //   return this.refundRequestsStatusOption.find(item => data === item.value)
    // },
    updateWithdrawalRequests ({ id, params }) {
      return this.$store.dispatch(this.withdrawalRequestsVuexBasePath + '/updateWithdrawalRequests', { id, params })
    },
    updateWithdrawalRequestsOfSuccess ({ id, params }) {
      return this.$store.dispatch(this.withdrawalRequestsVuexBasePath + '/updateWithdrawalRequestsOfSuccess', { id, params })
    }
  }
}

export default withdrawalRequestsMixins
