<template>
  <withdrawal-detail />
</template>
<script>
import withdrawalDetail from '@/components/WithdrawalRequests/withdrawalDetail'
import breadcrumbMixins from '@/mixins/breadcrumb'
import withdrawalRequestsMixins from '@/mixins/withdrawalRequests'
export default {
  name: 'WithdrawalRequestsPage',
  components: {
    withdrawalDetail
  },
  mixins: [withdrawalRequestsMixins, breadcrumbMixins],
  mounted () {
    const arr = [{ text: '提现管理', cpnName: 'withdrawal-requests' }]
    if (this.$route.params && this.$route.params.id) {
      arr.push({ text: '提现详情', cpnName: 'withdrawal-requests-id', params: { id: this.$route.params.id } })
      this.loadWithdrawalRequestsItem(this.$route.params.id)
    }
    this.breadcrumbs = arr
  }
}
</script>
