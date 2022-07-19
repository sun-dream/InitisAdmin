const paymentsMixins = {
  data () {
    return {
      paymentsVuexBasePath: 'logic/payments',
      paymengtStatusOption: [
        { name: '未付款', value: 'UNPAID' },
        { name: '已付款', value: 'PAID' },
        { name: '失败', value: 'FAILED' },
        { name: '取消', value: 'CANCELED' },
        { name: '部分退款', value: 'PARTIAL_REFUNDED' },
        { name: '退款', value: 'REFUNDED' }
      ]
    }
  },
  computed: {
    paymentsItem () {
      return this.$store.getters[this.paymentsVuexBasePath + '/paymentsItem']
    },
    paymentsList () {
      return this.$store.getters[this.paymentsVuexBasePath + '/paymentsList']
    },
    paymentsQuery: {
      get () {
        return this.$store.getters[this.paymentsVuexBasePath + '/paymentsQuery']
      },
      set (val) {
        this.$store.commit(this.paymentsVuexBasePath + '/UPDATE_PAYMENTS_QUERY', val)
      }
    }
  },
  methods: {
    getPaymentsData (params = { query: this.paymentsQuery }) {
      this.loadPaymentList(params)
      this.getPaymentListPagination(params)
    },
    loadPaymentList (params = { query: '' }) {
      return this.$store.dispatch(this.paymentsVuexBasePath + '/getPaymentList', params)
    },
    getPaymentListPagination (params = { query: '' }) {
      return this.$store.dispatch(this.paymentsVuexBasePath + '/getPaymentListPagination', params)
    },
    getPaymentStatus (data) {
      if (!data) {
        return ''
      }
      return this.paymengtStatusOption.find(item => data === item.value)
    },
    getPaymentItem (id) {
      return this.$store.dispatch(this.paymentsVuexBasePath + '/getPaymentItem', id)
    }
  }
}

export default paymentsMixins
