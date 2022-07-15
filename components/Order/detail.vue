<template>
  <div v-if="order.id" class="order-detail-wrap">
    <item-title text="订单详情" />
    <el-row :gutter="20" class="detail-item">
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">订单id:</span>{{ order.id || '-' }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">购买时间:</span>
        <i class="el-icon-time" />
        {{ getDate(order.create_at) }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">购买数量:</span>{{ order.quantity || '-' }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">订单总金额:</span>
        {{ getCurrencySymbols(order.currency) }} {{ order.total_price }}
      </el-col>
      <el-col :span="24" class="detail-item-line">
        <span class="item-title fontBold">备注:</span>
        {{ order.note }}
      </el-col>
    </el-row>
    <item-title text="收件人信息" />
    <el-row v-if="order.address_id" :gutter="20" class="detail-item">
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">姓名:</span>
        {{ order.address.first_name || '-' }}
        {{ order.address.last_name || '-' }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">邮编:</span>
        {{ order.address.postal_code || '-' }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">邮箱:</span>
        <i class="el-icon-s-promotion" />
        {{ order.address.email || '-' }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">电话:</span>
        <i class="el-icon-phone" />
        {{ order.address.phone || '-' }}
      </el-col>
      <el-col :span="24" class="detail-item-line">
        <span class="item-title fontBold">地址:</span>
        {{ order.address.country }}.
        {{ order.address.city }}.
        {{ order.address.street }}.
        {{ order.address.company }}.
        {{ order.address.address1 }}.
        {{ order.address.address2 }}
      </el-col>
    </el-row>
    <item-title text="订购商品" />
    <el-row v-if="order.order_skus && Array.isArray(order.order_skus)" :gutter="20" class="detail-item px-4">
      <detail-table :order-skus="order.order_skus" />
    </el-row>
    <item-title text="卖家信息" />
    <el-row v-if="order.merchant_id" :gutter="20" class="detail-item">
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">名称:</span>{{ order.merchant.full_name || '-' }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">邮箱:</span>
        <i class="el-icon-s-promotion" />
        {{ order.merchant.email || '-' }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">电话:</span>
        <i class="el-icon-phone" />
        {{ order.merchant.phone || '-' }}
      </el-col>
    </el-row>
    <item-title text="客户信息" />
    <el-row v-if="order.customer_id" :gutter="20" class="detail-item">
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">名称:</span>{{ order.customer.full_name || '-' }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">邮箱:</span>
        <i class="el-icon-s-promotion" />
        {{ order.customer.email || '-' }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">电话:</span>
        <i class="el-icon-phone" />
        {{ order.customer.phone || '-' }}
      </el-col>
    </el-row>
    <item-title text="店铺信息" />
    <el-row v-if="order.brand_store_id" :gutter="20" class="detail-item">
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">名称:</span>{{ order.brand_store.name || '-' }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">邮箱:</span>
        <i class="el-icon-s-promotion" />
        {{ order.brand_store.email || '-' }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">youtube:</span>{{ order.brand_store.youtube || '-' }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">facebook:</span>
        {{ order.brand_store.facebook || '-' }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">instagram:</span>
        {{ order.brand_store.instagram || '-' }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">tiktok:</span>
        {{ order.brand_store.tiktok || '-' }}
      </el-col>
    </el-row>
  </div>
</template>
<script>
import itemTitle from './itemTitle'
import detailTable from './detailTable'
import ordersMixins from '@/mixins/orders'
import * as mUtils from '@/assets/utils/mUtils'
import publicUseMixins from '@/mixins/publicUse'
export default {
  name: 'OrdertDetail',
  components: {
    itemTitle, detailTable
  },
  mixins: [ordersMixins, publicUseMixins],
  data () {
    return {
      order: {}
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
    orderList: {
      deep: true,
      handler (newVal) {
        if (!newVal[0]) {
          return
        }
        this.initData(newVal[0])
      }
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.getOrderData({ query: this.$route.params.id })
    }
  },
  methods: {
    initData (data) {
      this.order = this.cloneObj(data)
    }
  }
}
</script>
<style lang="scss" scoped>
.order-detail-wrap{
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
