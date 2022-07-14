<template>
  <section class="w-100">
    <order-query :shipment-sku="shipmentSku" />
    <el-table :data="orderList" border size="small" max-height="700" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="customer_id" label="客户" width="180">
        <template slot-scope="scope">
          <div v-if="scope.row.customer_id" class="customer-wrap">
            <p>名字：{{ scope.row.customer.full_name||'-' }}</p>
            <p>电话：{{ scope.row.customer.phone||'-' }}</p>
            <p>邮箱：{{ scope.row.customer.email||'-' }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="order_skus" label="sku数量 / 待发货" width="140">
        <template slot-scope="scope">
          <div class="d-flex justify-content-between align-items-center ">
            <el-tag size="small" effect="dark">
              {{ scope.row.order_skus.length }}
            </el-tag>
            <el-tag v-if="getOrderSkuUndeliveredQuantity(scope.row.order_skus).length" type="warning" size="small" effect="dark">
              {{ getOrderSkuUndeliveredQuantity(scope.row.order_skus).length }}
            </el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="quantity" label="购买数量" width="80" />
      <el-table-column prop="total_price" label="订单金额" width="120">
        <template slot-scope="scope">
          {{ getCurrencySymbols(scope.row.currency) }} {{ scope.row.total_price }}
        </template>
      </el-table-column>
      <el-table-column prop="create_at" label="购买时间" width="110">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ getDate(scope.row.create_at) }}
        </template>
      </el-table-column>
      <el-table-column prop="note" label="备注" min-width="110">
        <template slot-scope="scope">
          <p class="title-line">
            {{ scope.row.note }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addressViewHandler(scope.row)">
            收获地址
          </el-button>
          <el-button type="text" size="small" @click="jumpTo({name:'order-detail-id',params:{id:scope.row.id}})">
            订单详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <address-dialog
      :dialog-status.sync="addressDialogStatus"
      :default-data="selectRowData"
    />
    <v-paginations
      :vuex-path="orderVuexBasePath"
      algin-right
      @pageChange="getOrderData()"
    />
  </section>
</template>
<script>
import addressDialog from './addressDialog.vue'
import orderQuery from './orderQuery.vue'
import ordersMixins from '@/mixins/orders'
import userMixins from '@/mixins/user'
import publicUseMixins from '@/mixins/publicUse'
import * as mUtils from '@/assets/utils/mUtils'
import VPaginations from '@/baseComponents/VPaginations'
export default {
  name: 'MyOrder',
  components: {
    VPaginations, addressDialog, orderQuery
  },
  mixins: [ordersMixins, userMixins, publicUseMixins],
  data () {
    return {
      selectRowData: {},
      shipmentSku: [],
      addressDialogStatus: false
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
    handleSelectionChange (val) {
      const rows = this.cloneObj(val)
      let arr = []
      if (Array.isArray(rows) && rows.length > 0) {
        rows.forEach((order) => {
          if (Array.isArray(order.order_skus) && order.order_skus.length > 0) {
            const skuUnFulfilleds = this.getOrderSkuUndeliveredQuantity(order.order_skus)
            if (skuUnFulfilleds.length > 0) {
              arr.push(...skuUnFulfilleds)
            }
          }
        })
        // && Array.isArray(val.order_skus) && val.order_skus.length > 0
      } else {
        arr = []
      }
      this.shipmentSku = arr
    },
    addressViewHandler (data) {
      this.selectRowData = data
      this.addressDialogStatus = true
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
  -webkit-line-clamp: 2;//行数
  line-clamp: 2;
  -webkit-box-orient: vertical;//盒子中内容竖直排列
}
.customer-wrap{
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
