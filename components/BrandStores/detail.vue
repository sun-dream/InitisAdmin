<template>
  <section class="w-100 brand-store-detail-wrap">
    <item-title text="基本信息" />
    <item-title text="贴纸图和背景图" />
    <item-title text="商品列表" />
  </section>
</template>
<script>
import ItemTitle from './itemTitle.vue'
import brandStoresMixins from '@/mixins/brandStores'
// import VImage from '@/baseComponents/VImage'
// import VLink from '@/baseComponents/VLink'
import * as mUtils from '@/assets/utils/mUtils'
export default {
  name: 'BrandStoreDetails',
  components: {
    //  VImage, VLink
    ItemTitle
  },
  mixins: [brandStoresMixins],
  data () {
    return {
    }
  },
  computed: {
    getDate (val) {
      return function (val) {
        return mUtils.formatDate(val, 3)
      }
    }
  },
  mounted () {
  },
  methods: {
    getBrandStoreImageSrc ({ data, key }) {

    }

  }
}
</script>
<style lang="scss" scoped>

</style>
