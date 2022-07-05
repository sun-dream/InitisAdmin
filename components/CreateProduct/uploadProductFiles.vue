<template>
  <div class="upload-wrap">
    <h4 class="upload-title h4 shadowed-sm">
      上传视频
    </h4>
    <h4 class="upload-title h4 shadowed-sm">
      上传图片
    </h4>
    <!-- :auto-upload="false" -->

    <el-upload
      ref="uploadImage"
      class="upload-demo"
      :action="uploadAction"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :before-upload="beforeAvatarUpload"
      :file-list="fileList"
      list-type="picture"
      accept=".jpg, .png"
      :limit="maxNumOfPicUpload"
      :http-request="uploadRequest"
    >
      <el-button size="small" type="primary" plain class="w-100 d-block upload-image-btn">
        点击这里上传！
      </el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传
        <span class="text-danger ">jpg/png</span>
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
      fileList: [
      ]
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
    beforeAvatarUpload (file) {
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
    handleChange (file, fileList) {
      console.log(fileList)
      this.fileList = this.cloneObj(fileList)
    },
    handleRemove () {
    },
    uploadRequest (param) {
      this.uploadFiles(param.file)
        .then((resp) => {
          param.onSuccess(resp)
        })
        .catch((err) => {
          param.onError(err)
        })
    },
    archivesSetHandler (val) {
      this.$emit('archivesSetHandler', { formInfo: val, stepIndex: 1 })
    },
    nextStepHandler () {
      this.$refs.infoForm.validate((valid) => {
        if (!valid) {
          this.notification({ title: '提示', message: '请正确填写内容！', type: 'warning' })
          return false
        }
        const params = this.cloneObj(this.formInfo)
        this.$emit('formInfoHandler', { formInfo: params, stepIndex: 2 })
      })
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
        border-left: 2px solid $primary;
        margin-bottom: 10px;
    }
    .upload-image-btn{
        &:hover span{
            color: #fff;
        }
    }
    ::v-deep .el-upload.el-upload--picture{
        width: 100%;
    }
</style>
