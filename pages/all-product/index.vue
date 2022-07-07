<template>
  <all-products />
</template>
<script>
import AllProducts from '@/components/AllProducts'
import allProductMixins from '@/mixins/product/allProduct'
export default {
  name: 'AllProductPage',
  components: {
    AllProducts
  },
  mixins: [allProductMixins],
  mounted () {
    this.getProductAllData(this.productFilterForm)
  }
}
</script>
