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
      orderVuexBasePath: 'logic/order'
    }
  },
  computed: {
    orderList () {
      return this.$store.getters[this.orderVuexBasePath + '/orderList']
    }
  },
  methods: {
    createOrder (params = {}) {
      return this.$store.dispatch(this.orderVuexBasePath + '/createOrder', params)
    },
    loadOrderList (params = {}) {
      return this.$store.dispatch(this.orderVuexBasePath + '/getOrderList', params)
    },
    updateUserOrderCancel (params = {}) {
      return this.$store.dispatch(this.orderVuexBasePath + '/userOrderCancel', params)
    },
    updateUserOrderDelete (params = {}) {
      return this.$store.dispatch(this.orderVuexBasePath + '/userOrderDelete', params)
    },
    userOrderPay (params = {}) {
      return this.$store.dispatch(this.orderVuexBasePath + '/userOrderPay', params)
    },
    adminOrderShipment (params = {}) {
      return this.$store.dispatch(this.orderVuexBasePath + '/adminOrderShipment', params)
    },
    SubmitOrderImportSource ({ source, params }) {
      if (typeof source !== 'string') {
        return
      }
      return this.$store.dispatch(this.orderVuexBasePath + '/orderImportSource', { source, params })
    }
  }
}

export default ordersMixins
