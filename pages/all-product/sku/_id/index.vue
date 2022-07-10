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
  data () {
    return {
    }
  },
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
        { text: '商品管理', cpnName: 'all-product' },
        { text: 'Sku列表', cpnName: 'all-product-sku' }
      ]
      if (item.id) {
        arr.push({ text: 'productTitle' + item.title, cpnName: 'all-product-sku-id', params: { id: item.id } })
      }
      this.breadcrumbs = arr
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
