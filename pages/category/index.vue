<template>
  <category />
</template>
<script>
import category from '@/components/Category/category'
import categoryMixins from '@/mixins/product/category'
export default {
  name: 'CategoryPage',
  components: {
    category
  },
  mixins: [categoryMixins],
  mounted () {
    this.getCategoryAllData()
  }
}
</script>
