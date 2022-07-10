<template>
  <div class="upload-wrap">
    <item-title v-if="!editStatus" text="图片管理" />
    <el-upload
      action=""
      list-type="picture-card"
      accept=".jpg,.jpeg, .png"
      :on-success="uploadPicSuccess"
      :before-upload="beforePicUpload"
      :file-list="fileList"
      :http-request="uploadPicRequest"
      :on-preview="handlePictureCardPreview"
      :on-remove="handlePicRemove"
    >
      <i v-show="fileList.length <= maxNumOfPicUpload" class="el-icon-plus" />
    </el-upload>
    <div class="el-upload__tip">
      只能上传
      <span class="text-danger ">.jpg/.jpeg/.png</span>
      文件，且不超过
      <span class="text-danger ">300kb </span>
      ，尺寸为
      <span class="text-danger ">300*300</span>
      ，还可以上传
      <span class="text-danger ">{{ maxNumOfPicUpload - fileList.length }}</span>
      张图片
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
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
import itemTitle from './itemTitle'
import skuofProductMixins from '@/mixins/product/sku'
import VButton from '@/baseComponents/VButton'
import * as mUtils from '@/assets/utils/mUtils'
export default {
  name: 'SkuImages',
  components: { VButton, itemTitle },
  mixins: [skuofProductMixins],
  props: {
    editStatus: {
      type: Boolean,
      default: false
    },
    defaultUploadFileCache: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  watch: {
    defaultUploadFileCache: {
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
    handlePicRemove (file, fileList) {
      this.fileList = this.cloneObj(fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforePicUpload (file) {
      return new Promise((resolve, reject) => {
        const isLt = file.size / 1024 < 200 // 判断是否小于200Kb
        if (this.fileList.length === this.maxNumOfPicUpload) {
          this.notification({ title: '提示', message: '最多上传五张图片', type: 'warning' })
          reject(new Error('最多上传五张图片!'))
        } else if (!isLt) {
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
    uploadPicSuccess (response, file, fileList) {
      this.fileList = this.cloneObj(fileList)
    },
    uploadPicRequest (param) {
      this.uploadFiles({ data: param.file })
        .then((resp) => {
          if (resp) {
            this.notification({ title: '提示', message: '上传成功！', type: 'success' })
            param.onSuccess(resp)
          }
        })
        .catch((err) => {
          this.notification({ title: '提示', message: '上传失败！', type: 'error' })
          param.onError(err)
        })
    },
    nextStepHandler () {
      if (this.fileList.length < this.maxNumOfPicUpload) {
        this.notification({ title: '提示', message: '必须上传五张图片', type: 'warning' })
        return
      }
      const params = {}
      this.fileList.forEach((item, index) => {
        params[`image${index + 1}_id`] = item.response.id
      })
      this.$emit('nextHandler', {
        status: this.stepStatusEnum.skuImage,
        data: params,
        uploadFileCache: {
          images: this.fileList
        }
      })
    },
    prevStepHandler () {
      const params = {}
      this.fileList.forEach((item, index) => {
        params[`image${index + 1}_id`] = item.response.id
      })
      this.$emit('prevHandler', {
        status: this.stepStatusEnum.uploadFiles,
        data: params,
        uploadFileCache: {
          images: this.fileList
        }
      })
    },
    initData () {
      const data = this.cloneObj(this.defaultUploadFileCache)
      // data.forEach((item) => {
      //   item.url = item.response && item.response.external_url ? item.response.external_url : item.url
      // })
      // this.fileList = data
      console.log(data)
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
    .product-info-title {
        padding: 10px 6px;
        border-left: 4px solid $primary;
        margin-bottom: 10px;
    }
    .btn-warp{
        margin-top: 20px;
    }
    .upload-image-btn{
        &:hover span{
            color: #fff;
        }
    }
    ::v-deep .el-upload.el-upload--picture{
        width: 100%;
    }
     ::v-deep .el-upload.el-upload--text{
        width: 100%;
    }
</style>
