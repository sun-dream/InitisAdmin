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
          <el-form-item label="商品类别">
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
          <el-form-item label="厂名">
            <el-input v-model="formInfo.source_name" placeholder="厂商名称" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="厂家联系方式">
            <el-input v-model="formInfo.source_contact" placeholder="电话/手机" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="厂家网址">
            <el-input v-model="formInfo.source" placeholder="http://...." />
          </el-form-item>
        </el-col>
        <el-col :span="24" class="">
          <el-form-item label="">
            <el-button @click="archivesSetHandler(formInfo)">
              存档
            </el-button>
            <el-button type="primary" @click="nextStepHandler">
              下一步
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
      </el-form-item>
    </el-form>
  </div>

  <!-- <v-container>
    <section v-if="!hideStep" class="d-flex justify-end">
      <v-btn class="ml-2" @click="archivesSetHandler(formInfo)">
        存档
      </v-btn>
      <v-btn color="primary" class="ml-2" @click="nextStepHandler">
        下一步
      </v-btn>
    </section>
  </v-container> -->
</template>

<script>
import createProductMixins from '@/mixins/product/createProduct'
import categoryMixins from '@/mixins/product/category'
import publicUseMixins from '@/mixins/publicUse'
export default {
  name: 'ProductInfo',
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
    defaultData: {
      handler (newVal) {
        this.initFormInfo(newVal)
      },
      deep: true
    }
  },
  mounted () {
    this.initFormInfo()
    this.getCategoryAllData({ query: '', limit: 100 })
    // this.loadShippingList();
  },
  methods: {
    archivesSetHandler (val) {
      this.$emit('archivesSetHandler', { formInfo: val, stepIndex: 1 })
    },
    nextStepHandler () {
      const params = this.cloneObj(this.formInfo)
      this.$emit('formInfoHandler', { formInfo: params, stepIndex: 2 })
    },
    initFormInfo (newVal) {
      let data = {}
      if (this.isDef(this.defaultData) && this.isDef(this.defaultData.id)) {
        data = this.cloneObj(this.defaultData)
      } else if (newVal) {
        data = this.cloneObj(newVal)
      }
      this.formInfo.title = data.title
      this.formInfo.source_name = data.source_name
      this.formInfo.source_contact = data.source_contact
      this.formInfo.source = data.source === 'http://' ? '' : data.source
      this.formInfo.category_id = data.category_id
      this.formInfo.status = data.status
      this.formInfo.product_code = data.product_code
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
