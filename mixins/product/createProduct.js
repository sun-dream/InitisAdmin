const createProductMixins = {
  data () {
    // 验证网址规则
    const checkSource = (rule, value, callback) => {
      /* eslint-disable */
      const reg =/(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/
      /* eslint-enable */
      if (reg.test(value)) {
        return callback()
      }
      callback(new Error('请输入正确的网址'))
    }
    return {
      createProductVuexBasePath: 'logic/product/',
      uploadFilesVuexBasePath: 'logic/uploadFiles/',
      stepperIndex: 1,
      createProductForm: {
        product_code: '',
        title: '',
        source_name: '',
        source_contact: '',
        source: '',
        category_id: null,
        status: 'ON_SALE',
        description: '',
        video1_id: null,
        image1_id: null,
        image2_id: null,
        image3_id: null,
        image4_id: null,
        image5_id: null
      },
      rules: {
        title: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
        product_code: [{ required: true, message: '商品编号不能为空', trigger: 'blur' }],
        status: [{ required: true, message: '商品状态为必选项', trigger: 'blur' }],
        category_id: [{ required: true, message: '商品类别为必选项', trigger: 'blur' }],
        source_name: [{ required: true, message: '厂名为必填项', trigger: 'blur' }],
        source_contact: [{ required: true, message: '厂家联系方式为必填项', trigger: 'blur' }],
        source: [
          { required: true, message: '厂家网址为必填项', trigger: 'blur' },
          { validator: checkSource, trigger: 'blur' }
        ]
      },
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
    initDefaultData () {
      this.createProductForm = {
        product_code: '12312321',
        title: '123',
        source_name: '123',
        source_contact: '123',
        source: 'http://www.baidu.com',
        category_id: 123,
        status: 'ON_SALE',
        description: '',
        video1_id: null,
        image1_id: null,
        image2_id: null,
        image3_id: null,
        image4_id: null,
        image5_id: null
      }
      this.stepperIndex = 1
    },
    createProduct (data) {
      this.$store.dispatch(this.createProductVuexBasePath + 'createdProduct', data)
        .then((resp) => {
          this.notification({
            title: '请求结果',
            message: '创建商品成功！将自动返回第一步！',
            type: 'success'
          })
          this.initDefaultData()
        })
    },
    uploadFiles ({ data, progressHandler = (progressEvent) => {} }) {
      return this.$store.dispatch(this.uploadFilesVuexBasePath + 'uploadFiles', { params: data, progressHandler })
    }
  }
}

export default createProductMixins
