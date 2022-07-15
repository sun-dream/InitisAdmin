<template>
  <el-form ref="shipmentForm" :model="shipment_create" :rules="shipmentsRules" label-width="120px" class="mt-4 px-4">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="供应商" prop="provider">
          <el-input v-model="shipment_create.provider" placeholder="供应商" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="物流编号" prop="tracking_number">
          <el-input v-model="shipment_create.tracking_number" placeholder="物流编号" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="预计到达天数" prop="estimated_arrival_days">
          <el-input v-model.number="shipment_create.estimated_arrival_days" placeholder="物流编号" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="配送方式">
          <el-select v-model="shipment_create.method" placeholder="请选择">
            <el-option
              v-for="item in shipmentsMethodOption"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="费用" prop="cost">
          <el-input v-model.number="shipment_create.cost" placeholder="费用" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="货币代码">
          <el-select v-model="shipment_create.currency" filterable placeholder="请选择">
            <el-option
              v-for="item in currencysOption"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="发货状态">
          <el-select v-model="shipment_create.status" placeholder="请选择">
            <el-option
              v-for="item in shipmentsStatusOption"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col v-if="!editStatus" :span="12">
        <el-form-item label="发货时间" prop="ship_at">
          <el-date-picker
            v-model="shipment_create.ship_at"
            value-format="timestamp"
            type="datetime"
            placeholder="选择日期时间"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import shipmentsMixins from '@/mixins/shipments'
import ordersMixins from '@/mixins/orders'
import publicUseMixins from '@/mixins/publicUse'
export default {
  name: 'OrderQuery',
  components: {
  },
  mixins: [shipmentsMixins, publicUseMixins, ordersMixins],
  props: {
    editStatus: {
      type: Boolean,
      default: false
    },
    detailStatus: {
      type: Boolean,
      default: false
    },
    selectSkusIds: {
      type: Array,
      default: () => []
    },
    defaultData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      shipment_create: {
        status: 'SHIPPED',
        method: 'SEA',
        provider: '',
        tracking_number: '',
        ship_at: '',
        estimated_arrival_days: 0,
        cost: 0,
        currency: 'USD'
      }
    }
  },
  watch: {
    selectSkusIds (newVal) {
      this.initForm()
    }
  },
  mounted () {
    this.initForm()
  },
  methods: {
    initForm () {
      if (this.defaultData && this.defaultData.id) {
        Object.keys(this.shipment_create).forEach((key) => {
          if (key !== 'ship_at') {
            this.shipment_create[key] = this.defaultData[key]
          }
        })
      } else {
        this.shipment_create = {
          status: 'SHIPPED',
          method: 'SEA',
          provider: '',
          tracking_number: '',
          ship_at: new Date().getTime(),
          estimated_arrival_days: 0,
          cost: 0,
          currency: 'USD'
        }
      }
    },
    submitHandler () {
      this.$refs.shipmentForm.validate((valid) => {
        if (!valid) {
          this.notification({ title: '提示', message: '请正确填写内容！', type: 'warning' })
          return false
        }

        if (this.editStatus) {
          delete this.shipment_create.ship_at
          this.notification({ title: '提示', message: '正在更新...', type: 'warning' })
          this.updateShipments({ params: this.shipment_create, id: this.defaultData.id })
            .then((resp) => {
              this.notification({
                title: '请求结果',
                message: '更新成功，正在重载中...',
                type: 'success'
              })
              this.$emit('close')
              this.getOrderData({ query: this.$route.params.id })
            })
        } else {
          const params = {
            shipment_create: this.cloneObj(this.shipment_create),
            order_sku_ids: this.selectSkusIds
          }
          params.shipment_create.ship_at = Math.round(this.shipment_create.ship_at / 1000)
          this.notification({ title: '提示', message: '正在生成发货信息', type: 'warning' })
          this.createShipments(params)
            .then((resp) => {
              this.notification({
                title: '请求结果',
                message: `${this.selectSkusIds.length}个商品发货成功，正在重载列表`,
                type: 'success'
              })
              this.$emit('close')
              if (this.detailStatus) {
                this.getOrderData({ query: this.$route.params.id })
              } else {
                this.getOrderData()
              }
            })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
