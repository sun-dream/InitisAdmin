<template>
  <div>
    <el-table :data="orderSkus" border size="small">
      <el-table-column prop="currency" label="商品" width="200">
        <template slot-scope="scope">
          <div class="product-wrap d-flex align-items-center">
            <div class="img-wrap">
              <v-image :src="getSkuImageSrc(scope.row)" />
            </div>
            <div class="product-info ml-2">
              <p class="title-line">
                {{ scope.row.sku_import&& scope.row.sku_import.title ? scope.row.sku_import.title:'' }}
              </p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="each_overprice" label="单价（基础价格+卖家价格）" width="200">
        <template slot-scope="scope">
          {{ getCurrencySymbols(scope.row.currency) }}
          {{ scope.row.each_base_price+scope.row.each_overprice }}
          ({{ scope.row.each_base_price+'+'+scope.row.each_overprice }})
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="数量" width="80" />
      <el-table-column prop="final_price" label="总额" width="120">
        <template slot-scope="scope">
          {{ getCurrencySymbols(scope.row.currency) }}
          {{ scope.row.final_price }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="110">
        <template slot-scope="scope">
          {{ getOrderskuStatus(scope.row.status).name }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="发货信息" min-width="220">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.shipment_id" content="点击查看物流详情或编辑" placement="top">
            <div class="shipment-info-wrap" @click="goShipmentsHandle(scope.row)">
              <p>运单号：{{ scope.row.shipment.tracking_number }}</p>
              <p>发货时间：{{ scope.row.shipment.ship_at }}</p>
              <p class="d-flex align-items-center justify-content-between">
                <span>预计到达天数：{{ scope.row.shipment.estimated_arrival_days }}</span>
                <span>运送方式：{{ getShipmentsMethod(scope.row.shipment.method).name }}</span>
              </p>
            </div>
          </el-tooltip>
          <div v-else-if="!readOnlyStatus" class="">
            <v-button type="text" size="small" @click="goShipmentsHandle(scope.row)">
              去发货
            </v-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible="showDialog" width="80%" :close-on-click-modal="false" @close="close">
      <div slot="title">
        <span class="title-bold mr-2">订单发货</span>
        <span class="title-info">本次一共发货</span>
        <span class="title-info title-number text-primary">{{ selectSku.length }}</span>
        <span class="title-info">个商品</span>
      </div>
      <shipment-form
        ref="shipmentsForm"
        :select-skus-ids="selectSkuIds"
        :detail-status="true"
        :edit-status="editStatus"
        :default-data="selectSku[0]?selectSku[0].shipment:null"
        @close="close"
      />
      <span slot="footer" class="dialog-footer">
        <v-button type="primary" @click="saveHandler">
          {{ editStatus ? '更新物流信息':'确认发货' }}
        </v-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import VImage from '../../baseComponents/VImage.vue'
import VButton from '../../baseComponents/VButton.vue'
import shipmentForm from './shipmentDialog/shipmentForm'
import ordersMixins from '@/mixins/orders'
import publicUseMixins from '@/mixins/publicUse'
import shipmentsMixins from '@/mixins/shipments'
export default {
  name: 'OrdertDetail',
  components: {
    VImage, VButton, shipmentForm
  },
  mixins: [ordersMixins, publicUseMixins, shipmentsMixins],
  props: {
    orderSkus: {
      type: Array,
      default: () => []
    },
    readOnlyStatus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      editStatus: false,
      selectSku: [],
      showDialog: false
    }
  },
  computed: {
    selectSkuIds () {
      const arr = []
      this.selectSku.forEach((item) => {
        arr.push(item.id)
      })
      return arr
    }
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    saveHandler () {
      this.$refs.shipmentsForm.submitHandler()
    },
    goShipmentsHandle (row) {
      this.showDialog = true
      this.selectSku = [row]
      this.editStatus = !!row.shipment_id
    },
    isShipmentStatus () {
      return false
    },
    getSkuImageSrc (data) {
      const imageKeys = ['image1_id', 'image2_id', 'image3_id', 'image4_id', 'image5_id']
      let src = ''
      if (!data.sku_import) {
        return ''
      }
      for (let i = 0; i < imageKeys.length; i++) {
        if (data.sku_import[imageKeys[i + 1]]) {
          src = data.sku_import[`image${i + 1}`].external_url
          break
        }
      }
      return src
    },
    close () {
      this.showDialog = false
      this.selectSku = []
      this.editStatus = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .title-line{
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;//溢出内容隐藏
  text-overflow: ellipsis;//文本溢出部分用省略号表示
  display: -webkit-box;//特别显示模式
  -webkit-line-clamp: 2;//行数
  line-clamp: 2;
  -webkit-box-orient: vertical;//盒子中内容竖直排列
}
.img-wrap{
    width: 50px;
    height: 50px;
    overflow: hidden;
}
.product-info{
    width: 122px;
}
.shipment-info-wrap{
    height: 50px;
    line-height: 16px;
    cursor: pointer;
}
  .title-bold,.title-number{
    font-weight:bold;
    font-size:16px;
  }
  .title-info{
    font-size:14px;
  }
</style>
