const shipmentsMixins = {
  data () {
    return {
      shipmentsVuexBasePath: 'logic/shipments',
      shipmentsStatusOption: [
        { name: '未发货', value: 'UNSHIPPED' },
        { name: '已发货', value: 'SHIPPED' },
        { name: '已丢失', value: 'LOST ' }
      ],
      shipmentsMethodOption: [
        { name: '海运', value: 'SEA' },
        { name: '陆运', value: 'AIR' },
        { name: '空运', value: 'LAND' }
      ],
      shipmentsRules: {
        provider: [{ required: true, message: '供应商内容不可为空', trigger: 'blur' }],
        ship_at: [{ required: true, message: '时间为必填项', trigger: 'blur' }],
        tracking_number: [{ required: true, message: '物流编号不能为空', trigger: 'blur' }],
        cost: [{ required: true, type: 'number', min: 0.1, max: 99999999, message: '物流费用不能为空,并且不可为0', trigger: 'blur' }],
        estimated_arrival_days: [{ required: true, type: 'number', min: 0.1, max: 99999999, message: '预计到达天数不能为空,并且不可为0', trigger: 'blur' }]
      }
    }
  },
  computed: {
  },
  methods: {
    createShipments (params) {
      return this.$store.dispatch(this.shipmentsVuexBasePath + '/createShipments', params)
    },
    updateShipments ({ id, params }) {
      return this.$store.dispatch(this.shipmentsVuexBasePath + '/updateShipments', { id, params })
    },
    getShipmentsMethod (data) {
      if (!data) {
        return ''
      }
      const method = this.shipmentsMethodOption.find(item => data === item.value)
      return method
    }
  }
}

export default shipmentsMixins
