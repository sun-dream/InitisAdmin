const ordersMixins = {
  data () {
    return {
      filter: {
        status: [],
        order_number: '',
        payment_status: []
      },
      orderStatusFilters: [
        { name: 'All Orders', value: 'ALL', zhName: '全部', isAdmin: false },
        { name: 'Awaiting Payment', value: 'UNPAID', zhName: '待付款', isAdmin: false },
        { name: 'Awaiting Shipment', value: 'SHIPMENT', zhName: '待装运', isAdmin: false },
        { name: 'Cancelled', value: 'CANCELLED', zhName: '取消', isAdmin: false },
        { name: 'Completed', value: 'COMPLETED', zhName: '完成', isAdmin: false }
      ],
      orderStatusFiltersAdmin: [
        { name: 'NORMAL', value: 'NORMAL', zhName: '正常', isAdmin: true },
        // { name: 'PENDING', value: 'PENDING', zhName: '待付款', isAdmin: true },
        { name: 'FULFILLED', value: 'FULFILLED', zhName: '已发货', isAdmin: true },
        { name: 'CANCEL', value: 'CANCEL', zhName: '取消', isAdmin: true },
        { name: 'CLOSE', value: 'CLOSE', zhName: '关闭', isAdmin: true },
        { name: 'DELETE', value: 'DELETE', zhName: '删除', isAdmin: true }
      ],
      orderSkuStatusOption: [
        { name: '未付款', value: 'UNPAID' },
        { name: '付款失败', value: 'FAILED' },
        { name: '已取消', value: 'CANCELED' },
        { name: '未发货', value: 'UNFULFILLED' },
        { name: '已发货', value: 'FULFILLED' },
        { name: '已退款', value: 'REFUNDED' },
        { name: '不可退款', value: 'NONREFUNDABLE' },
        { name: '已关闭', value: 'CLOSED' },
        { name: '未激活', value: 'INACTIVE' }
      ],
      orderVuexBasePath: 'logic/order'
    }
  },
  computed: {
    orderList () {
      return this.$store.getters[this.orderVuexBasePath + '/orderList']
    }
  },
  methods: {
    getOrderData (params = { query: '' }) {
      this.loadOrderList(params)
      this.loadOrderPagination(params)
    },
    loadOrderList (params = { query: '' }) {
      this.$store.dispatch(this.orderVuexBasePath + '/getOrderList', params)
    },
    loadOrderPagination (params = { query: '' }) {
      this.$store.dispatch(this.orderVuexBasePath + '/getOrderPagination', params)
    },
    getOrderskuStatus (data) {
      if (!data) {
        return ''
      }
      const checkedStatus = this.orderSkuStatusOption.find(item => data === item.value)
      return checkedStatus
      // this.orderSkuStatusOption.filter = ()
    },
    getOrderSkuUndeliveredQuantity  (data) {
      let n = 0
      data.forEach((item) => {
        if (item.status === 'UNFULFILLED') {
          n++
        }
      })
      return n
    }
    // createOrder (params = {}) {
    //   return this.$store.dispatch(this.orderVuexBasePath + '/createOrder', params)
    // },
    // loadOrderList (params = {}) {
    //   return this.$store.dispatch(this.orderVuexBasePath + '/getOrderList', params)
    // },
    // updateUserOrderCancel (params = {}) {
    //   return this.$store.dispatch(this.orderVuexBasePath + '/userOrderCancel', params)
    // },
    // updateUserOrderDelete (params = {}) {
    //   return this.$store.dispatch(this.orderVuexBasePath + '/userOrderDelete', params)
    // },
    // userOrderPay (params = {}) {
    //   return this.$store.dispatch(this.orderVuexBasePath + '/userOrderPay', params)
    // },
    // adminOrderShipment (params = {}) {
    //   return this.$store.dispatch(this.orderVuexBasePath + '/adminOrderShipment', params)
    // },
    // SubmitOrderImportSource ({ source, params }) {
    //   if (typeof source !== 'string') {
    //     return
    //   }
    //   return this.$store.dispatch(this.orderVuexBasePath + '/orderImportSource', { source, params })
    // }
  }
}

export default ordersMixins
