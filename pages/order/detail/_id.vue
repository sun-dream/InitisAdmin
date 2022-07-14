<template>
  <order-detail />
</template>
<script>
import orderDetail from '@/components/Order/detail'
import breadcrumbMixins from '@/mixins/breadcrumb'
import ordersMixins from '@/mixins/orders'
export default {
  name: 'OrderDetailPage',
  components: {
    orderDetail
  },
  mixins: [breadcrumbMixins, ordersMixins],
  watch: {
    orderList: {
      deep: true,
      handler (newVal) {
        if (!newVal[0]) {
          return
        }
        this.initBread(newVal[0])
      }
    }
  },
  mounted () {

  },
  methods: {
    initBread (item) {
      const arr = [
        { text: '订单管理', cpnName: 'order' }
      ]
      if (item.id) {
        arr.push({ text: '订单详情', cpnName: 'order-detail-id', params: { id: item.id } })
      }
      this.breadcrumbs = arr
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
