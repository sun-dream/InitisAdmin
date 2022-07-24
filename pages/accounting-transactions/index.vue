<template>
  <accounting-transactions />
</template>
<script>
import AccountingTransactions from '@/components/AccountingTransactions'
import breadcrumbMixins from '@/mixins/breadcrumb'
import accountingTransactionsMixins from '@/mixins/accountingTransactions'
export default {
  name: 'AccountingTransactionsPage',
  components: {
    AccountingTransactions
  },
  mixins: [accountingTransactionsMixins, breadcrumbMixins],
  mounted () {
    this.breadcrumbs = [{ text: '转账记录', cpnName: 'accounting-transactions' }]
    if (this.$route.query && this.$route.query.query) {
      this.getAccountingTransactionsData({ query: this.$route.query.query })
    } else {
      this.getAccountingTransactionsData()
    }
  }
}
</script>
