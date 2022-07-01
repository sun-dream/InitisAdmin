const chechoutMixins = {
    data() {
        return {
            // productVuexBasePath: 'logic/product',
            checkoutForm:{
                "order_number": null, //订单号  -
                "payment_method": null,//支付方式 +
                "shipping_first_name": "",//收货人姓名 +
                "shipping_last_name": "",//收货人姓名 +
                "shipping_street": "",//送货街道 +
                "shipping_address1": "",//送货地址1 ?
                "shipping_address2": "",//送货地址2 ?
                "shipping_company": "",//送货公司名称+
                "shipping_city": "",//送货城市+
                "shipping_zip": "",//送货邮编+
                "shipping_province": "",//送货省份+
                "shipping_country": "",//送货国家+
                "shipping_phone": "",//收货人电话+

                "billing_first_name": "",//收货人姓名 +
                "billing_last_name": "",//收货人姓名 +
                "billing_street": "",//送货街道 +
                "billing_address1": "",//送货地址1 ?
                "billing_address2": "",//送货地址2 ?
                "billing_company": "",//送货公司名称+
                "billing_city": "",//送货城市+
                "billing_zip": "",//送货邮编+
                "billing_province": "",//送货省份+
                "billing_country": "",//送货国家+
                "billing_phone": "",//收货人电话+

                "notes": "",//备注+
                "is_need_shipping": true,//是否需要发货
                "details": []//订单号
            },
            orderDetailItem:{
              sku_number:'string',//商品SKU -> number
                quantity:'number',//数量
            },
            checkoutRules: {
                shipping_last_name: [(v) => !!v || "LAST NAME is required"],
                shipping_first_name: [(v) => !!v || "FIRST NAME is required"],
                shipping_country: [(v) => !!v || "COUNTRY is required"],
                shipping_zip: [
                    (v) => !!v || "POSTCODE is required",
                    (v) => {
                        if (v && v.length > 0) {
                          return true
                        } else {
                          return "POSTCODE / ZIP must be valid"
                        }
                    },
                ],
                shipping_province: [(v) => true],
                shipping_city: [(v) => !!v || "TOWN / CITY is required"],
                shipping_street: [(v) => !!v || "STREET ADDRESS is required"],
                shipping_address1: [(v) => !!v || "House number is required"],
                shipping_phone: [
                    (v) => !!v || "PHONE is required",
                    (v) => {
                        if (/^[0-9\-]+$/.test(v)) {
                          return true
                        } else {
                          return "PHONE must be valid"
                        }
                    },
                ],
                shipping_mail: [
                    (v) => !!v || "EMAIL ADDRESS is required",
                    (v) => {
                        if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v)) {
                          return true
                        } else {
                          return "EMAIL must be valid"
                        }
                    },
                ],
            }
        }
    },
    computed: {

    },
    methods: {

    }
}

export default chechoutMixins
