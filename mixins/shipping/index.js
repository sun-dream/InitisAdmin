const shippingMixins = {
  data () {
    return {
      shippingVuexBasePath: 'logic/shipping',
      shippingMethod: [
        { name: '海运', value: 'SEA' },
        { name: '空运', value: 'AIR' },
        { name: '陆运', value: 'LAND' }
      ],
      unitOfWeightOption: [
        { name: 'Kg', value: 'KG' },
        { name: 'g', value: 'G' }
      ],
      rules: {
        title: [v => !!v || '标题必须填写'],
        provider: [v => !!v || '物流承接供应商必须填写'],
        estimated_arrival_days: [
          v => !!v || '预估到达天数必须填写',
          (v) => {
            const arr = v.toString().split('.')
            if (arr[1]) {
              return '不可以存在小数'
            }
            return true
          }
        ],
        unit_of_weight: [v => !!v || '计重单位必须选中'],
        method: [v => !!v || '运输方式必须选中'],
        fixed_registration_fee: [
          v => !!v || '物流固定挂号费用必须填写',
          (v) => {
            if (parseFloat(v).toString() === 'NaN') {
              return '必须为数字'
            } else if (parseFloat(v) <= 0) {
              return '数字必须大于0'
            }
            return true
          }
        ],
        transport_cost_per_unit_weight: [
          v => !!v || '物流固定挂号费用必须填写',
          (v) => {
            if (parseFloat(v).toString() === 'NaN') {
              return '必须为数字'
            } else if (parseFloat(v) <= 0) {
              return '数字必须大于0'
            }
            return true
          }
        ]
      }
    }
  },
  computed: {
    shippingList () {
      return this.$store.getters[this.shippingVuexBasePath + '/shippingList']
    }
  },
  methods: {
    getShippingMethod (val) {
      if (!val) {
        return '-'
      }
      const data = this.shippingMethod.filter(item => item.value === val)
      return data.length > 0 ? data[0].name : '-'
    },
    loadShippingList (data) {
      this.$store.dispatch(this.shippingVuexBasePath + '/getShippingList', data)
    },
    createShipping (data) {
      return this.$store.dispatch(this.shippingVuexBasePath + '/createShipping', data)
    },
    updateShipping ({ data, shippingId }) {
      return this.$store.dispatch(this.shippingVuexBasePath + '/updateShipping', { data, shippingId })
    },
    deleteShipping ({ newShippingId, shippingId }) {
      return this.$store.dispatch(this.shippingVuexBasePath + '/deleteShipping', { newShippingId, shippingId })
    }
  }
}

export default shippingMixins
