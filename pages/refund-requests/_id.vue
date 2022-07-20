<template>
  <refund-requests-detail />
</template>
<script>
import refundRequestsDetail from '@/components/RefundRequests/refundRequestsDetail'
import breadcrumbMixins from '@/mixins/breadcrumb'
import refundRequestsMixins from '@/mixins/refundReuqests'
export default {
  name: 'RefundRequestsPage',
  components: {
    refundRequestsDetail
  },
  mixins: [refundRequestsMixins, breadcrumbMixins],
  mounted () {
    this.breadcrumbs = [{ text: '退款管理', cpnName: 'refund-requests' }]
    if (this.$route.params && this.$route.params.id) {
      this.getRefundRequestsItem(this.$route.params.id)
    }
  }
}
</script>
