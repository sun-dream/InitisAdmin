const uploadOrderMixins = {
    data() {
        return {
            uploadOrderVuexBasePath: 'logic/uploadOrder',
            billingDetailsRules: {
                // shipping_last_name: [(v) => !!v || "LAST NAME is required"],
                // shipping_first_name: [(v) => !!v || "FRIST NAME is required"],
                // shipping_country: [(v) => !!v || "COUNTRY is required"],
                shipping_zip: [
                    // (v) => !!v || "POSTCODE is required",
                ],
                // shipping_province: [(v) => !!v || "PROVINCE is required"],
                // shipping_city: [(v) => !!v || "TOWN / CITY is required"],
                // shipping_street: [(v) => !!v || "STREET ADDRESS is required"],
                // shipping_address1: [(v) => !!v || "House number is required"],
                shipping_phone: [
                    // (v) => !!v || "PHONE is required",
                    (v) => {
                        if (/^[0-9\-]+$/.test(v)) {
                          return true
                        } else {
                          return "PHONE must be valid"
                        }
                    },
                ]
            }
        }
    },
    computed: {
        uploadOrdersData:{
            get(){
                return this.$store.getters[this.uploadOrderVuexBasePath + '/uploadOrdersData']
            },
            set(val){
                this.$store.commit(this.uploadOrderVuexBasePath + "/UPDATA_ORDERS_DATA",val);
            }
           
        },
        matchedItemOrders:{
            get(){
                return this.$store.getters[this.uploadOrderVuexBasePath + '/matchedItemOrders']
            },
            set(val){
                this.$store.commit(this.uploadOrderVuexBasePath + '/UPDATA_MATCHED_ITEM_ORDERS',val)
            }
            
        },
        unmatchedItemOrders:{
            get(){
                return this.$store.getters[this.uploadOrderVuexBasePath + '/unmatchedItemOrders']
            },
            set(val){
                this.$store.commit(this.uploadOrderVuexBasePath + '/UPDATA_UNMATCHED_ITEM_ORDERS',val)
            }
        }
    },
    methods: {
        getParentOrder(name,orders){
            let parents = orders.filter(item => {
              return item.name === name && item.order_status ==='paid'
            })
            return parents
        },
        uploadOrder(data){
           return this.$store.dispatch(this.uploadOrderVuexBasePath + '/uploadOrder',data)
        },
        uploadTemplate(data){
            return this.$store.dispatch(this.uploadOrderVuexBasePath + '/uploadTemplate',data)
         }
    }
}

export default uploadOrderMixins
