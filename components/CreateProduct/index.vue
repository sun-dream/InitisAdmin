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
import uploadProductFiles from './uploadProductFiles'
// import productDescription from './productDescription'
import createProductMixins from '@/mixins/product/createProduct'
export default {
  name: 'CreateProduct',
  components: { productInfo, uploadProductFiles },
  mixins: [createProductMixins],
  data () {
    return {
      valid: false
      // archivesDialog: false
    }
  },
  mounted () {
    this.stepperIndex = 1
  },
  methods: {
    nextHandler ({ status, data, uploadFileCache }) {
      Object.keys(data).forEach((key) => {
        this.createProductForm[key] = data[key]
      })
      if (status === this.stepStatusEnum.productInfo) {
        this.stepperIndex = 2
        if (uploadFileCache) {
          this.uploadFileCache = uploadFileCache
        }
      } else if (status === this.stepStatusEnum.uploadFiles) {
        this.stepperIndex = 3
      }
    },
    prevHandler ({ status, data, uploadFileCache }) {
      Object.keys(data).forEach((key) => {
        this.createProductForm[key] = data[key]
      })
      if (status === this.stepStatusEnum.uploadFiles) {
        this.stepperIndex = 1
        if (uploadFileCache) {
          this.uploadFileCache = uploadFileCache
        }
      }
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
        // data.skus.forEach((item) => {
        //   item.cost_price = parseFloat(item.cost_price)
        //   item.weight = parseFloat(item.weight)
        //   item.length = parseFloat(item.length)
        //   item.width = parseFloat(item.width)
        //   item.height = parseFloat(item.height)
        // })
      }
      this.createProduct(data)
    }
  }
}
</script>
