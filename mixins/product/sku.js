const skuofProductMixins = {
  data () {
    return {
      skuVuexBasePath: 'logic/product/sku/',
      uploadFilesVuexBasePath: 'logic/uploadFiles/',
      stepperIndex: 1,
      skuOfProductForm: {
        sku_code: '',
        title: '',
        status: 'ACTIVE',
        weight: 0,
        unit_of_weight: 'G',
        unit_of_length: 'MM',
        length: 0,
        width: 0,
        height: 0,
        image1_id: null,
        image2_id: null,
        image3_id: null,
        image4_id: null,
        image5_id: null,
        purchase_price: 0,
        sample_price: 0,
        cost_price: 0,
        base_price: 0,
        currency: 'AED',

        base_profit: 0,
        product_id: ''
      },
      rules: {
        title: [{ required: true, message: 'SKU名称不能为空', trigger: 'blur' }],
        sku_code: [{ required: true, message: 'SKU编号不能为空', trigger: 'blur' }],
        status: [{ required: true, message: 'SKU状态为必选项', trigger: 'blur' }],
        weight: [{ required: true, type: 'number', min: 0.1, max: 99999999, message: '重量为必填项,并且不可为0', trigger: 'blur' }],
        unit_of_weight: [{ required: true, message: '重量单位为必选项', trigger: 'blur' }],
        length: [{ required: true, type: 'number', min: 0.1, max: 99999999, message: '长度为必填项,并且不可为0', trigger: 'blur' }],
        width: [{ required: true, type: 'number', min: 0.1, max: 99999999, message: '宽度为必填项,并且不可为0', trigger: 'blur' }],
        height: [{ required: true, type: 'number', min: 0.1, max: 99999999, message: '高度为必填项,并且不可为0', trigger: 'blur' }],
        unit_of_length: [{ required: true, message: '长量单位为选填项', trigger: 'blur' }],
        purchase_price: [{ required: true, type: 'number', min: 0.1, max: 99999999, message: '采购价格为必填项,并且不可为0', trigger: 'blur' }],
        sample_price: [{ required: true, type: 'number', min: 0.1, max: 99999999, message: '样品价格为必填项,并且不可为0', trigger: 'blur' }],
        cost_price: [{ required: true, type: 'number', min: 0.1, max: 99999999, message: '成本价为必填项,并且不可为0', trigger: 'blur' }],
        base_price: [{ required: true, type: 'number', min: 0.1, max: 99999999, message: '基本价格为必填项,并且不可为0', trigger: 'blur' }],
        base_profit: [{ required: true, type: 'number', min: 0.1, max: 99999999, message: '基本利润为必填项,并且不可为0', trigger: 'blur' }],
        currency: [{ required: true, message: '货币为必选填项', trigger: 'blur' }]

      },
      skuStatusArray: [
        { name: '开启', value: 'ACTIVE' },
        { name: '关闭', value: 'INACTIVE' }
      ],
      unitOfWeightArray: [
        { name: '克', value: 'G' },
        { name: '千克', value: 'KG' }
      ],
      unitOfLengthArray: [
        { name: '毫米', value: 'MM' },
        { name: '厘米', value: 'CM' }
      ],
      stepStatusEnum: {
        skuInfo: 'skuInfo',
        skuPrice: 'skuPrice',
        skuImage: 'skuImage'
      },
      maxNumOfPicUpload: 5,
      skus: [],
      loadings: []

    }
  },
  computed: {

  },
  methods: {
    initDefaultData () {
      this.skuOfProductForm = {
        sku_code: '',
        title: '',
        weight: null,
        unit_of_weight: 'G',
        unit_of_length: 'MM',
        status: 'ACTIVE',
        length: null,
        width: null,
        height: null,
        currency: 'AED',
        purchase_price: null,
        sample_price: null,
        cost_price: null,
        base_price: null,
        base_profit: null,
        product_id: '',
        image1_id: null,
        image2_id: null,
        image3_id: null,
        image4_id: null,
        image5_id: null
      }
      this.stepperIndex = 1
    },
    initUpdateParams ({ key, value, data }) {
      const params = { ...data, [key]: value }
      const id = params.id
      delete params.base_profit
      delete params.product_id
      delete params.id
      delete params.update_at
      delete params.create_at
      for (let i = 0; i < this.maxNumOfPicUpload; i++) {
        if (params[`image${i + 1}`]) {
          delete params[`image${i + 1}`]
        }
      }
      return { params, id }
    },
    createSku ({ data, id }) {
      this.$store.dispatch(this.skuVuexBasePath + 'createdSku', data)
        .then((resp) => {
          this.notification({
            title: '请求结果',
            message: '创建Sku成功！将自动返回sku列表！',
            type: 'success'
          })
          this.jumpTo({
            name: 'all-product-sku-id',
            params: { id }
          })
        })
    },
    updateSku ({ params, skuId }) {
      return this.$store.dispatch(this.skuVuexBasePath + 'updateSku', { params, skuId })
    },
    uploadFiles ({ data, progressHandler = (progressEvent) => {} }) {
      return this.$store.dispatch(this.uploadFilesVuexBasePath + 'uploadFiles', { params: data, progressHandler })
    }
  }
}

export default skuofProductMixins
