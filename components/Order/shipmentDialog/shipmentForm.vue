<template>
  <el-form ref="infoForm" :model="shipment_create" :rules="rules" label-width="120px" class="mt-4 px-4">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="供应商" prop="title">
          <el-input v-model="shipment_create.provider" placeholder="供应商" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="物流编号" prop="product_code">
          <el-input v-model="shipment_create.tracking_number" placeholder="物流编号" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="预计到达天数" prop="product_code">
          <el-input v-model="shipment_create.cost" placeholder="物流编号" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="费用" prop="product_code">
          <el-input v-model="shipment_create.estimated_arrival_days" placeholder="费用" />
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
        <el-form-item label="发货时间">
          <el-date-picker v-model="shipment_create.ship_at" type="datetime" placeholder="选择日期时间" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import shipmentsMixins from '@/mixins/shipments'
import publicUseMixins from '@/mixins/publicUse'
export default {
  name: 'OrderQuery',
  components: {
  },
  mixins: [shipmentsMixins, publicUseMixins],
  props: {
    defaultData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      rules: {},
      shipment_create: {
        status: 'UNSHIPPED',
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
  computed: {
  },
  mounted () {
    // this.shipment_create.ship_at = new Date('2022-07-15T02:10:53.369Z')
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>

</style>
