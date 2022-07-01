const userMixins = {
    data() {
        return {
        }
    },
    computed: {
       
    },
    methods: {
        checkingLoginStatus(){
            if (process.browser) {
                let token = localStorage.getItem('token')
                if(this.isDef(token)){
                    return true
                }
            }
            return false
        }
    }
}

export default userMixins
