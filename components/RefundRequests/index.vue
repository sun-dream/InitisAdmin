<template>
  <section class="w-100 refund-wrap">
    <refund-requests-query />
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
      <el-table-column prop="target_platform_wallet_id" label="退款商品" width="220">
        <template slot-scope="scope">
          <sku-item :default-data="getOrderSku(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          {{ getRefundRequestsStatus(scope.row.status).name||'-' }}
        </template>
      </el-table-column>
      <el-table-column prop="create_at" label="发起日期" width="110">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ getDate(scope.row.create_at) }}
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="申请理由" min-width="120">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.note" class="item" effect="dark" :content="scope.row.note" placement="top-start">
            <p class="title-line-3">
              {{ scope.row.note }}
            </p>
          </el-tooltip>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="拒绝说明" min-width="120">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.reject_note" class="item" effect="dark" :content="scope.row.reject_note" placement="top-start">
            <p class="title-line-3">
              {{ scope.row.reject_note }}
            </p>
          </el-tooltip>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" width="120">
        <template slot-scope="scope">
          <v-button type="text" size="small" @click="openHandle(scope.row)">
            退款
          </v-button>
          <v-button type="text" size="small" @click="jumpTo({ name:'refund-requests-id', params: {id:scope.row.id} })">
            详情
          </v-button>
        </template>
      </el-table-column>
    </el-table>
    <v-paginations
      :vuex-path="refundRequestsVuexBasePath"
      algin-right
      @pageChange="pageChangeHandler"
    />
    <update-refund-dialog :show.sync="updateRefundVisible" :default-data="selectTableCellData" />
  </section>
</template>
<script>
import VButton from '../../baseComponents/VButton.vue'
import skuItem from './skuItem'
import updateRefundDialog from './updateRefundDialog'
import refundRequestsQuery from './refundRequestsQuery'
import refundRequestsMixins from '@/mixins/refundReuqests'
import publicUseMixins from '@/mixins/publicUse'
import * as mUtils from '@/assets/utils/mUtils'
import VPaginations from '@/baseComponents/VPaginations'
export default {
  name: 'RefundRequests',
  components: {
    VPaginations, skuItem, VButton, updateRefundDialog, refundRequestsQuery
  },
  mixins: [refundRequestsMixins, publicUseMixins],
  data () {
    return {
      updateRefundVisible: false,
      selectTableCellData: {}
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
    openHandle (row) {
      this.selectTableCellData = row
      this.updateRefundVisible = true
    },
    pageChangeHandler () {
      this.getRefundRequestsData()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "assets/sass/color";
.title-line-3{
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;//溢出内容隐藏
        text-overflow: ellipsis;//文本溢出部分用省略号表示
        display: -webkit-box;//特别显示模式
        -webkit-line-clamp: 3;//行数
        line-clamp:3;
        -webkit-box-orient: vertical;//盒子中内容竖直排列
    }
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
