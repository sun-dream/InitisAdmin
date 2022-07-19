<template>
  <section v-if="payment&&payment.id" class="w-100 payment-detail-wrap">
    <v-blockquote text="基本信息" />
    <el-row :gutter="20" class="detail-item">
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">订单id:</span>{{ payment.id }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">生成订单时间:</span>
        <i class="el-icon-time" />
        {{ getDate(payment.create_at) }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">状态:</span>
        {{ getPaymentStatus(payment.status)['name'] }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">付款方式:</span>{{ payment.payment_method }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">订单总金额</span>
        {{ getCurrencySymbols(payment.currency) }}
        {{ payment.total_captured }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">可得佣金</span>
        {{ getCurrencySymbols(payment.currency) }}
        {{ payment.merchant_commission_actual_estimate }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">已支付佣金</span>
        <el-tag v-if="payment.commission_paid" type="success" size="small">
          {{ getCurrencySymbols(payment.currency) }}
          {{ payment.platform_commission_captured }}
        </el-tag>
        <el-tag v-else type="info" size="small">
          未支付
        </el-tag>
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">平台可得佣金</span>
        {{ getCurrencySymbols(payment.currency) }}
        {{ payment.platform_commission_actual_estimate }}
      </el-col>
    </el-row>
    <v-blockquote text="账单地址" />
    <el-row v-if="payment.address_id&&payment.address" :gutter="20" class="detail-item">
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">名字:</span>{{ payment.address.first_name }} - {{ payment.address.last_name }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">邮箱:</span><i class="el-icon-position" />{{ payment.address.email }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">电话:</span><i class="el-icon-phone-outline" />{{ payment.address.phone }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">邮编:</span>{{ payment.address.postal_code }}
      </el-col>
      <el-col :span="24" class="detail-item-line">
        <span class="item-title fontBold">地址:</span>
        {{ payment.address.country }} -
        {{ payment.address.city }} -
        {{ payment.address.street }} -
        {{ payment.address.company }} -
        {{ payment.address.address1 }} -
        {{ payment.address.address2 }} -
        {{ payment.address.state }} -
      </el-col>
    </el-row>
    <v-blockquote text="Order 信息" />
    <el-row v-if="payment.order&&payment.order.id" :gutter="20" class="detail-item">
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">Order id:</span>
        <v-link :name="'order'" :query="{query:payment.order.id}">
          {{ payment.order.id }}
        </v-link>
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">购买时间:</span>
        <i class="el-icon-time" />
        {{ getDate(payment.order.create_at) }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">购买数量:</span>{{ payment.order.quantity }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">订单总金额:</span>
        {{ getCurrencySymbols(payment.order.currency) }}
        {{ payment.order.total_price }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">备注:</span>{{ payment.order.note }}
      </el-col>
    </el-row>
    <v-blockquote text="订购商品" />
    <el-row v-if="payment.order&&payment.order.order_skus && Array.isArray(payment.order.order_skus)" :gutter="20" class="detail-item px-4">
      <detail-table :read-only-status="true" :order-skus="payment.order.order_skus" />
    </el-row>
  </section>
</template>
<script>
import detailTable from '../../Order/detailTable'
import paymentsMixins from '@/mixins/payments'
import publicUseMixins from '@/mixins/publicUse'
import * as mUtils from '@/assets/utils/mUtils'
import VBlockquote from '@/baseComponents/VBlockquote'
import VLink from '@/baseComponents/VLink'
export default {
  name: 'PaymengList',
  components: {
    VBlockquote, detailTable, VLink
  },
  mixins: [paymentsMixins, publicUseMixins],
  data () {
    return {
      payment: {}
    }
  },
  computed: {
    getDate (val) {
      return function (val) {
        return mUtils.formatDate(val, 1)
      }
    }
  },
  watch: {
    paymentsItem: {
      deep: true,
      handler (newVal) {
        if (!newVal) {
          return
        }
        this.initData(newVal)
      }
    }
  },
  mounted () {
    this.initData(this.paymentsItem)
  },
  methods: {
    initData (data) {
      this.payment = data ? this.cloneObj(data) : {}
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
.payment-detail-wrap{
    font-size: 0;
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
}
.fontBold{
    font-weight: bold;
}
.item-title{
    display: inline-block;
    width:90px;
    text-align: right;
    margin-right: 6px;
}
</style>
