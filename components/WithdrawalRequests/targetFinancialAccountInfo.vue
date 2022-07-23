<template>
  <el-row v-if="defaultData" :gutter="20" class="detail-item">
    <el-col :span="10" class="detail-item-line">
      <span class="item-title fontBold">账户id:</span>{{ defaultData.id || '-' }}
    </el-col>
    <el-col :span="10" class="detail-item-line">
      <span class="item-title fontBold">用户id:</span>{{ defaultData.user_id || '-' }}
    </el-col>
    <el-col :span="10" class="detail-item-line">
      <span class="item-title fontBold">类型:</span>
      {{ getpaymentMethodType(defaultData.type)['name'] || '-' }}
    </el-col>
    <el-col :span="10" class="detail-item-line">
      <span class="item-title fontBold">账号:</span>
      {{ defaultData.account || '-' }}
    </el-col>
    <el-col :span="10" class="detail-item-line">
      <span class="item-title fontBold">使用时间:</span>
      <i class="el-icon-time" />
      {{ getDate(defaultData.use_at) }}
    </el-col>
    <el-col :span="10" class="detail-item-line">
      <span class="item-title fontBold">状态:</span>
      {{ getAccountStatus(defaultData.status)['name'] || '-' }}
    </el-col>
    <el-col :span="10" class="detail-item-line">
      <span class="item-title fontBold">到期年份:</span>
      {{ defaultData.expiration_year }}
    </el-col>
    <el-col :span="10" class="detail-item-line">
      <span class="item-title fontBold">到期月份:</span>
      {{ defaultData.expiration_month }}
    </el-col>
    <el-col :span="10" class="detail-item-line">
      <span class="item-title fontBold">cvv:</span>
      {{ defaultData.cvv }}
    </el-col>
    <el-col :span="24" class="detail-item-line">
      <span class="item-title fontBold">账单地址:</span>
      {{ defaultData.billing_address_id }}
    </el-col>
  </el-row>
</template>

<script>

import withdrawalRequestsMixins from '@/mixins/withdrawalRequests'
import * as mUtils from '@/assets/utils/mUtils'
export default {
  name: 'TargetFinancialAccountInfo',
  components: {
  },
  mixins: [withdrawalRequestsMixins],
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
