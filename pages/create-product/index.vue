<template>
  <create-product />
</template>
<script>
import CreateProduct from '@/components/CreateProduct/index'
import breadcrumbMixins from '@/mixins/breadcrumb'
export default {
  name: 'CreateProductPage',
  components: {
    CreateProduct
  },
  mixins: [breadcrumbMixins],
  data () {
    return {
    }
  },
  mounted () {
    this.breadcrumbs = [{ text: '创建商品', cpnName: 'create-product' }]
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
</style>
