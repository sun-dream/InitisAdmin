<template>
  <el-row :gutter="20" class="detail-item">
    <el-col :span="10" class="detail-item-line">
      <span class="item-title fontBold">提现订单id:</span>{{ defaultData.id || '-' }}
    </el-col>
    <el-col :span="10" class="detail-item-line">
      <span class="item-title fontBold">钱包id:</span>
      {{ defaultData.wallet_id }}
      <!-- <v-link :name="'payments'" :query="{query:refundRequestItem.wallet_id}">
          {{ defaultData.wallet_id }}
        </v-link> -->
    </el-col>
    <el-col :span="10" class="detail-item-line">
      <span class="item-title fontBold">平台转账账号的ID:</span>{{ defaultData.source_financial_account_id || '-' }}
    </el-col>
    <el-col :span="10" class="detail-item-line">
      <span class="item-title fontBold">提现账号的ID:</span>
      {{ defaultData.target_financial_account_id }}
    </el-col>
    <el-col :span="10" class="detail-item-line">
      <span class="item-title fontBold">状态:</span>{{ getWithdrawalRequestsStatus(defaultData.status)['name'] || '-' }}
    </el-col>
    <el-col :span="10" class="detail-item-line">
      <span class="item-title fontBold">发起时间:</span>
      <i class="el-icon-time" />
      {{ getDate(defaultData.create_at) }}
    </el-col>
    <el-col :span="10" class="detail-item-line">
      <span class="item-title fontBold">钱包可提现金额:</span>
      {{ getCurrencySymbols(defaultData.source_currency) }}
      {{ defaultData.source_amount }}
    </el-col>
    <el-col :span="10" class="detail-item-line">
      <span class="item-title fontBold">目标提现金额:</span>
      {{ getCurrencySymbols(defaultData.target_currency) }}
      {{ defaultData.target_amount }}
    </el-col>
    <el-col :span="10" class="detail-item-line">
      <span class="item-title fontBold">实际汇率:</span>
      {{ defaultData.real_exchange_rate }}
    </el-col>
    <el-col :span="10" class="detail-item-line">
      <span class="item-title fontBold">平台汇率:</span>
      {{ defaultData.platform_exchange_rate }}
    </el-col>
    <el-col :span="10" class="detail-item-line">
      <span class="item-title fontBold">交易手续费:</span>
      {{ getCurrencySymbols(defaultData.transaction_currency) }}
      {{ defaultData.transaction_fee }}
    </el-col>
    <el-col :span="24" class="detail-item-line">
      <span class="item-title fontBold">拒绝理由:</span>
      {{ defaultData.reject_note }}
    </el-col>
    <el-col :span="24" class="detail-item-line">
      <span class="item-title fontBold">撤销说明:</span>
      {{ defaultData.withdraw_note }}
    </el-col>
  </el-row>
</template>

<script>

import withdrawalRequestsMixins from '@/mixins/withdrawalRequests'
import publicUseMixins from '@/mixins/publicUse'
import * as mUtils from '@/assets/utils/mUtils'
export default {
  name: 'WithdrawalDetailInfo',
  components: {
  },
  mixins: [withdrawalRequestsMixins, publicUseMixins],
  props: {
    defaultData: {
      type: Object,
      default: () => {}
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
