<template>
  <edit-product />
</template>
<script>
import EditProduct from '@/components/EditProduct/index'
import breadcrumbMixins from '@/mixins/breadcrumb'
export default {
  name: 'ProductForIdPage',
  components: {
    EditProduct
  },
  mixins: [breadcrumbMixins],
  data () {
    return {
    }
  },
  mounted () {
    this.breadcrumbs = [
      { text: '商品管理', cpnName: 'all-product' },
      { text: '商品编辑', cpnName: 'all-product' }
    ]
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
</style>
