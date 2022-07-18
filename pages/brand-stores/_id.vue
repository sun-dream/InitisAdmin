<template>
  <brand-stores-detail />
</template>
<script>
import BrandStoresDetail from '@/components/BrandStores/detail/index'
import breadcrumbMixins from '@/mixins/breadcrumb'
import brandStoresMixins from '@/mixins/brandStores'
export default {
  name: 'BrandStoresItemPage',
  components: {
    BrandStoresDetail
  },
  mixins: [brandStoresMixins, breadcrumbMixins],
  watch: {
    brandStoreItem (newData) {
      this.init()
    }
  },
  mounted () {
    this.loadBrandStoreItem(this.$route.params.id)
  },
  methods: {
    init () {
      this.breadcrumbs = [
        { text: 'Brand Store 列表', cpnName: 'brand-stores' },
        { text: 'Brand Store 详情', cpnName: 'brand-stores-id', params: { id: this.$route.params.id } },
        { text: this.brandStoreItem.name, cpnName: 'brand-stores-id', params: { id: this.$route.params.id } }
      ]
    }
  }
}
</script>
