<template>
  <el-container class="h-100">
    <left-menu />
    <el-container class="is-vertical">
      <the-header />
      <el-main>
        <v-bread-crumb />
        <nuxt />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import VBreadCrumb from '@/baseComponents/VBreadCrumb'
import LeftMenu from '@/components/MyApp/LeftMenu'
import TheHeader from '@/components/MyApp/TheHeader'
import myAppMixins from '@/mixins/myApp'
export default {
  name: 'DefaultLayout',
  components: {
    LeftMenu,
    theHeader: TheHeader,
    VBreadCrumb
  },
  mixins: [myAppMixins],
  data () {
    return {
      show: false,
      title: 'Initi - Admin'
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
</style>
