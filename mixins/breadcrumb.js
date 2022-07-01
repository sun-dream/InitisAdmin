const breadcrumbMixins = {
    data() {
        return {
            breadcrumbVuexBasePath: 'logic/breadcrumb',
        }
    },
    computed: {
        breadcrumbs:{
            get(){
                return this.$store.getters[this.breadcrumbVuexBasePath+'/breads']
            },
            set(val){
                this.$store.commit(this.breadcrumbVuexBasePath +'/UPDATA_BREADS',val)
            }
        }
    },
    methods: {

    }
}

export default breadcrumbMixins
