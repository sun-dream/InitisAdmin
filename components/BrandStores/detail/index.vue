<template>
  <section v-if="brandStoreItem&&brandStoreItem.id" class="w-100 brand-store-detail-wrap">
    <brand-store-info :default-data="brandStoreItem" />
    <brand-store-file :default-data="brandStoreItem" />
    <brand-store-table :default-data="brandStoreItem" />
  </section>
  <div v-else class="d-flex justify-content-center text-info">
    未检测出数据
  </div>
</template>
<script>
// import brandStoreInfo from './brandStoreInfo.vue'
// import brandStoreFile from './brandStoreFile.vue'
// import brandStoreTable from './brandStoreTable.vue'
import brandStoresMixins from '@/mixins/brandStores'
export default {
  name: 'BrandStoreDetails',
  components: {
    // brandStoreInfo, brandStoreFile, brandStoreTable
  },
  mixins: [brandStoresMixins],
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>

</style>
