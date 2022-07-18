<template>
  <section class="w-100 brand-store-detail-wrap">
    <brand-store-info :default-data="brandStoreItem" />
    <brand-store-file :default-data="brandStoreItem" />
    <brand-store-table :default-data="brandStoreItem" />
  </section>
</template>
<script>
import brandStoreInfo from './brandStoreInfo.vue'
import brandStoreFile from './brandStoreFile.vue'
import brandStoreTable from './brandStoreTable.vue'
import brandStoresMixins from '@/mixins/brandStores'
import * as mUtils from '@/assets/utils/mUtils'
export default {
  name: 'BrandStoreDetails',
  components: {
    //  VImage, VLink
    brandStoreInfo, brandStoreFile, brandStoreTable
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
