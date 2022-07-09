<template>
  <div class="pt-4 text-center text-info">
    未检测出商品ID/Number!
  </div>
</template>
<script>
import breadcrumbMixins from '@/mixins/breadcrumb'
export default {
  name: 'ProductEditPage',
  components: {
  },
  mixins: [breadcrumbMixins],
  mounted () {
    this.initBread()
  },
  methods: {
    initBread (item) {
      this.breadcrumbs = [
        { text: '商品管理', cpnName: 'all-product' },
        { text: '商品编辑', cpnName: 'all-product-edit' }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
