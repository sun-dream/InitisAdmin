<template>
  <el-dialog :visible="showDialog" width="80%" :close-on-click-modal="false" @close="close">
    <div slot="title">
      <span class="title-bold mr-2">订单发货</span>
      <span class="title-info">本次一共发货</span>
      <span class="title-info title-number text-primary">{{ selectSku.length }}</span>
      <span class="title-info">个商品</span>
    </div>
    <el-steps :active="stepIndex" simple>
      <el-step title="核验商品信息" />
      <el-step title="填写物流信息" />
    </el-steps>
    <sku-list v-if="stepIndex===0" ref="skuList" :default-data="defaultData" :select-skus.sync="selectSku" />
    <shipment-form v-if="stepIndex===1" ref="shipmentsForm" :select-skus-ids="selectSkuIds" @close="close" />
    <span slot="footer" class="dialog-footer">
      <v-button v-if="stepIndex !== 0" @click="prevHandler">上一步</v-button>
      <v-button v-if="stepIndex !== 1" type="primary" @click="nextHandler">下一步</v-button>
      <v-button v-else type="primary" @click="saveHandler">完成并确认发货</v-button>
    </span>
  </el-dialog>
</template>

<script>
import skuList from './skuList'
import shipmentForm from './shipmentForm'
import VButton from '@/baseComponents/VButton.vue'
import ordersMixins from '@/mixins/orders'
// import VImage from '@/baseComponents/VImage'
export default {
  name: 'ShipmentDialogIndex',
  components: {
    VButton, skuList, shipmentForm
  },
  mixins: [ordersMixins],
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    defaultData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      stepIndex: null,
      selectSku: []
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
    showDialog (newVal) {
      if (newVal) {
        this.stepIndex = 0
      }
    }
  },
  mounted () {
    this.stepIndex = 0
  },
  methods: {
    saveHandler () {
      this.$refs.shipmentsForm.submitHandler()
    },
    nextHandler () {
      if (this.stepIndex === 0 && this.selectSku.length < 1) {
        this.notification({ title: '提示', message: '请至少选中1个待发货的订单', type: 'warning' })
      } else {
        this.stepIndex++
      }
    },
    prevHandler () {
      this.stepIndex--
    },
    close () {
      this.$emit('update:showDialog', false)
    }

  }
}
</script>
<style lang="scss" scoped>
  .title-bold,.title-number{
    font-weight:bold;
    font-size:16px;
  }
  .title-info{
    font-size:14px;
  }
</style>
