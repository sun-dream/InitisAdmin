<template>
  <all-products />
</template>
<script>
import AllProducts from '@/components/AllProducts'
import allProductMixins from '@/mixins/product/allProduct'
import breadcrumbMixins from '@/mixins/breadcrumb'
export default {
  name: 'AllProductPage',
  components: {
    AllProducts
  },
  mixins: [allProductMixins, breadcrumbMixins],
  mounted () {
    this.getProductAllData(this.productFilterForm)
    this.breadcrumbs = [{ text: '商品管理', cpnName: 'all-product' }]
  }
}
</script>
