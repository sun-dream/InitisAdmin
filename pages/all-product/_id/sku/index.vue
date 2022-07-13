<template>
  <sku-edit />
</template>
<script>
import SkuEdit from '@/components/Sku/edit'
import breadcrumbMixins from '@/mixins/breadcrumb'
import allProductMixins from '@/mixins/product/allProduct'
export default {
  name: 'ProductSkuPage',
  components: {
    SkuEdit
  },
  mixins: [breadcrumbMixins, allProductMixins],
  watch: {
    productItem: {
      deep: true,
      handler (newVal) {
        this.initBread(newVal)
      }
    }
  },
  methods: {
    initBread (item) {
      const arr = [
        { text: '商品管理', cpnName: 'all-product' }
      ]
      if (item.id) {
        arr.push({ text: 'Title：' + item.title, cpnName: 'all-product-id-sku', params: { id: item.id } })
        arr.push({ text: 'Sku列表', cpnName: 'all-product-id-sku', params: { id: item.id } })
      }
      this.breadcrumbs = arr
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
