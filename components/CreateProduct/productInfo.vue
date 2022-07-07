<template>
  <div class="info-wrap">
    <el-form ref="infoForm" :model="formInfo" :rules="rules" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="名称" prop="title">
            <el-input v-model="formInfo.title" placeholder="商品名称" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="商品编号" prop="product_code">
            <el-input v-model="formInfo.product_code" placeholder="商品编号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品状态" prop="status">
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
          <el-form-item label="商品类别" prop="category_id">
            <el-select v-model="formInfo.category_id" placeholder="请选择">
              <el-option
                v-for="item in categoryData"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="厂名" prop="source_name">
            <el-input v-model="formInfo.source_name" placeholder="厂商名称" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="厂家联系方式" prop="source_contact">
            <el-input v-model="formInfo.source_contact" placeholder="电话/手机" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="厂家网址" prop="source">
            <el-input v-model="formInfo.source" placeholder="http://...." />
          </el-form-item>
        </el-col>
        <el-col :span="24" class="">
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
import createProductMixins from '@/mixins/product/createProduct'
import categoryMixins from '@/mixins/product/category'
import publicUseMixins from '@/mixins/publicUse'
import VButton from '@/baseComponents/VButton'
export default {
  name: 'ProductInfo',
  components: { VButton },
  mixins: [createProductMixins, categoryMixins, publicUseMixins],
  props: {
    hideStep: {
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
        source_name: '',
        source_contact: '',
        source: '',
        category_id: null,
        status: 'ON_SALE',
        product_code: ''
      }
    }
  },
  watch: {
  },
  mounted () {
    this.initFormInfo()
    this.getCategoryAllData({ query: '', limit: 100 })
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
          status: this.stepStatusEnum.productInfo,
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
    .info-wrap{
        width:600px;
        margin:40px auto 0;
    }
</style>
