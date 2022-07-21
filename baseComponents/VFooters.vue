<template>
  <!-- <v-footer v-if="userView" class="footer-wrap">
    <v-container class="p-0 footer-container-wrap pb-4 pt-2">
      <div class="d-flex justify-content-center">
        <v-logo dark :size="22"></v-logo>
      </div>
      <div class="d-flex justify-content-center slogan-wrapper">
        <div class="slogan">Dropshipping for Video Creators</div>
      </div>
      <div class="d-flex justify-center blogrolls-wrap mt-2 mb-8">
        <nuxt-link :to="{ name: 'support' }" class="mx-3">Support</nuxt-link>
        <nuxt-link :to="{ name: 'about-us' }" class="mx-3">About us</nuxt-link>
        <nuxt-link :to="{ name: 'privacy-policy' }" class="mx-3">Privacy Policy</nuxt-link>
      </div>
      <div class="d-flex justify-center copyright">
        <p class="mb-0">
          Copyright &#169; 2020- {{ getYear() }}  Initidrop.com All Rights
          Reserved.
        </p>
      </div>
    </v-container>
  </v-footer>
  <section v-else
    class="
      the-v-footer
      d-flex
      align-items-center
      w-100
      flex-md-row
    "
  >
    <div>
      <span class="mr-1">
        Copyright &#169; 2020- {{ getYear() }}  Initidrop.com All Rights
        Reserved.</span><n-link class="footer-link"
                                :to="'/support'"
                                rel="nofollow"
                                target="_blank"
    >
      Support
    </n-link>
    </div>
  </section> -->
  </div>
</template>

<script>
// import VLogo from "@/baseComponents/VLogo";
// import VSlogan from "@/baseComponents/VSlogan";
export default {
  name: 'VFooters',
  components: {
    //  VSlogan,
    // VLogo
  },
  props: {
    userView: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  methods: {
    getYear () {
      const nowDate = new Date()
      const date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate()
      }
      // '-' + 0 + date.month + '-' + 0 + date.date;
      return date.year
    }
  }
}
</script>
<style  scoped>
.footer-wrap {
  border-top: 1px solid #f2f2f2;
  background-color: white !important;
}
.the-v-footer,
.footer-container-wrap {
  font-size: 12px;
}

.slogan {
  color: #666666;
  font-size: 16px;
}
.slogan {
  margin-bottom: 10px;
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 10px;
}
.blogrolls-wrap {
  font-size: 14px;
}
.slogan a {
    text-decoration: none;
    color: #666666;
  }
 .slogan span {
    margin: 0 30px;
    font-size: 12px;
    color: #ccc;
  }
.support-address img{
    display: inline-block;
    margin-right: 20px;
    width: 80px;
}
.support-address img:last-child{
      margin-right: 0;
}
.copyright {
  color: #999999;
}
.the-v-footer{
  background-color: #f6f6f9;
  height: 72px;
  padding-left: 32px;
}
</style>
