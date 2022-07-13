<template>
  <div :class="`${editStatus ? '':'info-wrap'}`">
    <item-title v-if="!editStatus" text="SKU基础信息" />
    <el-form ref="infoForm" :model="formInfo" :rules="rules" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="名称" prop="title">
            <v-input v-model="formInfo.title" :loading="loadingState('title')" placeholder="sku名称" @blur="inputBlur({key:'title',value:formInfo.title})" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="sku编号" prop="sku_code">
            <v-input v-model="formInfo.sku_code" :loading="loadingState('sku_code')" placeholder="sku编号" @blur="inputBlur({key:'sku_code',value:formInfo.sku_code})" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="状态" prop="status">
            <el-select v-model="formInfo.status" placeholder="请选择" @change="inputBlur({key:'status',value:formInfo.status})">
              <el-option
                v-for="item in skuStatusArray"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="重量" prop="weight">
            <v-input v-model.number="formInfo.weight" :loading="loadingState('weight')" placeholder="商品重量" @blur="inputBlur({key:'weight',value:formInfo.weight})" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="重量单位" prop="unit_of_weight">
            <el-select v-model="formInfo.unit_of_weight" placeholder="请选择" @change="inputBlur({key:'unit_of_weight',value:formInfo.unit_of_weight})">
              <el-option
                v-for="item in unitOfWeightArray"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="长度" prop="length">
            <v-input v-model.number="formInfo.length" :loading="loadingState('length')" placeholder="商品长度" @blur="inputBlur({key:'length',value:formInfo.length})" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="宽度" prop="width">
            <v-input v-model.number="formInfo.width" :loading="loadingState('width')" placeholder="商品宽度" @blur="inputBlur({key:'width',value:formInfo.width})" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="高度" prop="height">
            <v-input v-model.number="formInfo.height" :loading="loadingState('height')" placeholder="商品高度" @blur="inputBlur({key:'height',value:formInfo.height})" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="长量单位" prop="unit_of_length">
            <el-select v-model="formInfo.unit_of_length" placeholder="请选择" @change="inputBlur({key:'unit_of_length',value:formInfo.unit_of_length})">
              <el-option
                v-for="item in unitOfWeightArray"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="!editStatus" :span="24" class="">
          <el-form-item label="">
            <v-button type="primary" @click="nextStepHandler">
              下一步
            </v-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import itemTitle from './itemTitle'
import VButton from '@/baseComponents/VButton'
import VInput from '@/baseComponents/VInput'
import skuofProductMixins from '@/mixins/product/sku'
export default {
  name: 'SkuInfo',
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
        title: '',
        weight: null,
        unit_of_weight: 'G',
        length: null,
        width: null,
        height: null,
        unit_of_length: 'MM',
        status: 'ACTIVE',
        sku_code: ''
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
      this.$refs.infoForm.validate((valid) => {
        if (!valid) {
          this.notification({ title: '提示', message: '请正确填写内容！', type: 'warning' })
          return false
        }
        this.$emit('updateHandler', { key, value, index: this.editIndex })
      })
    },
    nextStepHandler () {
      this.$refs.infoForm.validate((valid) => {
        if (!valid) {
          this.notification({ title: '提示', message: '请正确填写内容！', type: 'warning' })
          return false
        }
        const params = this.cloneObj(this.formInfo)
        this.$emit('nextHandler', {
          status: this.stepStatusEnum.skuInfo,
          data: params
        })
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
