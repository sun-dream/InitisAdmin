<template>
  <div :class="editStatus?'info-wrap-edit':'info-wrap'">
    <item-title v-if="!editStatus" text="SKU基础信息" />
    <el-form ref="infoForm" :model="formInfo" :rules="rules" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="名称" prop="title">
            <el-input v-model="formInfo.title" placeholder="sku名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="sku编号" prop="sku_code">
            <el-input v-model="formInfo.sku_code" placeholder="sku编号" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="状态" prop="status">
            <el-select v-model="formInfo.status" placeholder="请选择">
              <el-option
                v-for="item in statusArray"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="重量" prop="weight">
            <el-input v-model.number="formInfo.weight" placeholder="0.1" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="重量单位" prop="unit_of_weight">
            <el-select v-model="formInfo.unit_of_weight" placeholder="请选择">
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
            <el-input v-model.number="formInfo.length" placeholder="1" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="宽度" prop="width">
            <el-input v-model.number="formInfo.width" placeholder="1" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="高度" prop="height">
            <el-input v-model.number="formInfo.height" placeholder="1" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="长量单位" prop="unit_of_length">
            <el-select v-model="formInfo.unit_of_length" placeholder="请选择">
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
import skuofProductMixins from '@/mixins/product/sku'
export default {
  name: 'SkuInfo',
  components: { itemTitle, VButton },
  mixins: [skuofProductMixins],
  props: {
    editStatus: {
      type: Boolean,
      default: false
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
        weight: 0,
        unit_of_weight: 'G',
        length: 0,
        width: 0,
        height: 0,
        unit_of_length: 'MM',
        status: 'ACTIVE',
        sku_code: ''
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
    .info-wrap-edit{
        width:740px;
        margin:0 auto 0;
    }
</style>
