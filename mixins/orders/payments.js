const paymentsMixins = {
    data() {
        return {
            paymentsVuexBasePath: 'logic/payments',
            paymentFilter:{
                payment_status:[],
                payment_order_number:'',
                payer_email_address:''
            }
        }
    },
    computed: {
        orderPayments() {
            return this.$store.getters[this.paymentsVuexBasePath + '/orderPayments']
        },
    },
    methods: {
        loadPaymentList(params = {}) {
            return this.$store.dispatch(this.paymentsVuexBasePath + '/getPaymentList', params)
        },
        updatePaymentPayOrder(params = {}) {
            return this.$store.dispatch(this.paymentsVuexBasePath + '/paymentPayOrder', params)
        },
       getPaymentOrder(params = {}) {
            return this.$store.dispatch(this.paymentsVuexBasePath + '/getPaymentOrders', params)
        },
        getTime(val) {
            if (val === "" || !this.isDef(val)) {
              return;
            }
            let d = val.split(".");
            let s = "";
            if (d[0].indexOf("T") > -1) {
              s = d[0].replace(/T/g, " ");
            }
            return s;
        },
    }
}

export default paymentsMixins
