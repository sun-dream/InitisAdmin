<template>
  <sku-create />
</template>
<script>
import SkuCreate from '@/components/Sku/create'
import breadcrumbMixins from '@/mixins/breadcrumb'
import allProductMixins from '@/mixins/product/allProduct'
export default {
  name: 'ProductSkuCreatePage',
  components: {
    SkuCreate
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
  mounted () {
    this.initBread(null)
  },
  methods: {
    initBread (item) {
      const arr = [
        { text: '商品管理', cpnName: 'all-product' },
        { text: 'Sku列表', cpnName: 'all-product-sku' }
      ]
      if (item && item.id) {
        arr.push({ text: 'productTitle' + item.title, cpnName: 'all-product-sku-id', params: { id: item.id } })
        arr.push({ text: '创建SKU', cpnName: 'all-product-sku-id-create', params: { id: item.id } })
      }
      this.breadcrumbs = arr
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
