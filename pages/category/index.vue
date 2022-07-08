<template>
  <categorys />
</template>
<script>
import categorys from '@/components/Category/Categorys'
import categoryMixins from '@/mixins/product/category'
import breadcrumbMixins from '@/mixins/breadcrumb'
export default {
  name: 'CategoryPage',
  components: {
    categorys
  },
  mixins: [categoryMixins, breadcrumbMixins],
  mounted () {
    this.getCategoryAllData()
    this.breadcrumbs = [{ text: '分类管理', cpnName: 'category' }]
  }
}
</script>
