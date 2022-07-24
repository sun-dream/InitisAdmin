<template>
  <section class="w-100 refund-wrap">
    <withdrawal-requests-query />
    <el-table :data="withdrawalRequestsList" border size="small" max-height="700">
      <el-table-column prop="user_id" label="客户ID" width="140">
        <template slot-scope="scope">
          <v-link class-name="title-line-1" name="all-user" :query="{query:scope.row.user_id}">
            {{ scope.row.user_id||'-' }}
          </v-link>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态" width="80">
        <template slot-scope="scope">
          {{ getWithdrawalRequestsStatus(scope.row.status).name||'-' }}
        </template>
      </el-table-column>
      <el-table-column prop="create_at" label="发起日期" width="110">
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
      <el-table-column prop="target_amount" label="实际 - 平台（汇率）" width="140">
        <template slot-scope="scope">
          {{ scope.row.real_exchange_rate }} - {{ scope.row.platform_exchange_rate }}
        </template>
      </el-table-column>
      <el-table-column prop="target_amount" label="交易手续费" width="110">
        <template slot-scope="scope">
          {{ getCurrencySymbols(scope.row.transaction_currency) }}
          {{ scope.row.transaction_fee }}
        </template>
      </el-table-column>
      <el-table-column prop="reject_note" label="拒绝理由" min-width="140">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.reject_note" class="item" effect="dark" :content="scope.row.reject_note" placement="top-start">
            <p class="title-line-1">
              {{ scope.row.reject_note }}
            </p>
          </el-tooltip>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="withdraw_note" label="撤销说明" min-width="140">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.withdraw_note" class="item" effect="dark" :content="scope.row.withdraw_note" placement="top-start">
            <p class="title-line-1">
              {{ scope.row.withdraw_note }}
            </p>
          </el-tooltip>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" width="180" fixed="right">
        <template slot-scope="scope">
          <v-button type="text" size="small" @click="jumpTo({name:'withdrawal-requests-id',params: {id:scope.row.id} })">
            详情
          </v-button>
          <template v-if="scope.row.status === 'PENDING'">
            <v-button type="text" size="small" @click="refuseHandler(scope.row)">
              拒绝
            </v-button>
            <v-button type="text" size="small" @click="successHandler(scope.row)">
              允许打款
            </v-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <rejected-dialog :show.sync="rejectedDialogState" :default-data="selectTableCellData" />
    <success-dialog :show.sync="successDialogState" :default-data="selectTableCellData" />
    <v-paginations
      :vuex-path="withdrawalRequestsVuexBasePath"
      algin-right
      @pageChange="getWithdrawalRequestsData()"
    />
  </section>
</template>
<script>
import VButton from '../../baseComponents/VButton.vue'
import VLink from '../../baseComponents/VLink.vue'
import rejectedDialog from './rejectedDialog'
import successDialog from './successDialog'
import withdrawalRequestsQuery from './withdrawalRequestsQuery'
import withdrawalRequestsMixins from '@/mixins/withdrawalRequests'
import publicUseMixins from '@/mixins/publicUse'
import * as mUtils from '@/assets/utils/mUtils'
import VPaginations from '@/baseComponents/VPaginations'

export default {
  name: 'RefundRequests',
  components: {
    VPaginations, VButton, withdrawalRequestsQuery, VLink, rejectedDialog, successDialog
  },
  mixins: [withdrawalRequestsMixins, publicUseMixins],
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
