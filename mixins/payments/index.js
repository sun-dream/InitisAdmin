const paymentsMixins = {
  data () {
    return {
      paymentsVuexBasePath: 'logic/payments'
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
    }
    // getPaymentItem (params = {}) {
    //   return this.$store.dispatch(this.paymentsVuexBasePath + '/getPaymentOrders', params)
    // }
  }
}

export default paymentsMixins
