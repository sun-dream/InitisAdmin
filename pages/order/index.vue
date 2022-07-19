<template>
  <order />
</template>
<script>
import Order from '@/components/Order'
import breadcrumbMixins from '@/mixins/breadcrumb'
import ordersMixins from '@/mixins/orders'
export default {
  name: 'OrdertPage',
  components: {
    Order
  },
  mixins: [breadcrumbMixins, ordersMixins],
  data () {
    return {
    }
  },
  mounted () {
    this.breadcrumbs = [{ text: '订单管理', cpnName: 'order' }]
    if (this.$route.query && this.$route.query.query) {
      this.getOrderData({ query: this.$route.query.query })
    } else {
      this.getOrderData()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
