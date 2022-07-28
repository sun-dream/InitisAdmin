<template>
  <el-container class="h-100">
    <!-- <el-header>Header</el-header> -->
    <el-main id="centerOnlyLayout" class="h-100 p-0">
      <nuxt />
    </el-main>
  </el-container>
  <!-- <v-app> -->
  <!-- <v-snackbars /> -->
  <!-- <v-notification /> -->
  <!-- </v-app> -->
</template>

<script>
// import VFooters from "../baseComponents/VFooters";
export default {
  components: {
    // theVFooter: VFooters,
  },
  data () {
    return {}
  },
  mounted () {
    this.updateBodyClass(false)
  },
  beforeDestroy () {
    this.updateBodyClass(true)
  },
  methods: {
    updateBodyClass (removeClass) {
      const body = document.body
      const html = document.documentElement
      const nuxtWrapper = document.getElementById('__nuxt')
      const layoutWrapper = document.getElementById('__layout')
      if (removeClass) {
        html.classList.remove('h-100')
        body.classList.remove('h-100')
        nuxtWrapper.classList.remove('h-100')
        layoutWrapper.classList.remove('h-100')
      } else {
        html.classList.add('h-100')
        body.classList.add('h-100')
        nuxtWrapper.classList.add('h-100')
        layoutWrapper.classList.add('h-100')
      }
    }
  }
}
</script>

<style scoped>
#centerOnlyLayout {
  position: relative;
  background-color: #fff;
}
/* .all-modals {
  z-index: 10000;
  position: relative;
}
.footer-icp {
  position: fixed;
  bottom: 0;
  z-index: 2;
  height: 60px;
} */
</style>
