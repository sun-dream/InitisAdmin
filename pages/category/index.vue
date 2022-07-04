<template>
  <categorys />
</template>
<script>
import categorys from '@/components/Category/Categorys'
import categoryMixins from '@/mixins/product/category'
export default {
  name: 'CategoryPage',
  components: {
    categorys
  },
  mixins: [categoryMixins],
  mounted () {
    this.getCategoryAllData()
  }
}
</script>
