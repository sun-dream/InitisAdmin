<template>
  <payments />
</template>

<script>
import Payments from '@/components/Payments'
import breadcrumbMixins from '@/mixins/breadcrumb'
import paymentsMixins from '@/mixins/payments'
export default {
  name: 'PaymentsPage',
  components: {
    Payments
  },
  mixins: [paymentsMixins, breadcrumbMixins],
  mounted () {
    this.breadcrumbs = [{ text: '支付订单', cpnName: 'payments' }]
    this.getPaymentsData()
  }
}
</script>
