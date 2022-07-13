<template>
  <div class="upload-wrap">
    <item-title v-if="!editStatus" text="图片管理" />
    <div class="el-upload__tip mb-2">
      只能上传
      <span class="text-danger ">.jpg/.jpeg/.png</span>
      文件，且不超过
      <span class="text-danger ">300kb </span>
      ，尺寸为
      <span class="text-danger ">300*300</span>
      ，还可以上传
      <span class="text-danger ">{{ uploadImagesLength }}</span>
      张图片
    </div>
    <template v-for="(value,key) in imageIds">
      <el-upload
        :key="key"
        :ref="`uploadImg${key}`"
        class="image-uploader"
        action=""
        :show-file-list="false"
        accept=".jpg,.jpeg,.png"
        :before-upload="beforePicUpload"
        :http-request="uploadPicRequest"
      >
        <div v-if="getImageSrc(key,value)" class="avatar pos-r" @click.stop="()=>{}">
          <v-image :src="getImageSrc(key,value)" @click.stop="()=>{}" />
          <div class="pos-a  pic-item-edit justify-content-center align-items-center">
            <i class="el-icon-zoom-in" @click.stop="enlargePicHandler(key,value)" />
            <i class="el-icon-delete" @click.stop="handlePicRemove(key)" />
          </div>
        </div>
        <i v-else class="el-icon-plus image-uploader-icon" @click="handleSelectItem(key)" />
      </el-upload>
    </template>
    <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="previewSrcList" />
    <div v-if="!editStatus" class="d-flex btn-warp justify-content-between align-items-center">
      <v-button @click="prevStepHandler">
        上一步
      </v-button>
      <v-button type="primary" @click="nextStepHandler">
        完成Sku创建
      </v-button>
    </div>
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import itemTitle from './itemTitle'
import skuofProductMixins from '@/mixins/product/sku'
import VButton from '@/baseComponents/VButton'
import VImage from '@/baseComponents/VImage'
import * as mUtils from '@/assets/utils/mUtils'
export default {
  name: 'SkuImages',
  // eslint-disable-next-line vue/no-unused-components
  components: { VButton, itemTitle, VImage, ElImageViewer },
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
      selectUploadKey: null,
      imageIds: { image1_id: null, image2_id: null, image3_id: null, image4_id: null, image5_id: null },
      images: { image1: {}, image2: {}, image3: {}, image4: {}, image5: {} },
      previewSrcList: [],
      showViewer: false
    }
  },
  computed: {
    uploadImagesLength () {
      let n = 0
      Object.keys(this.imageIds).forEach((key) => {
        if (this.imageIds[key] === null) {
          n++
        }
      })
      return n
    },
    getImageSrc (key, value) {
      return function (key, value) {
        if (key && value) {
          const keys = key.split('_')[0]
          return this.images[keys].external_url
        } else {
          return ''
        }
      }
    }
  },
  watch: {
    defaultData: {
      deep: true,
      handler (newData, oldData) {
        this.initData()
      }
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    handlePicRemove (key) {
      const keys = key.split('_')[0]
      this.images[keys] = {}
      this.imageIds[key] = null
    },
    closeViewer () {
      this.showViewer = false
      this.previewSrcList[0] = ''
    },
    enlargePicHandler (key, value) {
      this.showViewer = true
      this.previewSrcList[0] = key && value ? this.cloneObj(this.getImageSrc(key, value)) : ''
    },
    handleSelectItem (key) {
      this.selectUploadKey = key
    },
    beforePicUpload (file) {
      return new Promise((resolve, reject) => {
        const isLt = file.size / 1024 < 200 // 判断是否小于200Kb
        if (!isLt) {
          this.notification({ title: '提示', message: '图片大小不能超过300KB! 请重新上传', type: 'warning' })
          reject(new Error('图片大小不能超过300KB!'))
        } else {
          mUtils.asyncImgChecked({ file, width: 300, height: 300 })
            .then((data) => {
              if (data) {
                resolve(true)
              } else {
                reject(new Error('图片尺寸不小能大于300 X 300!'))
                this.notification({ title: '提示', message: '图片尺寸不小能大于300 X 300', type: 'warning' })
              }
            })
        }
      })
    },
    uploadPicRequest (param) {
      this.uploadFiles({ data: param.file })
        .then((resp) => {
          if (!resp) {
            return
          }
          this.imageIds[this.selectUploadKey] = resp.id
          const keys = this.selectUploadKey.split('_')[0]
          this.images[keys] = resp
          if (!this.editStatus) {
            this.notification({ title: '提示', message: '上传成功！', type: 'success' })
            return
          }
          this.$emit('updateHandler', { key: this.selectUploadKey, value: resp.id, index: this.editIndex })
          this.selectUploadKey = null
        })
    },
    nextStepHandler () {
      if (this.uploadImagesLength !== 0) {
        this.notification({ title: '提示', message: '必须上传五张图片', type: 'warning' })
        return
      }
      const params = this.cloneObj(this.imageIds)
      this.$emit('nextHandler', {
        status: this.stepStatusEnum.skuImage,
        data: params,
        imagesResp: this.images
      })
    },
    prevStepHandler () {
      const params = this.cloneObj(this.imageIds)
      this.$emit('prevHandler', {
        status: this.stepStatusEnum.skuImage,
        data: params,
        imagesResp: this.images
      })
    },
    initData () {
      const data = this.cloneObj(this.defaultData)
      for (let i = 0; i < this.maxNumOfPicUpload; i++) {
        if (data[`image${i + 1}_id`]) {
          this.imageIds[`image${i + 1}_id`] = data[`image${i + 1}_id`]
          this.images[`image${i + 1}`] = data[`image${i + 1}`]
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "assets/sass/color";
    .upload-wrap{
        width:740px;
        margin:40px auto 0;
    }
    .btn-warp{
        margin-top: 20px;
    }
    .image-uploader {
      display: inline-block;
      margin-right: 10px;
    }
    ::v-deep .image-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    ::v-deep .image-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .image-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
      &:hover{
        .pic-item-edit{
          display: flex;
        }
      }
      .pic-item-edit{
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0,0,0,.5);
        display: none;
        transition: background-color .2s;
        i{
          color: #fff;
          font-weight: bold;
          font-size: 16px;
          margin: 0 10px;
          transition: all .2s;
          &:hover{
            transform: scale(1.2);
          }
        }
      }
    }
</style>
