<template>
  <div :class="`${editStatus ? '':'info-wrap'}`">
    <item-title v-if="!editStatus" text="价格管理" />
    <el-form ref="infoFormRef" :model="formInfo" :rules="rules" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="采购价格" prop="purchase_price">
            <v-input v-model.number="formInfo.purchase_price" :loading="loadingState('purchase_price')" placeholder="采购价格" @blur="inputBlur({key:'purchase_price',value:formInfo.purchase_price})" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="样品价格" prop="sample_price">
            <v-input v-model.number="formInfo.sample_price" :loading="loadingState('sample_price')" placeholder="样品价格" @blur="inputBlur({key:'sample_price',value:formInfo.sample_price})" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="成本价" prop="cost_price">
            <v-input v-model.number="formInfo.cost_price" :loading="loadingState('cost_price')" placeholder="成本价" @blur="inputBlur({key:'cost_price',value:formInfo.cost_price})" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="基本价格" prop="base_price">
            <v-input v-model.number="formInfo.base_price" :loading="loadingState('base_price')" placeholder="基本价格" @blur="inputBlur({key:'base_price',value:formInfo.base_price})" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="基本利润" prop="base_profit">
            <v-input v-model.number="formInfo.base_profit" :loading="loadingState('base_profit')" placeholder="基本利润" @blur="inputBlur({key:'base_profit',value:formInfo.base_profit})" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="货币" prop="currency">
            <el-select v-model="formInfo.currency" filterable placeholder="请选择" @change="inputBlur({key:'currency',value:formInfo.currency})">
              <el-option
                v-for="item in currencysOption"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col v-if="!editStatus" :span="24" class="">
          <el-form-item label="">
            <div v-if="!editStatus" class="d-flex btn-warp justify-content-between align-items-center">
              <v-button @click="prevStepHandler">
                上一步
              </v-button>
              <v-button type="primary" @click="nextStepHandler">
                下一步
              </v-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import itemTitle from './itemTitle'
import VButton from '@/baseComponents/VButton'
import skuofProductMixins from '@/mixins/product/sku'
import VInput from '@/baseComponents/VInput'
export default {
  name: 'SkuPrice',
  components: { itemTitle, VButton, VInput },
  mixins: [skuofProductMixins],
  props: {
    editStatus: {
      type: Boolean,
      default: false
    },
    editIndex: {
      type: Number,
      default: 0
    },
    allLoading: {
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
      formInfo: {
        currency: 'AED',
        purchase_price: null,
        sample_price: null,
        cost_price: null,
        base_price: null,
        base_profit: null
      }
    }
  },
  computed: {
    loadingState (itemKey) {
      return (itemKeys) => {
        const itemKey = itemKeys + this.editIndex + 'loading'
        return this.allLoading.includes(itemKey)
      }
    }
  },
  watch: {
    defaultData: {
      deep: true,
      handler (newData, oldData) {
        this.initFormInfo()
      }
    }
  },
  mounted () {
    this.initFormInfo()
  },
  methods: {
    inputBlur ({ key, value }) {
      if (!this.editStatus) {
        return
      }
      this.$refs.infoFormRef.validate((valid) => {
        if (!valid) {
          this.notification({ title: '提示', message: '请正确填写内容！', type: 'warning' })
          return false
        }
        this.$emit('updateHandler', { key, value, index: this.editIndex })
      })
    },
    nextStepHandler () {
      this.$refs.infoFormRef.validate((valid) => {
        if (!valid) {
          this.notification({ title: '提示', message: '请正确填写内容！', type: 'warning' })
          return false
        }
        const params = this.cloneObj(this.formInfo)
        this.$emit('nextHandler', {
          status: this.stepStatusEnum.skuPrice,
          data: params
        })
      })
    },
    prevStepHandler () {
      const params = this.cloneObj(this.formInfo)
      this.$emit('prevHandler', {
        status: this.stepStatusEnum.skuPrice,
        data: params
      })
    },
    initFormInfo () {
      const data = this.cloneObj(this.defaultData)
      Object.keys(this.formInfo).forEach((key) => {
        if (data[key]) {
          this.formInfo[key] = data[key]
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "assets/sass/color";
    .info-wrap{
        margin:40px auto 0;
    }
</style>
