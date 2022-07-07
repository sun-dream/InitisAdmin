const createProductMixins = {
  data () {
    return {
      createProductVuexBasePath: 'logic/product/',
      uploadFilesVuexBasePath: 'logic/uploadFiles/',
      stepperIndex: 1,
      createProductForm: {
        product_code: '12321',
        title: '测试i',
        source_name: '测试2',
        source_contact: '测试3',
        source: '测试4',
        category_id: null,
        status: 'ON_SALE',
        description: '',
        video1_id: '',
        image1_id: '',
        image2_id: '',
        image3_id: '',
        image4_id: '',
        image5_id: ''
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
      storageName: '',
      stepStatusEnum: {
        productInfo: 'productInfo',
        uploadFiles: 'uploadFiles',
        description: 'description'
      },
      maxNumOfPicUpload: 5,
      uploadFileCache: {
        images: [],
        videos: []
      }
    }
  },
  computed: {
  },
  methods: {
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
    uploadFiles ({ data, progressHandler = (progressEvent) => {} }) {
      return this.$store.dispatch(this.uploadFilesVuexBasePath + 'uploadFiles', { params: data, progressHandler })
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
