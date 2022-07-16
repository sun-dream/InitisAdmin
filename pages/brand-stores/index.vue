<template>
  <brand-stores />
</template>

<script>
import BrandStores from '@/components/BrandStores'
import breadcrumbMixins from '@/mixins/breadcrumb'
import brandStoresMixins from '@/mixins/brandStores'
export default {
  name: 'BrandStoresPage',
  components: {
    BrandStores
  },
  mixins: [brandStoresMixins, breadcrumbMixins],
  mounted () {
    this.breadcrumbs = [{ text: 'Brand Store 列表', cpnName: 'brand-stores' }]
    this.getBrandStoresData()
  }
}
</script>
