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
      @formInfoHandler="saveProducrInfoHandler"
      @archivesSetHandler="archiveHandler"
    />
    <!-- <v-form ref="form" v-model="valid">
      <v-stepper v-model="stepperIndex" alt-labels>
        <v-stepper-header>
          <v-stepper-step :complete="stepperIndex > 1" step="1">
            商品信息
          </v-stepper-step>

          <v-divider />

          <v-stepper-step :complete="stepperIndex > 2" step="2">
            图片与视频
          </v-stepper-step>

          <v-divider />

          <v-stepper-step :complete="stepperIndex > 3" step="3">
            详情描述
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content
            v-for="step in stepperTotal"
            :key="'step_' + step"
            :step="step"
          >
            <product-info
              v-if="step === 1"
              :default-data="createProductForm"
              @formInfoHandler="saveProducrInfoHandler"
              @archivesSetHandler="archiveHandler"
            />
            <upload-img-and-video
              v-if="step === 2"
              :default-data="createProductForm"
              @prevImgAndVideoStep="prevImgAndVideoStep"
              @nextImgAndVideoStep="nextImgAndVideoStep"
              @archivesSetHandler="archiveHandler"
            /> -->
    <!-- <upload-sku
              v-if="step === 3"
              @prevSkuStep="prevSkuStep"
              @nextSkuStep="nextSkuStep"
              @archivesSetHandler="archiveHandler"
              :defaultData="createProductForm"
              :verifyForm="verifyStepHandler"
            /> -->
    <!-- <product-description
              v-if="step === 3"
              :default-data="createProductForm"
              @saveDetail="saveDetail"
              @prevDetail="prevDetail"
              @archivesSetHandler="archiveHandler"
            />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-form> -->
    <!-- <v-dialog v-model="archivesDialog" max-width="500">
      <v-card>
        <v-toolbar color="primary" dark>
          提示！
          <v-spacer />
          <v-toolbar-items>
            <v-btn icon dark @click="archivesDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="text-h5 pa-8">
          已检测到上一次的存档数据，是否加载？
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" text @click="removeArchivesData">
            删除缓存
          </v-btn>
          <v-btn color="primary" text @click="initArchivesData">
            加载缓存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </section>
</template>

<script>
import productInfo from './productInfo'
// import uploadImgAndVideo from './uploadImgAndVideo'
// import productDescription from './productDescription'
import createProductMixins from '@/mixins/product/createProduct'
export default {
  name: 'CreateProduct',
  components: { productInfo },
  mixins: [createProductMixins],
  data () {
    return {
      valid: false
      // archivesDialog: false
    }
  },
  mounted () {
    this.stepperIndex = 1
    // if (this.archivesGet() !== null) {
    //   // this.archivesDialog = true
    // }
    // this.$refs.form.resetValidation()
  },
  methods: {
    removeArchivesData () {
      this.archivesRemove()
      // this.archivesDialog = false
    },
    initArchivesData () {
      const archivesData = this.archivesGet()
      Object.assign(this.createProductForm, archivesData.data)
      this.stepperIndex = archivesData.stepIndex
      // this.archivesDialog = false
    },
    archiveHandler ({ formInfo, obj, skus, detail, stepIndex }) {
      if (!this.verifyStepHandler()) {
        return
      }
      const storageData = this.archivesGet()
      const formData = storageData !== null ? storageData.data : {}
      Object.assign(formData, this.createProductForm)
      if (this.isDef(formInfo)) {
        Object.assign(formData, formInfo)
      }
      if (this.isDef(obj)) {
        Object.assign(formData, obj)
      }
      if (this.isDef(skus)) {
        formData.skus = skus
      }
      if (this.isDef(detail)) {
        formData.detail = detail
      }
      formData.id = 'archives'
      this.notification({
        title: '提示',
        message: '<h4>提示</h4><div>当前内容已加入本地缓存！</div>',
        type: 'success',
        duration: 3000
      })
      this.archivesSet({
        data: formData,
        stepIndex
      })
    },
    verifyStepHandler (step) {
      this.$refs.form.validate()
      if (!this.valid) {
        this.notification({
          title: '提示',
          message: '校验不通过！',
          type: 'warning',
          duration: 3000
        })
        return false
      } else {
        // this.stepperIndex = step + 1 === 5 ? 1 : step + 1;
        return true
      }
    },
    saveProducrInfoHandler ({ formInfo, stepIndex }) {
      Object.keys(formInfo).forEach((key) => {
        this.createProductForm[key] = formInfo[key]
      })
      console.log(this.createProductForm, stepIndex)

      // this.createProductForm.title = formInfo.title
      // this.createProductForm.product_code = formInfo.product_code
      // this.createProductForm.category_id = formInfo.category_id
      // this.createProductForm.status = formInfo.status
      // this.createProductForm.source_name = formInfo.source_name ? formInfo.source_name : ''
      // this.createProductForm.source_contact = formInfo.source_contact ? formInfo.source_contact : ''
      // this.createProductForm.source = formInfo.source ? formInfo.source : ''
      // this.stepperIndex = stepIndex
    },
    nextImgAndVideoStep ({ obj, stepIndex }) {
      if (!this.verifyStepHandler()) {
        return
      }

      this.createProductForm.cover_img = obj.cover_img ? obj.cover_img : null
      this.createProductForm.sample_videos = obj.sample_videos
      this.createProductForm.images = obj.images
      this.stepperIndex = stepIndex
    },
    prevImgAndVideoStep ({ obj, stepIndex }) {
      if (!this.verifyStepHandler()) {
        return
      }
      this.createProductForm.cover_img = obj.cover_img
      this.createProductForm.sample_videos = obj.sample_videos
      this.createProductForm.images = obj.images
      this.stepperIndex = stepIndex
    },
    nextSkuStep ({ skus, stepIndex }) {
      if (!this.verifyStepHandler()) {
        return
      }
      this.createProductForm.skus = skus
      this.stepperIndex = stepIndex
    },
    prevSkuStep ({ skus, stepIndex }) {
      if (!this.verifyStepHandler()) {
        return
      }
      this.createProductForm.skus = skus
      this.stepperIndex = stepIndex
    },
    prevDetail ({ detail, stepIndex }) {
      if (!this.verifyStepHandler()) {
        return
      }
      this.createProductForm.detail = detail
      this.stepperIndex = stepIndex
    },
    saveDetail ({ detail, stepIndex }) {
      if (!this.verifyStepHandler()) {
        return
      }
      this.createProductForm.detail = detail
      this.saveStepHandler(stepIndex)
      // this.stepperIndex = stepIndex
    },
    saveStepHandler (stepIndex) {
      const data = this.cloneObj(this.createProductForm)
      if (data.skus.length > 0) {
        data.skus.forEach((item) => {
          delete item.uploadImages
          delete item.uploadImagesValue
          delete item.skuNumberState
          delete item.number
          delete item.calculate

          item.cost_price = parseFloat(item.cost_price)
          item.recommend_retail_price = parseFloat(item.recommend_retail_price)
          item.weight = parseFloat(item.weight)
          item.length = parseFloat(item.length)
          item.width = parseFloat(item.width)
          item.height = parseFloat(item.height)
        })
      }
      delete data.id
      this.createProduct(data)
    }
  }
}
</script>
