const skuofProductMixins = {
  data () {
    return {
      skuVuexBasePath: 'logic/product/sku/',
      uploadFilesVuexBasePath: 'logic/uploadFiles/',
      stepperIndex: 1,
      skuOfProductForm: {
        sku_code: '',
        title: '',
        weight: 0,
        unit_of_weight: 'G',
        unit_of_length: 'MM',
        status: 'ON_SALE',
        length: 0,
        width: 0,
        height: 0,
        currency: 'AED',
        purchase_price: 0,
        sample_price: 0,
        cost_price: 0,
        base_price: 0,
        base_profit: 0,
        product_id: '',
        image1_id: null,
        image2_id: null,
        image3_id: null,
        image4_id: null,
        image5_id: null
      },
      rules: {
        title: [{ required: true, message: 'SKU名称不能为空', trigger: 'blur' }],
        sku_code: [{ required: true, message: 'SKU编号不能为空', trigger: 'blur' }],
        status: [{ required: true, message: 'SKU状态为必选项', trigger: 'blur' }],
        weight: [{ required: true, message: '重量为必填项', trigger: 'blur' }],
        unit_of_weight: [{ required: true, message: '重量单位为必选项', trigger: 'blur' }],
        length: [{ required: true, message: '长度为必填项', trigger: 'blur' }],
        width: [{ required: true, message: '宽度为必填项', trigger: 'blur' }],
        height: [{ required: true, message: '高度为必填项', trigger: 'blur' }],
        unit_of_length: [{ required: true, message: '长量单位为选填项', trigger: 'blur' }],
        purchase_price: [{ required: true, message: '采购价格为必填项', trigger: 'blur' }],
        sample_price: [{ required: true, message: '样品价格为必填项', trigger: 'blur' }],
        cost_price: [{ required: true, message: '成本价为必填项', trigger: 'blur' }],
        base_price: [{ required: true, message: '基本价格为必填项', trigger: 'blur' }],
        base_profit: [{ required: true, message: '基本利润为必填项', trigger: 'blur' }],
        currency: [{ required: true, message: '货币为必选填项', trigger: 'blur' }]

      },
      statusArray: [
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
      uploadFileCache: {
        images: []
      },
      skus: [],
      skusImages: [],
      /* eslint-disable */
      currencyCodes: {
        CNY : 'CNY',USD : 'USD',EUR : 'EUR',AED : 'AED',AFN : 'AFN',ALL : 'ALL',AMD : 'AMD',ANG : 'ANG',AOA : 'AOA',
        ARS : 'ARS',AUD : 'AUD',AWG : 'AWG',AZN : 'AZN',BAM : 'BAM',BBD : 'BBD',BDT : 'BDT',BGN : 'BGN',BHD : 'BHD',
        BIF : 'BIF',BMD : 'BMD',BND : 'BND',BOB : 'BOB',BRL : 'BRL',BSD : 'BSD',BTN : 'BTN',BWP : 'BWP',BYN : 'BYN',
        BYR : 'BYR',BZD : 'BZD',CAD : 'CAD',CDF : 'CDF',CHF : 'CHF',CLP : 'CLP',CNH : 'CNH',COP : 'COP',CRC : 'CRC',
        CUC : 'CUC',CUP : 'CUP',CVE : 'CVE',CYP : 'CYP',CZK : 'CZK',DJF : 'DJF',DKK : 'DKK',DOP : 'DOP',DZD : 'DZD',
        EEK : 'EEK',EGP : 'EGP',ERN : 'ERN',ETB : 'ETB', FJD : 'FJD',FKP : 'FKP',GBP : 'GBP',GEL : 'GEL',GGP : 'GGP',
        GHS : 'GHS',GIP : 'GIP',GMD : 'GMD',GNF : 'GNF',GTQ : 'GTQ',GYD : 'GYD',HKD : 'HKD',HNL : 'HNL',HRK : 'HRK',
        HTG : 'HTG',HUF : 'HUF',IDR : 'IDR',ILS : 'ILS',IMP : 'IMP',INR : 'INR',IQD : 'IQD',IRR : 'IRR',ISK : 'ISK',
        JEP : 'JEP',JMD : 'JMD',JOD : 'JOD',JPY : 'JPY',KES : 'KES',KGS : 'KGS',KHR : 'KHR',KMF : 'KMF',KPW : 'KPW',
        KRW : 'KRW',KWD : 'KWD',KYD : 'KYD',KZT : 'KZT',LAK : 'LAK',LBP : 'LBP',LKR : 'LKR',LRD : 'LRD',LSL : 'LSL',
        LTL : 'LTL',LVL : 'LVL',LYD : 'LYD',MAD : 'MAD',MDL : 'MDL',MGA : 'MGA',MKD : 'MKD',MMK : 'MMK',MNT : 'MNT',
        MOP : 'MOP',MRO : 'MRO',MRU : 'MRU',MTL : 'MTL',MUR : 'MUR',MVR : 'MVR',MWK : 'MWK',MXN : 'MXN',MXV : 'MXV',
        MYR : 'MYR',MZN : 'MZN',NAD : 'NAD',NGN : 'NGN',NIO : 'NIO',NOK : 'NOK',NPR : 'NPR',NTD : 'NTD',NZD : 'NZD',
        OMR : 'OMR',PAB : 'PAB',PEN : 'PEN',PGK : 'PGK',PHP : 'PHP',PKR : 'PKR',PLN : 'PLN',PYG : 'PYG',QAR : 'QAR',
        RON : 'RON',RSD : 'RSD',RUB : 'RUB',RWF : 'RWF',SAR : 'SAR',SBD : 'SBD',SCR : 'SCR',SDG : 'SDG',SEK : 'SEK',
        SGD : 'SGD',SHP : 'SHP',SIT : 'SIT',SKK : 'SKK',SLL : 'SLL',SOS : 'SOS',SPL : 'SPL',SRD : 'SRD',STD : 'STD',
        STN : 'STN', SVC : 'SVC',SYP : 'SYP',SZL : 'SZL',THB : 'THB',TJS : 'TJS',TMM : 'TMM',TMT : 'TMT',TND : 'TND',
        TOP : 'TOP',TRY : 'TRY',TTD : 'TTD',TVD : 'TVD',TWD : 'TWD',TZS : 'TZS',UAH : 'UAH',UGX : 'UGX', UYU : 'UYU',
        UZS : 'UZS',VEB : 'VEB',VED : 'VED',VEF : 'VEF',VES : 'VES',VND : 'VND',VUV : 'VUV',WST : 'WST',XAF : 'XAF',
        XAG : 'XAG',XAU : 'XAU',XBT : 'XBT',XCD : 'XCD',XDR : 'XDR',XOF : 'XOF',XPD : 'XPD',XPF : 'XPF',XPT : 'XPT',
        YER : 'YER',ZAR : 'ZAR',ZMK : 'ZMK',ZMW : 'ZMW',ZWD : 'ZWD'
      },
      /* eslint-enable */
      /* eslint-disable */
      currencySymbol:{//货币符号
        ALL : 'Lek', AFN : '؋', ARS : '$', AWG : '&fnof;', AUD : '$', AZN : '₼', BSD : '$', BBD : '$',
        BYN : 'Br', BZD : 'BZ$', BMD : '$', BOB : '$b', BAM : 'KM', BWP : 'P', BGN : 'лв', BRL : 'R$',
        BND : '$', KHR : '៛', CAD : '$', KYD : '$', CLP : '$', CNY : '￥', COP : '$', CRC : '₡',
        HRK : 'kn', CUP:'₱',	CZK:'Kč',	DKK:'kr',	DOP:'RD$',	XCD:'$',	EGP:'&pound; ',	SVC:'$',	
        EUR : '€', FKP : '&pound;', FJD : '$', GHS : '&cent;', GIP : '&pound;', GTQ : 'Q', GGP : '&pound;',
        GYD : '$', HNL : 'L', HKD : '$', HUF : 'Ft', ISK : 'kr', INR : '₹', IDR : 'Rp', IRR : '﷼', IMP : '&pound;',
        ILS : '₪', JMD : 'J$', JPY : '&yen;', JEP : '&pound;', KZT : 'лв', KPW : '₩', KGS : 'лв', LAK : '₭',
        LBP : '&pound;', LRD : '$', MKD : 'ден', MYR : 'RM', MUR : '₨', MXN : '$', MNT : '₮',  MZN : 'MT', NAD : '$',
        NPR : '₨', ANG : '&fnof;', NZD : '$', NIO : 'C$', NGN : '₦', NOK : 'kr', OMR : '﷼', PKR : '₨', PAB : 'B/.', PYG : 'Gs',
        PEN : 'S/.', PHP : '₱', PLN : 'zł', QAR : '﷼', RON : 'lei', RUB : '₽', SHP : '&pound;', SAR : '﷼', RSD : 'Дин.', SCR : '₨',
        SGD : '$', SBD : '$', SOS : 'S', KRW : '₩', ZAR : 'R', LKR : '₨', SEK : 'kr', CHF : 'CHF', SRD : '$', SYP : '&pound;',
        TWD : 'NT$', THB : '฿', TTD : 'TT$', TRY : '₺', TVD : '$', UAH : '₴', AED : '&nbsp;د.إ', GBP : '&pound;', USD : '$', UYU : '$U',
        UZS : 'лв', VEF : 'Bs', VND : '₫', YER : '﷼', ZWD : 'Z$'
      }
       /* eslint-enable */
    }
  },
  computed: {
    currencysOption () {
      const arr = []
      Object.keys(this.currencyCodes).forEach((key) => {
        arr.push({
          name: this.currencyCodes[key],
          value: this.currencyCodes[key]
        })
      })
      return arr
    }
  },
  methods: {
    initDefaultData () {
      this.uploadFileCache = {
        images: []
      }
      this.skuOfProductForm = {
        sku_code: '234',
        title: '测试',
        weight: 1,
        unit_of_weight: 'G',
        unit_of_length: 'MM',
        status: 'ACTIVE',
        length: 1,
        width: 1,
        height: 1,
        currency: 'AED',
        purchase_price: 1,
        sample_price: 1,
        cost_price: 1,
        base_price: 1,
        base_profit: 1,
        product_id: '',
        image1_id: null,
        image2_id: null,
        image3_id: null,
        image4_id: null,
        image5_id: null
      }
      this.stepperIndex = 1
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
    uploadFiles ({ data, progressHandler = (progressEvent) => {} }) {
      return this.$store.dispatch(this.uploadFilesVuexBasePath + 'uploadFiles', { params: data, progressHandler })
    }
  }
}

export default skuofProductMixins
