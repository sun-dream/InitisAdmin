<template>
  <withdrawal-requests />
</template>
<script>
import WithdrawalRequests from '@/components/WithdrawalRequests'
import breadcrumbMixins from '@/mixins/breadcrumb'
import withdrawalRequestsMixins from '@/mixins/withdrawalRequests'
export default {
  name: 'WithdrawalRequestsPage',
  components: {
    WithdrawalRequests
  },
  mixins: [withdrawalRequestsMixins, breadcrumbMixins],
  mounted () {
    this.breadcrumbs = [{ text: '提现管理', cpnName: 'withdrawal-requests' }]
    if (this.$route.query && this.$route.query.query) {
      this.getWithdrawalRequestsData({ query: this.$route.query.query })
    } else {
      this.getWithdrawalRequestsData()
    }
  }
}
</script>
