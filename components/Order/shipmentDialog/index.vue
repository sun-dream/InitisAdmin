<template>
  <el-dialog :visible="showDialog" width="80%" @close="close">
    <div slot="title">
      <span class="title-bold mr-2">订单发货</span>
      <span class="title-info">本次一共发货</span>
      <span class="title-info title-number text-primary">{{ selectSku.length }}</span>
      <span class="title-info">个商品</span>
    </div>
    <el-steps :active="stepIndex" simple>
      <el-step title="核验商品信息" />
      <el-step title="填写物流信息" />
      <el-step title="完成" />
    </el-steps>
    <sku-list v-if="stepIndex===0" ref="skuList" :default-data="defaultData" :select-skus.sync="selectSku" />
    <span slot="footer" class="dialog-footer">
      <v-button @click="close">取 消</v-button>
      <v-button type="primary" @click="nextHandler">下一步</v-button>
    </span>
  </el-dialog>
</template>

<script>
import skuList from './skuList'
import VButton from '@/baseComponents/VButton.vue'
import ordersMixins from '@/mixins/orders'
// import VImage from '@/baseComponents/VImage'
export default {
  name: 'OrderQuery',
  components: {
    VButton, skuList
    // VImage
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
  watch: {
    showDialog (newVal) {
      if (newVal) {
        this.stepIndex = 0
      }
    }
  },
  methods: {
    selectSkuHandler ({ data }) {

    },
    nextHandler () {
      if (this.stepIndex === 0 && this.selectSku.length < 1) {
        this.notification({ title: '提示', message: '请至少选中1个待发货的订单', type: 'warning' })
      }
      this.stepIndex++
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
