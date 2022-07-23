const publicUseMixins = {
  data () {
    return {
      productStatusArray: [
        { name: '在售', value: 'ON_SALE' },
        { name: '存档', value: 'ARCHIVED' },
        { name: '删除', value: 'DELETED' },
        { name: '草稿', value: 'DRAFT' }
      ],
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
        TWD : 'NT$', THB : '฿', TTD : 'TT$', TRY : '₺', TVD : '$', UAH : '₴', AED : 'AED', GBP : '&pound;', USD : '$', UYU : '$U',
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
    // productStatus
    getStatus (val) {
      if (!val) {
        return
      }
      let statusIndex = 0
      for (let index = 0; index < this.productStatusArray.length; index++) {
        if (this.productStatusArray[index].value === val) {
          statusIndex = index
          break
        }
      }
      return this.productStatusArray[statusIndex].name
    },
    getCurrencySymbols (val) {
      if (!val) {
        return '-'
      }
      return this.currencySymbol[val]
    }
  }
}

export default publicUseMixins
