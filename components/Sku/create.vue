<template>
  <section class="sku-wrap p-3">
    <el-steps :active="stepperIndex" simple>
      <el-step title="SKU基础信息" icon="el-icon-edit" />
      <el-step title="价格管理" icon="el-icon-s-operation" />
      <el-step title="商品详情" icon="el-icon-picture" />
    </el-steps>
    <div class="step-wrap">
      <sku-info
        v-if="stepperIndex === 1"
        :default-data="skuOfProductForm"
        @nextHandler="nextHandler"
      />
      <sku-price
        v-if="stepperIndex === 2"
        :default-data="skuOfProductForm"
        @nextHandler="nextHandler"
        @prevHandler="prevHandler"
      />
      <sku-images
        v-if="stepperIndex === 3"
        :default-data="skuOfProductForm"
        @nextHandler="nextHandler"
        @prevHandler="prevHandler"
      />
    </div>
  </section>
</template>

<script>

import skuofProductMixins from '@/mixins/product/sku'
import allProductMixins from '@/mixins/product/allProduct'
import skuInfo from '@/components/Sku/skuInfo'
import skuPrice from '@/components/Sku/skuPrice'
import SkuImages from '@/components/Sku/skuImages'
export default {
  name: 'CreateSku',
  components: { skuInfo, skuPrice, SkuImages },
  mixins: [skuofProductMixins, allProductMixins],
  data () {
    return {
    }
  },
  mounted () {
    this.initData()
    this.initDefaultData()
  },
  methods: {
    initData () {
      this.getProductItem(this.$route.params.id).then((resp) => {
      })
    },
    nextHandler ({ status, data, imagesResp }) {
      Object.keys(data).forEach((key) => {
        this.skuOfProductForm[key] = data[key]
      })
      if (imagesResp && Object.keys(imagesResp)) {
        Object.keys(imagesResp).forEach((key) => {
          this.skuOfProductForm[key] = imagesResp[key]
        })
      }
      if (status === this.stepStatusEnum.skuImage) {
        this.createHandler()
      } else {
        this.stepperIndex++
      }
    },
    prevHandler ({ status, data, imagesResp }) {
      Object.keys(data).forEach((key) => {
        this.skuOfProductForm[key] = data[key]
      })
      if (imagesResp && Object.keys(imagesResp)) {
        Object.keys(imagesResp).forEach((key) => {
          this.skuOfProductForm[key] = imagesResp[key]
        })
      }
      this.stepperIndex--
    },
    createHandler () {
      const data = this.cloneObj(this.skuOfProductForm)
      data.product_id = this.productItem.id
      this.createSku({ data, id: data.product_id })
    }
  }
}
</script>
<style lang="scss" scoped>
  .step-wrap{
    width: 780px;
    margin: 0 auto;
  }
</style>
