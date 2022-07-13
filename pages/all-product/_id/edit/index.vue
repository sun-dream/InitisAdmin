<template>
  <edit-product />
</template>
<script>
import EditProduct from '@/components/EditProduct/index'
import breadcrumbMixins from '@/mixins/breadcrumb'
import allProductMixins from '@/mixins/product/allProduct'
export default {
  name: 'ProductEditPage',
  components: {
    EditProduct
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
        arr.push({ text: 'Title:' + item.title, cpnName: 'all-product-id-edit', params: { id: item.id } })
        arr.push({ text: '商品编辑', cpnName: 'all-product-id-edit', params: { id: item.id } })
      }
      this.breadcrumbs = arr
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
