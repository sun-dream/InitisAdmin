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
    this.getOrderData()
  }
}
</script>
<style lang="scss" scoped>
</style>
