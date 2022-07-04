const publicUseMixins = {
  data () {
    return {
      statusArray: [
        { name: '在售', value: 'ON_SALE' },
        { name: '存档', value: 'ARCHIVED' },
        { name: '删除', value: 'DELETED' },
        { name: '草稿', value: 'DRAFT' }
      ],
      currencyArray: [
        { name: '人民币', value: 'CNY', currencySymbols: '￥' },
        { name: '美元', value: 'USD', currencySymbols: '$' },
        { name: '欧元', value: 'EUR', currencySymbols: '€' }
      ],
      orderStatusArray: [
        { name: 'Awaiting shipment', zhName: '待支付/已支付', value: 'NORMAL' }, // 可取消	不可删除
        { name: 'Awaiting shipment', zhName: '待发货 ', value: 'PENDING' }, // 不可取消	不可删除
        { name: 'Shipment', zhName: '已发货 ', value: 'FULFILLED' }, // 不可取消	不可删除
        { name: 'Cancelled', zhName: '已取消', value: 'CANCEL' }, // 不可取消	可删除
        { name: 'Deleted', zhName: '已删除', value: 'DELETE' }, // 不可取消	不可删除
        { name: 'Completed', zhName: '已完成', value: 'CLOSE' } // 不可取消	可删除
      ],
      orderSourceArray: [
        { name: 'unknown', zhName: '未知来源', value: 'UNKNOWN' },
        { name: 'web', zhName: '样品', value: 'WEB' },
        { name: 'Shopify', zhName: 'shopify导入', value: 'SHOPIFY' }
        // { name: 'WordPress', zhName: 'wordpress导入', value: 'WORDPRESS' }
      ],
      paymentStatusArray: [
        { name: 'Paid', zhName: '已支付', value: 'PAID' },
        { name: 'Waiting for seller to pay', zhName: '等待卖家付款', value: 'PENDING' },
        { name: 'Order Cancellation', zhName: '订单已取消', value: 'CANCELED' },
        { name: 'Orders have been refunded', zhName: '订单已退款', value: 'REFUNDED' }
      ],
      OrderShipmentStatusArray: [
        { name: 'Pending', value: 'PENDING', zhName: '待发货' },
        { name: 'Fulfilled', value: 'FULFILLED', zhName: '已发货' },
        { name: 'UnFulfilled', value: 'UNFULFILLED', zhName: '不发货' },
        { name: 'Other', value: 'OTHER', zhName: '其他' }
      ]
    }
  },
  computed: {
  },
  methods: {
    getOrderShipmentStatus (val, type = 'name') {
      if (!this.isDef(val) || val === '') {
        return '-'
      }
      let statusIndex = 0
      for (let index = 0; index < this.OrderShipmentStatusArray.length; index++) {
        if (this.OrderShipmentStatusArray[index].value === val) {
          statusIndex = index
          break
        }
      }
      if (type === 'name') {
        return this.OrderShipmentStatusArray[statusIndex].name
      } else {
        return this.OrderShipmentStatusArray[statusIndex][type]
      }
    },
    getPaymentStatus (val, type = 'name') {
      if (!this.isDef(val) || val === '') {
        return '-'
      }
      let statusIndex = 0
      for (let index = 0; index < this.paymentStatusArray.length; index++) {
        if (this.paymentStatusArray[index].value === val) {
          statusIndex = index
          break
        }
      }
      if (type === 'name') {
        return this.paymentStatusArray[statusIndex].name
      } else {
        return this.paymentStatusArray[statusIndex][type]
      }
    },
    getOrderSource (val, type = 'name') {
      if (!this.isDef(val) || val === '') {
        return '-'
      }
      let statusIndex = 0
      for (let index = 0; index < this.orderSourceArray.length; index++) {
        if (this.orderSourceArray[index].value === val) {
          statusIndex = index
          break
        }
      }
      if (type === 'name') {
        return this.orderSourceArray[statusIndex].name
      } else {
        return this.orderSourceArray[statusIndex][type]
      }
    },
    getOrderStatus (val, type = 'name') {
      if (!this.isDef(val) || val === '') {
        return '-'
      }
      let statusIndex = 0
      for (let index = 0; index < this.orderStatusArray.length; index++) {
        if (this.orderStatusArray[index].value === val) {
          statusIndex = index
          break
        }
      }
      if (type === 'name') {
        return this.orderStatusArray[statusIndex].name
      } else {
        return this.orderStatusArray[statusIndex][type]
      }
    },
    // productStatus
    getStatus (val) {
      if (!val) {
        return
      }
      let statusIndex = 0
      for (let index = 0; index < this.statusArray.length; index++) {
        if (this.statusArray[index].value === val) {
          statusIndex = index
          break
        }
      }
      return this.statusArray[statusIndex].name
    },
    getCurrencySymbols (val) {
      if (!val) {
        return '-'
      }
      let symbolsIndex = 0
      for (let index = 0; index < this.currencyArray.length; index++) {
        if (this.currencyArray[index].value === val) {
          symbolsIndex = index
          break
        }
      }
      return this.currencyArray[symbolsIndex].currencySymbols
    }
  }
}

export default publicUseMixins
