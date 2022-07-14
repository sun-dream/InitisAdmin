<template>
  <div class="upload-wrap">
    <item-title text="商品视频" />
    <div class="el-upload__tip">
      只能上传
      <span class="text-danger ">.mp4</span>
      文件，还可以上传
      <span class="text-danger ">{{ videoObject.id ? 0 : 1 }}</span>
      个视频
    </div>
    <el-upload
      v-if="!videoObject.id"
      class="video-uploader"
      action=""
      accept=".mp4"
      :show-file-list="false"
      :http-request="uploadRequest"
      :on-success="uploadVideoSuccess"
    >
      <i class="el-icon-plus video-uploader-icon" />
    </el-upload>
    <div v-else class="video-player-wrap pos-r">
      <div class="pos-a video-player-remove">
        <v-button type="danger" size="small" circle icon="el-icon-delete" @click="uploadVideoRemove" />
      </div>
      <video width="320" height="240" controls class="video-player">
        <source :src="videoObject.id ? videoObject.data.external_url :''" type="video/mp4">
        您的浏览器不支持Video标签。
      </video>
    </div>
    <item-title text="商品主图" />
    <template v-for="(value,key) in imageIds">
      <el-upload
        :key="key"
        :ref="`uploadImg${key}`"
        class="image-uploader"
        action=""
        :show-file-list="false"
        accept=".jpg,.jpeg,.png"
        :before-upload="beforePicUpload"
        :http-request="uploadRequest"
      >
        <div v-if="getImageSrc(key,value)" class="upload-image-item pos-r" @click.stop="()=>{}">
          <v-image :src="getImageSrc(key,value)" @click.stop="()=>{}" />
          <div class="pos-a  pic-item-edit justify-content-center align-items-center">
            <i class="el-icon-zoom-in" @click.stop="enlargePicHandler(key,value)" />
            <i class="el-icon-delete" @click.stop="handlePicRemove(key)" />
          </div>
        </div>
        <i v-else class="el-icon-plus image-uploader-icon" @click="uploadPicSuccess(key)" />
      </el-upload>
    </template>
    <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="previewSrcList" />
    <div v-if="!editStatus" class="d-flex btn-warp justify-content-between align-items-center">
      <v-button @click="prevStepHandler">
        上一步
      </v-button>
      <v-button type="primary" @click="nextStepHandler">
        下一步
      </v-button>
    </div>
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import itemTitle from './itemTitle'
import createProductMixins from '@/mixins/product/createProduct'
import categoryMixins from '@/mixins/product/category'
import publicUseMixins from '@/mixins/publicUse'
import VButton from '@/baseComponents/VButton'
import VImage from '@/baseComponents/VImage'
// import VVideoPreview from '@/baseComponents/VVideoPreview'
// import VVideoPlayer from '@/baseComponents/VVideoPlayer'
// eslint-disable-next-line no-unused-vars
import * as mUtils from '@/assets/utils/mUtils'
export default {
  name: 'UploadProductFiles',
  // eslint-disable-next-line vue/no-unused-components
  components: { VButton, itemTitle, VImage, ElImageViewer },
  mixins: [createProductMixins, categoryMixins, publicUseMixins],
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
      selectPicUploadKey: null,
      imageIds: { image1_id: null, image2_id: null, image3_id: null, image4_id: null, image5_id: null },
      images: { image1: {}, image2: {}, image3: {}, image4: {}, image5: {} },
      videoObject: {
        id: null,
        data: { external_url: '' }
      },
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
    closeViewer () {
      this.showViewer = false
      this.previewSrcList[0] = ''
    },
    enlargePicHandler (key, value) {
      this.showViewer = true
      this.previewSrcList[0] = key && value ? this.cloneObj(this.getImageSrc(key, value)) : ''
    },
    handlePicRemove (key) {
      const keys = key.split('_')[0]
      this.images[keys] = {}
      this.imageIds[key] = null
    },
    uploadVideoRemove (file, fileList) {
      this.videoObject = {
        id: null,
        data: { external_url: '' }
      }
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
    uploadPicSuccess (key) {
      this.selectUploadKey = key
    },
    uploadVideoSuccess (response, file, fileList) {
      this.videoObject.id = response ? response.id : null
      this.videoObject.data = response || {}
    },
    uploadRequest (param) {
      this.notification({ title: '提示', message: '上传文件中...', type: 'warning' })
      this.uploadFiles({ data: param.file })
        .then((resp) => {
          if (resp) {
            this.notification({ title: '提示', message: '上传成功！', type: 'success' })
            param.onSuccess(resp)
            if (!this.selectUploadKey) {
              return
            }
            this.imageIds[this.selectUploadKey] = resp.id
            const keys = this.selectUploadKey.split('_')[0]
            this.images[keys] = resp
            this.selectUploadKey = null
          }
        })
        .catch((err) => {
          this.notification({ title: '提示', message: '上传失败！', type: 'error' })
          param.onError(err)
        })
    },
    nextStepHandler () {
      if (!this.videoObject.id) {
        this.notification({ title: '提示', message: '至少上传一个视频', type: 'warning' })
        return
      }
      if (this.uploadImagesLength === 5) {
        this.notification({ title: '提示', message: '必须至少上传一张图片', type: 'warning' })
        return
      }
      const params = this.cloneObj(this.imageIds)
      params.video1_id = this.videoObject.id
      this.$emit('nextHandler', {
        status: this.stepStatusEnum.uploadFiles,
        data: params,
        imagesAndVideoResp: { ...this.images, video1: this.videoObject.data }
      })
    },
    prevStepHandler () {
      const params = this.cloneObj(this.imageIds)
      params.video1_id = this.videoObject.id
      this.$emit('prevHandler', {
        status: this.stepStatusEnum.uploadFiles,
        data: params,
        imagesAndVideoResp: { ...this.images, video1: this.videoObject.data }
      })
    },
    initData () {
      const data = this.cloneObj(this.defaultData)
      this.videoObject.id = data.video1_id !== null ? data.video1_id : null
      this.videoObject.data = data.video1 ? data.video1 : {}
      for (let i = 0; i < this.maxNumOfPicUpload; i++) {
        if (data[`image${i + 1}_id`] !== null) {
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
    ::v-deep .video-uploader .el-upload {
      border: 2px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 200px;
      line-height: 200px;
      margin: 10px auto 0;
    }
    .video-uploader-icon{
      font-size:40px;
      color: #999999;
    }
    .video-player-wrap{
      overflow: hidden;
      .video-player{
        width: 100%;
        background-color: #000;
      }
      .video-player-remove{
        z-index: 10;
        text-align: center;
        width: 100%;
        height: 42px;
        top: -42px;
        left: 0;
        padding:4px 6px 0 0;
        background-color: rgba(255,255,255,.4);
        transition: all .2s;
      }
      &:hover{
        .video-player-remove{
          top: 0;
        }
      }
    }
    .image-uploader {
      display: inline-block;
      margin-right: 10px;
    }
    .image-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
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
    .upload-image-item {
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
