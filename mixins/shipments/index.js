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
      shipmentsForm: {
        provider: '',
        tracking_number: '',
        ship_at: '',
        estimated_arrival_days: '',
        cost: '',
        status: null,
        method: null,
        currency: null
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
    }
  }
}

export default shipmentsMixins
