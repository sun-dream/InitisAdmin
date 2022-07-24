<template>
  <div v-if="withdrawalRequeststItem&&withdrawalRequeststItem.id" class="detail-wrap">
    <v-blockquote text="提现信息">
      <div v-if="scope.row.status === 'PENDING'">
        <v-button size="small" @click="refuseHandler">
          拒绝提现
        </v-button>
        <v-button type="primary" size="small" @click="successHandler">
          同意提现
        </v-button>
      </div>
    </v-blockquote>
    <withdrawalDetailInfo :default-data="withdrawalRequeststItem" />
    <v-blockquote v-if="targetFinancialAccount" text="提现账号信息" />
    <targetFinancialAccountInfo :default-data="targetFinancialAccount" />
    <v-blockquote v-if="accountingTransactions.length>0" text="转账记录" />
    <accounting-transactions-table :default-data="accountingTransactions" />
    <rejected-dialog :show.sync="rejectedDialogState" :default-data="selectTableCellData" />
    <success-dialog :show.sync="successDialogState" :default-data="selectTableCellData" />
  </div>
  <div v-else class="text-center text-info">
    未检测到所属信息
  </div>
</template>

<script>

// import VLink from '../../baseComponents/VLink.vue'
import VButton from '../../baseComponents/VButton.vue'
import withdrawalDetailInfo from './withdrawalDetailInfo.vue'
import accountingTransactionsTable from './accountingTransactionsTable.vue'
import targetFinancialAccountInfo from './targetFinancialAccountInfo.vue'
import rejectedDialog from './rejectedDialog'
import successDialog from './successDialog'
import ordersMixins from '@/mixins/orders'
import withdrawalRequestsMixins from '@/mixins/withdrawalRequests'
import VBlockquote from '@/baseComponents/VBlockquote'
import * as mUtils from '@/assets/utils/mUtils'

export default {
  name: 'WithdrawalDetail',
  components: {

    VBlockquote, VButton, targetFinancialAccountInfo, withdrawalDetailInfo, accountingTransactionsTable, rejectedDialog, successDialog
    //  VLink, VImage,
  },
  mixins: [withdrawalRequestsMixins, ordersMixins],
  props: {
  },
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
    },
    targetFinancialAccount () {
      if (this.withdrawalRequeststItem.target_financial_account_id && this.withdrawalRequeststItem.target_financial_account) {
        return this.withdrawalRequeststItem.target_financial_account
      }
      return null
    },
    accountingTransactions () {
      if (Array.isArray(this.withdrawalRequeststItem.accounting_transactions)) {
        return this.withdrawalRequeststItem.accounting_transactions
      }
      return []
    }
  },
  watch: {
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
