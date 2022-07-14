const shipmentsMixins = {
  data () {
    return {
      shipmentsVuexBasePath: 'logic/shipments',
      shipmentsStatusOption:[
        {name:'未发货',value:'UNSHIPPED'},
        {name:'已发货',value:'SHIPPED'},
        {name:'已丢失',value:'LOST '},
      ]
    }
  },
  computed: {
  },
  methods: {
  }
}

export default shipmentsMixins
