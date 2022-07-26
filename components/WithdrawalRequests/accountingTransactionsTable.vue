<template>
  <el-table :data="defaultData" border size="small" max-height="700">
    <el-table-column prop="third_party_transactional_id" label="支付订单号" width="180" />
    <!-- <el-table-column prop="withdrawal_request_id" label="提现订单ID" width="180" /> -->
    <el-table-column prop="status" label="状态" width="110">
      <template slot-scope="scope">
        {{ getAccountStatus(scope.row.status).name||'-' }}
      </template>
    </el-table-column>
    <el-table-column prop="status" label="支付方式" width="120">
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
</template>

<script>

import withdrawalRequestsMixins from '@/mixins/withdrawalRequests'
import publicUseMixins from '@/mixins/publicUse'
import * as mUtils from '@/assets/utils/mUtils'
export default {
  name: 'AccountingTransactionsTable',
  components: {
  },
  mixins: [withdrawalRequestsMixins, publicUseMixins],
  props: {
    defaultData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  computed: {
    getDate (val) {
      return function (val) {
        return mUtils.formatDate(val, 3)
      }
    }
  },
  watch: {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.detail-item{
        margin-bottom: 10px;
        &+.detail-item{
          margin-top: 40px;
        }
        .detail-item-line{
            font-size: 14px;
            margin-bottom: 10px;
        }
    }
.fontBold{
    font-weight: bold;
}
.item-title{
    display: inline-block;
    width:120px;
    text-align: right;
    margin-right: 6px;
}
.pic-wrap{
  width: 160px;
  height: 160px;
}
</style>
