<template>
  <el-container class="h-100">
    <left-menu />
    <el-container class="is-vertical">
      <the-header />
      <el-main>
        <nuxt />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// import VLoading from "../baseComponents/VLoading";
// import VNotification from "../baseComponents/VNotification";
import LeftMenu from '@/components/MyApp/LeftMenu'
import TheHeader from '@/components/MyApp/TheHeader'
import myAppMixins from '@/mixins/myApp'

export default {
  name: 'DefaultLayout',
  components: {
    LeftMenu,
    theHeader: TheHeader
    // VLoading,
    // VNotification
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
$adminHeaderHeight: 50px;
#theHeader {
  height:$adminHeaderHeight;
  width: 100%;
  z-index:5;
}
</style>
