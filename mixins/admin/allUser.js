const ss ={}
const allUserMixins = {
    data() {
        return {
            allUserVuexBasePath: 'logic/admin/user',
            userFilter:{},
            search: '',
            editUserFormTitle:'',
            editUserForm: {
                "email": "",
                "is_active": true,
                "is_superuser": true,
                "full_name": "",
                "password": ""
            },
            rules: {
                full_name: [(v) => !!v || "name is required"],
                password: [
                  (v) => !!v || "password is required",
                  (v) => v.length <= 60 || "password must be less than 20 characters",
                ],
                email: [
                  (v) => !!v || "E-mail is required",
                  (v) => {
                    if (/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(v)) {
                      return true
                    } else {
                      return "E-mail must be valid"
                    }
                  },
                ],
                verificationCode: [
                  (v) => !!v || "Verification Code is required",
                  (v) => v.length !== 5 || "The verification code must be six digits"
                ],
                againPassword: [(v) => !!v || "Again Password Code Is Required"]
            }
        }
    },
    computed: {
        allUserData() {
            return this.$store.getters[this.allUserVuexBasePath + '/allUserData']
        }
    },
    methods: {
        loadAllUserData() {
            this.$store.dispatch(this.allUserVuexBasePath + '/fetchAllUserData',this.userFilter)
        },
        createUser(data) {
           return this.$store.dispatch(this.allUserVuexBasePath + '/createUser', data)
        }
    },
    beforeDestroy() {
    }
}

export default allUserMixins
