<template>
  <section class="w-100 refund-wrap">
    <!-- <withdrawal-requests-query /> -->
    <el-table :data="accountingTransactionsList" border size="small" max-height="700">
      <el-table-column prop="third_party_transactional_id" label="third_party_transactional" width="180" />
      <el-table-column prop="withdrawal_request_id" label="withdrawal_request" width="180" />
      <el-table-column prop="status" label="状态" width="110">
        <template slot-scope="scope">
          {{ getAccountStatus(scope.row.status).name||'-' }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Method" width="120">
        <template slot-scope="scope">
          {{ getPaymentMethodType(scope.row.method).name||'-' }}
        </template>
      </el-table-column>
      <el-table-column prop="create_at" label="时间" width="110">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ getDate(scope.row.create_at) }}
        </template>
      </el-table-column>
      <el-table-column prop="source_amount" label="钱包可提现金额" width="110">
        <template slot-scope="scope">
          {{ getCurrencySymbols(scope.row.source_currency) }}
          {{ scope.row.source_amount }}
        </template>
      </el-table-column>
      <el-table-column prop="target_amount" label="目标提现金额" width="110">
        <template slot-scope="scope">
          {{ getCurrencySymbols(scope.row.target_currency) }}
          {{ scope.row.target_amount }}
        </template>
      </el-table-column>
      <el-table-column prop="target_amount" label="汇率" width="120">
        <template slot-scope="scope">
          {{ scope.row.exchange_rate }}
        </template>
      </el-table-column>
      <el-table-column prop="transaction_fee" label="交易手续费" width="110">
        <template slot-scope="scope">
          {{ getCurrencySymbols(scope.row.transaction_currency) }}
          {{ scope.row.transaction_fee }}
        </template>
      </el-table-column>
      <el-table-column prop="source_financial_account_id" label="平台转账账号的ID" width="140" />
      <el-table-column prop="target_financial_account_id" label="提现账号的ID" width="140" />
    </el-table>
    <v-paginations
      :vuex-path="accountingTransactionsVuexBasePath"
      algin-right
      @pageChange="getAccountingTransactionsData()"
    />
  </section>
</template>
<script>
// import VButton from '../../baseComponents/VButton.vue'
// import VLink from '../../baseComponents/VLink.vue'
// import withdrawalRequestsQuery from './withdrawalRequestsQuery'
import accountingTransactionsMixins from '@/mixins/accountingTransactions'
import withdrawalRequestsMixins from '@/mixins/withdrawalRequests'
import publicUseMixins from '@/mixins/publicUse'
import * as mUtils from '@/assets/utils/mUtils'
import VPaginations from '@/baseComponents/VPaginations'
export default {
  name: 'AccountingTransactions',
  components: {
    VPaginations
  },
  mixins: [accountingTransactionsMixins, withdrawalRequestsMixins, publicUseMixins],
  data () {
    return {
      rejectedDialogState: false,
      successDialogState: false,
      selectTableCellData: {}
    }
  },
  computed: {
    getDate (val) {
      return function (val) {
        return mUtils.formatDate(val, 3)
      }
    }
  },
  mounted () {
  },
  methods: {
    refuseHandler (data) {
      this.selectTableCellData = this.cloneObj(data)
      this.rejectedDialogState = true
    },
    successHandler (data) {
      this.selectTableCellData = this.cloneObj(data)
      this.successDialogState = true
    }
  }
}
</script>
<style lang="scss" scoped>
@import "assets/sass/color";
.title-line-1{
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;//溢出内容隐藏
        text-overflow: ellipsis;//文本溢出部分用省略号表示
        display: -webkit-box;//特别显示模式
        -webkit-line-clamp:1;//行数
        line-clamp:1;
        -webkit-box-orient: vertical;//盒子中内容竖直排列
    }

</style>
