<template>
  <refund-requests />
</template>
<script>
import RefundRequests from '@/components/RefundRequests'
import breadcrumbMixins from '@/mixins/breadcrumb'
import refundRequestsMixins from '@/mixins/refundReuqests'
export default {
  name: 'RefundRequestsPage',
  components: {
    RefundRequests
  },
  mixins: [refundRequestsMixins, breadcrumbMixins],
  mounted () {
    this.breadcrumbs = [{ text: '退款管理', cpnName: 'refund-requests' }]
    if (this.$route.query && this.$route.query.query) {
      this.getRefundRequestsData({ query: this.$route.query.query })
    } else {
      this.getRefundRequestsData()
    }
  }
}
</script>
