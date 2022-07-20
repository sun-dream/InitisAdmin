<template>
  <section class="w-100 refund-wrap">
    <!-- <cashflows-query /> -->
    <el-table :data="refundRequestList" border size="small" max-height="700">
      <el-table-column prop="user_id" label="客户" width="220">
        <template slot-scope="scope">
          <div v-if="scope.row.user_id" class="customer-user-wrap">
            <p>名字：{{ scope.row.user_id||'-' }}</p>
            <p>电话：{{ scope.row.user_id||'-' }}</p>
            <p>邮箱：{{ scope.row.user_id||'-' }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="target_platform_wallet_id" label="退款商品" width="240">
        <template slot-scope="scope">
          <sku-item :default-data="getOrderSku(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="target_wallet_id" label="状态" width="220">
        <template slot-scope="scope">
          {{ getRefundRequestsStatus(scope.row.status)['name']||'-' }}
        </template>
      </el-table-column>

      <el-table-column prop="amount" label="金额" width="110">
        <template slot-scope="scope">
          {{ getCurrencySymbols(scope.row.currency) }}
          {{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column prop="create_at" label="发起日期" width="110">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ getDate(scope.row.create_at) }}
        </template>
      </el-table-column>
      <el-table-column prop="type" label="收入方式" min-width="140" />
    </el-table>
    <v-paginations
      :vuex-path="refundRequestsVuexBasePath"
      algin-right
      @pageChange="pageChangeHandler"
    />
  </section>
</template>
<script>
import skuItem from './skuItem'
import refundRequestsMixins from '@/mixins/refundReuqests'
import publicUseMixins from '@/mixins/publicUse'
import * as mUtils from '@/assets/utils/mUtils'
import VPaginations from '@/baseComponents/VPaginations'
export default {
  name: 'RefundRequests',
  components: {
    VPaginations, skuItem
  },
  mixins: [refundRequestsMixins, publicUseMixins],
  data () {
    return {
      userDialog: false,
      userFormTitle: '',
      selectEditId: null
    }
  },
  computed: {
    getDate (val) {
      return function (val) {
        return mUtils.formatDate(val, 3)
      }
    },
    getOrderSku (row) {
      return function (row) {
        if (row.order_sku && row.order_sku_id) {
          return row.order_sku
        } else {
          return {}
        }
      }
    }
  },
  mounted () {
  },
  methods: {
    pageChangeHandler () {
      this.getRefundRequestsData()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "assets/sass/color";
    .customer-user-wrap{
    font-size: 0;
    p{
      overflow:hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      -o-text-overflow:ellipsis;
      font-size: 14px;
      line-height: 16px;
    }
  }
</style>
