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
  mounted () {
  },
  methods: {
    initBread (item) {
      const arr = [
        { text: '商品管理', cpnName: 'all-product' },
        { text: '商品编辑', cpnName: 'all-product-edit' }
      ]
      if (item.id) {
        arr.push({ text: item.title, cpnName: 'all-product-edit-id', params: { id: item.id } })
      }
      this.breadcrumbs = arr
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
