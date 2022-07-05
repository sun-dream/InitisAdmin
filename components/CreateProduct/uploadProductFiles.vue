<template>
  <div class="upload-wrap">
    <h4 class="upload-title h4 shadowed-sm">
      上传视频
    </h4>
    <!--
      :before-upload="beforePicUpload"
    -->
    <el-progress v-if="progressFlag" :percentage="loadProgress" />
    <el-upload
      ref="uploadVideo"
      :action="uploadAction"
      class="upload-video-demo"
      :file-list="videoData"
      accept=".mp4"
      :limit="1"
      :http-request="uploadRequest"
      :on-success="uploadVideoSuccess"
      :on-progress="uploadVideoProcess"
    >
      <el-button size="small" type="primary" plain class="w-100 d-block upload-image-btn">
        点击这里上传！{{ loadProgress }}---{{ progressFlag }}
      </el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传
        <span class="text-danger ">.mp4</span>
        文件，还可以上传
        <span class="text-danger ">1</span>
        个视频
      </div>
    </el-upload>

    <h4 class="upload-title h4 shadowed-sm">
      上传图片
    </h4>
    <el-upload
      ref="uploadImage"
      class="upload-demo"
      :action="uploadAction"
      :on-success="uploadPicSuccess"
      :before-upload="beforePicUpload"
      :file-list="fileList"
      list-type="picture"
      accept=".jpg,.jpeg, .png"
      :limit="maxNumOfPicUpload"
      :http-request="uploadRequest"
    >
      <el-button size="small" type="primary" plain class="w-100 d-block upload-image-btn">
        点击这里上传！
      </el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传
        <span class="text-danger ">jpg/jpeg/png</span>
        文件，且不超过
        <span class="text-danger ">300kb </span>
        ，尺寸为
        <span class="text-danger ">300*300</span>
        ，还可以上传
        <span class="text-danger ">{{ maxNumOfPicUpload - fileList.length }}</span>
        张图片
      </div>
    </el-upload>
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
// eslint-disable-next-line no-unused-vars
import * as mUtils from '@/assets/utils/mUtils'
export default {
  name: 'UploadProductFiles',
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
      uploadAction: '',
      loadProgress: 0, // 动态显示进度条
      progressFlag: false, // 关闭进度条
      fileList: [],
      videoData: []
    }
  },
  watch: {
    defaultData: {
      handler (newVal) {
        // this.initFormInfo(newVal)
      },
      deep: true
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    uploadVideoProcess (event, file, fileList) {
      this.progressFlag = true // 显示进度条
      this.loadProgress = parseInt(event.percent) // 动态获取文件上传进度
      if (this.loadProgress >= 100) {
        this.loadProgress = 100
        setTimeout(() => { this.progressFlag = false }, 1000) // 一秒后关闭进度条
      }
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
    uploadVideoSuccess (response, file, fileList) {
      this.videoData = this.cloneObj(fileList)
    },
    uploadRequest (param) {
      console.log(param)
      this.uploadFiles(param.file)
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
    archivesSetHandler (val) {
      this.$emit('archivesSetHandler', { formInfo: val, stepIndex: 1 })
    },
    nextStepHandler () {
      // this.$refs.infoForm.validate((valid) => {
      //   if (!valid) {
      //     this.notification({ title: '提示', message: '请正确填写内容！', type: 'warning' })
      //     return false
      //   }
      //   const params = this.cloneObj(this.formInfo)
      //   this.$emit('formInfoHandler', { formInfo: params, stepIndex: 2 })
      // })
    },
    initData (newVal) {
      this.uploadAction = process.env.baseURL + '/api/v1/files/user'
    }
  }
}
</script>
<style lang="scss" scoped>
@import "assets/sass/color";
    .upload-wrap{
        width:600px;
        margin:40px auto 0;
    }
    .upload-title {
        padding: 10px 6px;
        border-left: 4px solid $primary;
        margin-bottom: 10px;
    }
    .upload-image-btn{
        &:hover span{
            color: #fff;
        }
    }
    .upload-video-demo{
      margin-bottom: 30px;
    }
    ::v-deep .el-upload.el-upload--picture{
        width: 100%;
    }
     ::v-deep .el-upload.el-upload--text{
        width: 100%;
    }
</style>
