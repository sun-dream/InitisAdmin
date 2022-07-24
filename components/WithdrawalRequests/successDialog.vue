<template>
  <el-dialog v-if="show" title="允许提现" :visible="show" width="50%" :before-close="closeHandler">
    <el-row :gutter="20" class="detail-item">
      <el-col :span="24" class="detail-item-line">
        <span class="item-title fontBold">source_financial_account_id:</span>{{ accountingTransactions.source_financial_account_id || '-' }}
      </el-col>
      <el-col :span="24" class="detail-item-line">
        <span class="item-title fontBold">third_party_transactional_id:</span>
        {{ accountingTransactions.third_party_transactional_id }}
      </el-col>
      <el-col :span="24" class="detail-item-line">
        <span class="item-title fontBold">钱包可提现金额:</span>
        {{ getCurrencySymbols(accountingTransactions.source_currency) }}
        {{ accountingTransactions.source_amount }}
      </el-col>
      <el-col :span="24" class="detail-item-line">
        <span class="item-title fontBold">交易手续费:</span>
        {{ getCurrencySymbols(accountingTransactions.transaction_currency) }}
        {{ accountingTransactions.transaction_fee }}
      </el-col>
      <el-col :span="24" class="detail-item-line">
        <span class="item-title fontBold">目标提现金额:</span>
        {{ getCurrencySymbols(accountingTransactions.target_currency) }}
        {{ accountingTransactions.target_amount }}
      </el-col>
      <el-col :span="24" class="detail-item-line">
        <span class="item-title fontBold">汇率:</span>
        {{ accountingTransactions.exchange_rate }}
      </el-col>
      <el-col :span="24" class="detail-item-line">
        <span class="item-title fontBold">Method:</span>
        {{ getPaymentMethodType(accountingTransactions.method).name||'-' }}
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <v-button size="small" @click="closeHandler">取 消</v-button>
      <v-button type="primary" size="small" @click="saveHandler">确 定</v-button>
    </span>
  </el-dialog>
</template>
<script>
import VButton from '../../baseComponents/VButton.vue'
import publicUseMixins from '@/mixins/publicUse'
import withdrawalRequestsMixins from '@/mixins/withdrawalRequests'
export default {
  name: 'SuccessDialog',
  components: { VButton },
  mixins: [withdrawalRequestsMixins, publicUseMixins],
  props: {
    defaultData: {
      type: Object,
      default: () => {}
    },
    show: {
      type: Boolean,
      default: false
    },
    detailStatus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    accountingTransactions () {
      if (this.defaultData && Array.isArray(this.defaultData.accounting_transactions) && this.defaultData.accounting_transactions.length > 0) {
        return this.defaultData.accounting_transactions[0]
      } else {
        return {}
      }
    }
  },
  watch: {
  },
  methods: {
    closeHandler () {
      this.$emit('update:show', false)
    },
    saveHandler () {
      const params = {
        source_financial_account_id: this.accountingTransactions.source_financial_account_id,
        source_amount: this.accountingTransactions.source_amount,
        third_party_transactional_id: this.accountingTransactions.third_party_transactional_id,
        source_currency: this.accountingTransactions.source_currency,
        transaction_fee: this.accountingTransactions.transaction_fee,
        transaction_currency: this.accountingTransactions.transaction_currency,
        exchange_rate: this.accountingTransactions.exchange_rate,
        target_amount: this.accountingTransactions.target_amount,
        target_currency: this.accountingTransactions.target_currency,
        method: this.accountingTransactions.method
      }
      this.notification({ title: '提示', message: '正在提现', type: 'warning' })
      this.updateWithdrawalRequestsOfSuccess({ id: this.accountingTransactions.id, params })
        .then((resp) => {
          if (this.detailStatus) {
            this.loadWithdrawalRequestsItem(this.$route.params.id)
          } else {
            this.getWithdrawalRequestsData()
          }
          this.closeHandler()
          this.notification({ title: '提示', message: '提现完成', type: 'success' })
        })
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
