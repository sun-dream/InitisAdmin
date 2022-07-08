<template>
  <section class="w-100">
    <upload-product-files
      :edit-status="true"
      :default-data="createProductForm"
      :default-upload-file-cache="uploadFileCache"
      @nextHandler="nextHandler"
    />
    <product-info
      :edit-status="true"
      :default-data="createProductForm"
      @nextHandler="nextHandler"
    />
    <product-description
      :edit-status="true"
      :default-data="createProductForm"
      @nextHandler="nextHandler"
    />
  </section>
</template>

<script>
import productInfo from '@/components/CreateProduct/productInfo'
import productDescription from '@/components/CreateProduct/productDescription'
import uploadProductFiles from '@/components/CreateProduct/uploadProductFiles'
import createProductMixins from '@/mixins/product/createProduct'
export default {
  name: 'EditProduct',
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
      }
    },
    createHandler () {
      const data = this.cloneObj(this.createProductForm)
      this.createProduct(data)
    }
  }
}
</script>
