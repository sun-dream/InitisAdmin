<template>
  <div class="d-flex justify-content-between mb-2">
    <el-form
      ref="queryForm"
      :inline="true"
      label-width="50px"
      @submit.native.prevent
    >
      <el-form-item label="查询" class="mb-0">
        <el-input v-model="accountingTransactionsQuery" @keyup.enter.native="getAccountingTransactionsData()" />
      </el-form-item>
      <el-form-item class="mb-0">
        <v-button type="primary" size="small" icon="el-icon-search" @click="getAccountingTransactionsData()">
          查询
        </v-button>
      </el-form-item>
    </el-form>
    <div>
      <v-button type="primary" size="small" icon="el-icon-push" @click="open">
        创建转账记录
      </v-button>
    </div>
    <create-dialog :show.sync="createDialogStatus" />
  </div>
</template>

<script>
import VButton from '../../baseComponents/VButton.vue'
import createDialog from './createDialog.vue'
// import withdrawalRequestsMixins from '@/mixins/withdrawalRequests'
import accountingTransactionsMixins from '@/mixins/accountingTransactions'
export default {
  name: 'AccountingQuery',
  components: {
    VButton, createDialog
  },
  mixins: [accountingTransactionsMixins],
  props: {
  },
  data () {
    return {
      createDialogStatus: false
    }
  },
  watch: {
  },
  methods: {
    open () {
      this.createDialogStatus = true
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
