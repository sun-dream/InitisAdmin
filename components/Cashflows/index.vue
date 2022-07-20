<template>
  <section class="w-100 user-wrap">
    <cashflows-query />
    <el-table :data="cashflowsList" border size="small" max-height="700">
      <el-table-column prop="full_name" label="来源" width="220">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" placement="top-start">
            <div slot="content">
              {{ scope.row.source_payment_id }}<br>点击跳转支付订单
            </div>
            <v-link class="title-line" name="payments" :query="{query:scope.row.source_payment_id}">
              {{ scope.row.source_payment_id }}
            </v-link>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column prop="target_platform_wallet_id" label="目标平台钱包ID" width="220">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.target_platform_wallet_id" class="item" effect="dark" placement="top-start">
            <div slot="content">
              {{ scope.row.target_platform_wallet_id }}<br>
            </div>
            <p class="title-line">
              {{ scope.row.target_platform_wallet_id }}
            </p>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="target_wallet_id" label="目标钱包ID" width="220">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.target_wallet_id" class="item" effect="dark" placement="top-start">
            <div slot="content">
              {{ scope.row.target_wallet_id }}<br>
            </div>
            <p class="title-line">
              {{ scope.row.target_wallet_id }}
            </p>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column prop="amount" label="金额" width="110">
        <template slot-scope="scope">
          {{ getCurrencySymbols(scope.row.currency) }}
          {{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column prop="create_at" label="生成时间" width="110">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ getDate(scope.row.create_at) }}
        </template>
      </el-table-column>
      <el-table-column prop="type" label="收入方式" min-width="140">
        <template slot-scope="scope">
          {{ getCashflowsType(scope.row.type)['name'] ||'-' }}
        </template>
      </el-table-column>
    </el-table>
    <v-paginations
      :vuex-path="cashflowsVuexBasePath"
      algin-right
      @pageChange="pageChangeHandler"
    />
  </section>
</template>
<script>
import cashflowsQuery from './cashflowsQuery.vue'
import cashflowsMixins from '@/mixins/cashflows'
import publicUseMixins from '@/mixins/publicUse'
import VLink from '@/baseComponents/VLink'
import * as mUtils from '@/assets/utils/mUtils'
import VPaginations from '@/baseComponents/VPaginations'
export default {
  name: 'CashflowsList',
  components: {
    VPaginations, VLink, cashflowsQuery
  },
  mixins: [cashflowsMixins, publicUseMixins],
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
    }
  },
  mounted () {
  },
  methods: {
    pageChangeHandler () {
      this.getCashflowsData()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "assets/sass/color";
    .title-line{
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;//溢出内容隐藏
        text-overflow: ellipsis;//文本溢出部分用省略号表示
        display: -webkit-box;//特别显示模式
        -webkit-line-clamp: 1;//行数
        line-clamp:1;
        -webkit-box-orient: vertical;//盒子中内容竖直排列
    }
</style>
