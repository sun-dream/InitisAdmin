<template>
  <div v-if="refundRequestItem&&refundRequestItem.id" class="detail-wrap">
    <v-blockquote text="退款订单">
      <v-button type="primary" size="small" @click="openHandler">
        更新退款状态
      </v-button>
    </v-blockquote>
    <el-row :gutter="20" class="detail-item">
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">订单id:</span>{{ refundRequestItem.id || '-' }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">支付订单ID:</span>
        {{ refundRequestItem.payment_id }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">退款状态:</span>{{ getRefundRequestsStatus(refundRequestItem.status)['name'] || '-' }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">退款时间:</span>
        <i class="el-icon-time" />
        {{ getDate(refundRequestItem.create_at) }}
      </el-col>
      <el-col :span="24" class="detail-item-line">
        <span class="item-title fontBold">退款原因:</span>
        {{ refundRequestItem.note }}
      </el-col>
    </el-row>
    <template v-if="refundRequestItem.status === 'REJECTED'||refundRequestItem.status === 'CANCELLED'">
      <v-blockquote text="拒绝原因" />
      <el-row :gutter="20" class="detail-item">
        <el-col :span="10" class="detail-item-line">
          <span class="item-title fontBold">拒绝原因:</span>{{ refundRequestItem.reject_note || '-' }}
        </el-col>
      </el-row>
    </template>
    <v-blockquote text="订单SKU信息" />
    <el-row :gutter="20" class="detail-item">
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">订单id:</span>
        <v-link :name="'order'" :query="{query:orderSku.order_id}">
          {{ orderSku.id || '-' }}
        </v-link>
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">购买时间:</span>
        <i class="el-icon-time" />
        {{ getDate(orderSku.create_at) || '-' }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">单价(原价 + 溢价):</span>
        {{ getCurrencySymbols(orderSku.currency)||'-' }}
        {{ orderSku.each_base_price }} +  {{ orderSku.each_overprice }} = {{ orderSku.each_base_price + orderSku.each_overprice }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">数量:</span>
        {{ orderSku.quantity }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">总价:</span>
        {{ getCurrencySymbols(orderSku.currency)||'-' }} {{ orderSku.final_price }}
      </el-col>
      <el-col :span="10" class="detail-item-line">
        <span class="item-title fontBold">状态:</span>
        {{ getOrderskuStatus(orderSku.status)['name']||'-' }}
      </el-col>
      <el-col :span="24" class="detail-item-line d-flex align-items-start ">
        <span class="item-title fontBold">图片:</span>
        <div v-for="(item,index) in picSrcs" :key="item+index" class="d-inline-block pic-wrap mr-2">
          <VImage :src="item" />
        </div>
      </el-col>
    </el-row>
    <update-refund-dialog :show.sync="updateRefundVisible" :default-data="refundRequestItem" detail-status />
  </div>
  <div v-else class="text-center text-info">
    未检测到所属信息
  </div>
</template>

<script>

import VLink from '../../baseComponents/VLink.vue'
import VImage from '../../baseComponents/VImage.vue'
import VButton from '../../baseComponents/VButton.vue'
import updateRefundDialog from './updateRefundDialog'
import ordersMixins from '@/mixins/orders'
import publicUseMixins from '@/mixins/publicUse'
import refundRequestsMixins from '@/mixins/refundReuqests'
import VBlockquote from '@/baseComponents/VBlockquote'
import * as mUtils from '@/assets/utils/mUtils'
export default {
  name: 'RefundRequestsDetail',
  components: {
    VBlockquote, VLink, VImage, VButton, updateRefundDialog
  },
  mixins: [refundRequestsMixins, publicUseMixins, ordersMixins],
  props: {
  },
  data () {
    return {
      refundReque: {},
      piclength: 5,
      updateRefundVisible: false
    }
  },
  computed: {
    getDate (val) {
      return function (val) {
        return mUtils.formatDate(val, 3)
      }
    },
    orderSku () {
      if (this.refundRequestItem.order_sku && this.refundRequestItem.order_sku_id) {
        return this.refundRequestItem.order_sku
      } else {
        return {}
      }
    },
    picSrcs () {
      const arr = []
      if (this.orderSku && this.orderSku.id && this.orderSku.sku_import.id) {
        for (let i = 0; i < this.piclength; i++) {
          const key = 'image'
          const index = i + 1
          if (this.orderSku.sku_import[key + index] && this.orderSku.sku_import[key + index].id && this.orderSku.sku_import[key + index + '_id']) {
            arr.push(this.orderSku.sku_import[key + index].external_url)
          }
        }
      }
      return arr
    }
  },
  watch: {
  },
  methods: {
    openHandler () {
      this.updateRefundVisible = true
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
