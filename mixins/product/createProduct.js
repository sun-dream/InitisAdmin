const createProductMixins = {
  data () {
    return {
      stepperIndex: 0,
      stepperTotal: 4,
      createProductVuexBasePath: 'logic/product/',
      uploadFilesVuexBasePath: 'logic/uploadFiles/',
      createProductForm: {
        product_code: '',
        title: '',
        source_name: '',
        source_contact: '',
        source: '',
        category_id: null,
        status: 'ON_SALE',
        detail: {
          sort_description: '',
          description: ''
        },
        skus: [],
        cover_img: '',
        sample_videos: [],
        images: []

      },
      currencyArray: [
        { name: '人民币', value: 'CNY' },
        { name: '美元', value: 'USD' },
        { name: '欧元', value: 'EUR' }
      ],
      unitOfWeightOption: [
        { name: 'g', value: 'G' },
        { name: 'Kg', value: 'KG' }
      ],
      unitOfLengthOption: [
        { name: 'mm', value: 'MM' },
        { name: 'cm', value: 'CM' }
      ],
      createProductSkuForm: {
        number: null,
        title: '',
        // "purchase_price": null,
        // "cost_price": null,
        // "recommend_retail_price": null,
        price_currency: 'USD',
        images: [],
        // "estimated_logistics_cost": null,
        uploadImages: [], // 服务端返回图片对象
        uploadImagesValue: [], // 上传图片暂存
        skuNumberState: {
          success: '',
          error: ''
        },
        unit_of_weight: 'G',
        unit_of_length: 'CM'
      },
      rules: {
        title: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
        product_code: [{ required: true, message: '商品编号不能为空', trigger: 'blur' }],
        status: [{ required: true, message: '商品状态为必选项', trigger: 'blur' }],
        category_id: [{ required: true, message: '商品类别为必选项', trigger: 'blur' }],
        source_name: [{ required: true, message: '厂名为必填项', trigger: 'blur' }],
        source_contact: [{ required: true, message: '厂家联系方式为必填项', trigger: 'blur' }],
        source: [{ required: true, message: '厂家网址为必填项', trigger: 'blur' }]
      },
      storageName: ''
    }
  },
  computed: {
  },
  methods: {
    getUnitOfWeight (val) {
      if (!val) {
        return 'g'
      }
      const unit = this.unitOfWeightOption.filter(item => item.value === val)
      return unit.length > 0 ? unit[0].name : 'g'
    },
    getUnitOfLength (val) {
      if (!val) {
        return 'cm'
      }
      const unit = this.unitOfLengthOption.filter(item => item.value === val)
      return unit.length > 0 ? unit[0].name : 'cm'
    },
    createProduct (data) {
      this.$store.dispatch(this.createProductVuexBasePath + 'createdProduct', data)
        .then((resp) => {
          this.notification({
            title: '请求结果',
            message: '<h4>创建商品成功！</div>',
            type: 'success'
          })
          this.notification({
            title: '请求结果',
            message: '<h4>将自动返回第一步！</div>',
            type: 'success'
          })
          this.stepperIndex = 1
        })
        .catch((error) => {
          this.notification({
            title: '请求结果',
            message: `<h4>创建商品失败！${error}</div>`,
            type: 'error'
          })
        })
    },
    uploadFiles (data) {
      return this.$store.dispatch(this.uploadFilesVuexBasePath + 'uploadFiles', data)
    },
    archivesSet (val) {
      localStorage.setItem(this.storageName, JSON.stringify(val))
    },
    archivesGet () {
      return JSON.parse(localStorage.getItem(this.storageName))
    },
    archivesRemove () {
      return localStorage.removeItem(this.storageName)
    },
    checkSkuNumber (skuNumber) {
      return this.$store.dispatch(this.createProductVuexBasePath + 'checkSkuNumber', skuNumber)
    },
    calculateCalcCost (params) {
      return this.$store.dispatch(this.createProductVuexBasePath + 'calculateCalcCost', params)
    }
  }
}

export default createProductMixins
// skuTitle: [v => !!v || 'sku名称 is required'],
// skuNumber: [
//   (v) => {
//     if (v && v.toString().length > 20) {
//       return '不可超出20个字符的限制'
//     }
//     return true
//   },
//   (v) => {
//     const reg = /^[0-9]*$/
//     if (v === '' || v === null) {
//       return true
//     } else if (!reg.test(v)) {
//       return '请输入数字'
//     }
//     return true
//   }
// ],
// skuPrice: [
//   v => !!v || '当前为必填项',
//   (v) => {
//     const reg = /^[0-9]*$/
//     if (!reg.test(v)) {
//       return '请输入数字'
//     }
//     return true
//   },
//   (v) => {
//     if (parseFloat(v) === 0) {
//       return '价格不能为0'
//     }
//     return true
//   }
// ],
// skuPriceCurrency: [v => !!v || '当前为必选项'],
// sampleShippingId: [v => !!v || '当前为必选项'],
// maxSinglePurchaseCount: [v => !!v || '当前为必选项'],
// numberVal: [
//   (v) => {
//     if (parseFloat(v).toString() === 'NaN') {
//       return '请输入数字！！！'
//     } else if (parseFloat(v) <= 0) {
//       return '数字不可小于0'
//     }
//     return true
//   }
// ],
// weighting: [
//   (v) => {
//     if (parseFloat(v).toString() === 'NaN') {
//       return '请输入数字！！！'
//     } else if (parseFloat(v) > 1000) {
//       return '数字不可大于1000'
//     }
//     return true
//   }
// ],
// weighting_show_sales: [
//   (v) => {
//     if (parseFloat(v).toString() === 'NaN') {
//       return '请输入数字！！！'
//     }
//     return true
//   }
// ],
// requiredText: [
//   v => !!v || '不可为空！'
// ]
