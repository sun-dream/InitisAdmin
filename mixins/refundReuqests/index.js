const refundRequestsMixins = {
  data () {
    return {
      refundRequestsVuexBasePath: 'logic/refundReuqests',
      refundRequestsStatusOption: [
        { name: '待定', value: 'PENDING' },
        { name: '已退款', value: 'REFUNDED' },
        { name: '已拒绝', value: 'REJECTED ' },
        { name: '已取消', value: 'CANCELLED ' }
      ]
    }
  },
  computed: {
    refundRequestList () {
      return this.$store.getters[this.refundRequestsVuexBasePath + '/refundreQuestsList']
    },
    refundRequestQuery: {
      get () {
        return this.$store.getters[this.refundRequestsVuexBasePath + '/refundrequestsQuery']
      },
      set (val) {
        this.$store.commit(this.refundRequestsVuexBasePath + '/UPDATE_REFUND_REQUESTS_ITEM', val)
      }
    }
  },
  methods: {
    getRefundRequestsData (params = { query: this.paymentsQuery }) {
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
    }
  }
}

export default refundRequestsMixins
