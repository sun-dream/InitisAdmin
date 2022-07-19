<template>
  <payments-detail />
</template>

<script>
import PaymentsDetail from '@/components/Payments/detail'
import breadcrumbMixins from '@/mixins/breadcrumb'
import paymentsMixins from '@/mixins/payments'
export default {
  name: 'PaymentsItemPage',
  components: {
    PaymentsDetail
  },
  mixins: [paymentsMixins, breadcrumbMixins],
  mounted () {
    this.breadcrumbs = []
    this.getPaymentItem(this.$route.params.id)
    this.init()
  },
  methods: {
    init () {
      this.breadcrumbs = [
        { text: '支付订单', cpnName: 'payments' },
        { text: '支付订单详情', cpnName: 'payments-id', params: { id: this.$route.params.id } }
      ]
    }
  }
}
</script>
