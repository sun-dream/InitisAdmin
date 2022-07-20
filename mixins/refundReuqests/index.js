const refundRequestsMixins = {
  data () {
    return {
      refundRequestsVuexBasePath: 'logic/refundReuqests',
      refundRequestsStatusOption: [
        { name: '待定', value: 'PENDING' },
        { name: '确认退款', value: 'REFUNDED' },
        { name: '拒绝退款', value: 'REJECTED' },
        { name: '取消退款', value: 'CANCELLED' }
      ],
      refundRequestsRefundReasonOption: [
        { name: '客户要求', value: 'requested_by_customer ' },
        { name: '欺诈/诈骗', value: 'fraudulent' },
        { name: '重复申请', value: 'duplicate' }
      ],
      refundRules: {}
    }
  },
  computed: {
    refundRequestList () {
      return this.$store.getters[this.refundRequestsVuexBasePath + '/refundreQuestsList']
    },
    refundRequestItem () {
      return this.$store.getters[this.refundRequestsVuexBasePath + '/refundrequestsItem']
    },
    refundRequestQuery: {
      get () {
        return this.$store.getters[this.refundRequestsVuexBasePath + '/refundrequestsQuery']
      },
      set (val) {
        this.$store.commit(this.refundRequestsVuexBasePath + '/UPDATE_REFUND_REQUESTS_QUERY', val)
      }
    }
  },
  methods: {
    getRefundRequestsData (params = { query: this.refundRequestQuery }) {
      this.loadRefundRequestsList(params)
      this.getRefundRequestsPagination(params)
    },
    loadRefundRequestsList (params = { query: '' }) {
      return this.$store.dispatch(this.refundRequestsVuexBasePath + '/getRefundRequestsList', params)
    },
    getRefundRequestsPagination (params = { query: '' }) {
      return this.$store.dispatch(this.refundRequestsVuexBasePath + '/getRefundRequestsPagination', params)
    },
    getRefundRequestsItem (id) {
      return this.$store.dispatch(this.refundRequestsVuexBasePath + '/getRefundRequestsItem', id)
    },
    getRefundRequestsStatus (data) {
      if (!data) {
        return ''
      }
      return this.refundRequestsStatusOption.find(item => data === item.value)
    },
    updateRefundRequests ({ id, params }) {
      return this.$store.dispatch(this.refundRequestsVuexBasePath + '/updateRefundRequests', { id, params })
    }
  }
}

export default refundRequestsMixins
