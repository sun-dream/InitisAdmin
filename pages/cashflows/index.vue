<template>
  <cashflows />
</template>
<script>
import Cashflows from '@/components/Cashflows'
import breadcrumbMixins from '@/mixins/breadcrumb'
import casbflowsMixins from '@/mixins/cashflows'
export default {
  name: 'CashflowsPage',
  components: {
    Cashflows
  },
  mixins: [casbflowsMixins, breadcrumbMixins],
  mounted () {
    this.breadcrumbs = [{ text: '资金流水', cpnName: 'cashflows' }]
    if (this.$route.query && this.$route.query.query) {
      this.getCashflowsData({ query: this.$route.query.query })
    } else {
      this.getCashflowsData()
    }
  }
}
</script>
