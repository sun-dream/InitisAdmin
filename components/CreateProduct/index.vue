<template>
  <section class="w-100 h-100 p-3">
    <el-steps :active="stepperIndex" simple>
      <el-step title="商品信息" icon="el-icon-edit" />
      <el-step title="上传图片" icon="el-icon-upload" />
      <el-step title="商品详情" icon="el-icon-picture" />
    </el-steps>
    <product-info
      v-if="stepperIndex === 1"
      :default-data="createProductForm"
      @nextHandler="nextHandler"
    />
    <upload-product-files
      v-if="stepperIndex === 2"
      :default-data="createProductForm"
      :default-upload-file-cache="uploadFileCache"
      @nextHandler="nextHandler"
      @prevHandler="prevHandler"
    />
    <product-description
      v-if="stepperIndex === 3"
      :default-data="createProductForm"
      @nextHandler="nextHandler"
      @prevHandler="prevHandler"
    />
  </section>
</template>

<script>
import productInfo from './productInfo'
import productDescription from './productDescription'
import uploadProductFiles from './uploadProductFiles'
import createProductMixins from '@/mixins/product/createProduct'
export default {
  name: 'CreateProduct',
  components: { productInfo, uploadProductFiles, productDescription },
  mixins: [createProductMixins],
  data () {
    return {
    }
  },
  mounted () {
    this.initDefaultData()
  },
  methods: {
    nextHandler ({ status, data, uploadFileCache }) {
      Object.keys(data).forEach((key) => {
        this.createProductForm[key] = data[key]
      })
      if (status === this.stepStatusEnum.uploadFiles && this.isDef(uploadFileCache)) {
        this.uploadFileCache = uploadFileCache
      }
      if (status === this.stepStatusEnum.description) {
        this.createHandler()
      } else {
        this.stepperIndex++
      }
    },
    prevHandler ({ status, data, uploadFileCache }) {
      Object.keys(data).forEach((key) => {
        this.createProductForm[key] = data[key]
      })
      if (status === this.stepStatusEnum.uploadFiles) {
        if (uploadFileCache) {
          this.uploadFileCache = uploadFileCache
        }
      }
      this.stepperIndex--
    },
    createHandler () {
      const data = this.cloneObj(this.createProductForm)
      this.createProduct(data)
    }
  }
}
</script>
