<template>
  <section class="w-100 categorg-wrap">
    <payments-query />
    <el-table :data="paymentsList" border size="small" max-height="700">
      <el-table-column prop="status" label="商家id" width="140">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" placement="top-start">
            <div slot="content">
              {{ scope.row.merchant_id }}<br>点击跳转
            </div>
            <v-link class="title-line" name="brand-stores" :query="{query:scope.row.merchant_id}">
              {{ scope.row.merchant_id }}
            </v-link>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="买家id" width="140">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" placement="top-start">
            <div slot="content">
              {{ scope.row.customer_id }}<br>点击跳转
            </div>
            <v-link class="title-line" name="all-user" :query="{query:scope.row.customer_id}">
              {{ scope.row.customer_id }}
            </v-link>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          {{ getPaymentStatus(scope.row.status)['name']||'-' }}
        </template>
      </el-table-column>
      <el-table-column prop="payment_method" label="付款方式" width="100" />
      <el-table-column prop="pay_at" label="付款时间" width="110">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ getDate(scope.row.pay_at) }}
        </template>
      </el-table-column>
      <el-table-column prop="total_captured" label="总额" width="110">
        <template slot-scope="scope">
          {{ getCurrencySymbols(scope.row.currency) }}
          {{ scope.row.total_captured }}
        </template>
      </el-table-column>
      <el-table-column prop="merchant_commission_actual_estimate" label="可得佣金" width="110">
        <template slot-scope="scope">
          {{ getCurrencySymbols(scope.row.currency) }}
          {{ scope.row.merchant_commission_actual_estimate }}
        </template>
      </el-table-column>
      <el-table-column prop="commission_paid" label="已支付佣金" min-width="110">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.commission_paid" type="success" size="small">
            {{ getCurrencySymbols(scope.row.currency) }}
            {{ scope.row.platform_commission_captured }}
          </el-tag>
          <el-tag v-else type="info" size="small">
            未支付
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="jumpTo({name:'payments-id',params:{id:scope.row.id}})">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-paginations
      :vuex-path="paymentsVuexBasePath"
      algin-right
      @pageChange="pageChangeHandler"
    />
  </section>
</template>
<script>
import paymentsQuery from './paymentsQuery.vue'
import paymentsMixins from '@/mixins/payments'
import publicUseMixins from '@/mixins/publicUse'
import * as mUtils from '@/assets/utils/mUtils'
import VLink from '@/baseComponents/VLink'
import VPaginations from '@/baseComponents/VPaginations'
export default {
  name: 'PaymengList',
  components: {
    VPaginations,
    paymentsQuery,
    VLink
  },
  mixins: [paymentsMixins, publicUseMixins],
  data () {
    return {
      categoryDialog: false,
      categoryFormTitle: '',
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
      this.getPaymentsData()
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
  -webkit-line-clamp:1;//行数
  line-clamp: 1;
  -webkit-box-orient: vertical;//盒子中内容竖直排列
}
</style>
