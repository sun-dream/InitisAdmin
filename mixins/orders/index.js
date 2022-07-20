const ordersMixins = {
  data () {
    return {
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
    orderQuery: {
      get () {
        return this.$store.getters[this.orderVuexBasePath + '/orderQuery']
      },
      set (val) {
        this.$store.commit(this.orderVuexBasePath + '/UPDATE_ORDER_QUERY', val)
      }
    },
    orderList () {
      return this.$store.getters[this.orderVuexBasePath + '/orderList']
    }
  },
  methods: {
    getOrderData (params = { query: this.orderQuery }) {
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
      return this.orderSkuStatusOption.find(item => data === item.value)
    },
    getOrderSkuUndeliveredQuantity  (data) {
      const arr = []
      data.forEach((item) => {
        if (item.status === 'UNFULFILLED') {
          arr.push(item)
        }
      })
      return arr
    }
  }
}

export default ordersMixins
