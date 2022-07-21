<template>
  <section class="w-100 preset-libraries-wrap pos-r">
    <preset-libraries-query />
    <div class="preset-libraries-item-wrap d-flex flex-wrap">
      <template v-for="(item,index) in presetLibrarieList">
        <div :key="item.id" class="preset-libraries-item d-flex align-items-center  pos-r">
          <v-image :src="item.file_id&&item.file?item.file.external_url:''" />
          <div class="pos-a pic-item-edit justify-content-center align-items-center">
            <i class="el-icon-zoom-in" @click="enlargePicHandler(item.file_id&&item.file?item.file.external_url:'')" />
            <i class="el-icon-setting" @click="handlePicEdit(item,index)" />
          </div>
        </div>
      </template>
    </div>
    <el-upload
      :ref="`uploadImg`"
      class="image-uploader pos-a"
      action=""
      :show-file-list="false"
      accept=".jpg,.jpeg,.png"
      :before-upload="beforePicUpload"
      :http-request="uploadPicRequest"
    >
      <i class="el-icon-plus image-uploader-icon" />
    </el-upload>
    <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="previewSrcList" />
    <v-paginations
      :vuex-path="presetLibrariesVuexBasePath"
      algin-center
      @pageChange="getPresetLibrarieData()"
    />
  </section>
</template>
<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import VImage from '../../baseComponents/VImage.vue'
import presetLibrariesQuery from './presetLibrariesQuery'
import presetLibrariesMixins from '@/mixins/presetLibraries'
import uploadFilesMixins from '@/mixins/uploadFiles'
// import * as mUtils from '@/assets/utils/mUtils'
import VPaginations from '@/baseComponents/VPaginations'
export default {
  name: 'PresetLibraries',
  components: {
    VPaginations, presetLibrariesQuery, VImage, ElImageViewer
  },
  mixins: [presetLibrariesMixins, uploadFilesMixins],
  data () {
    return {
      showViewer: false,
      previewSrcList: [],
      selectIndex: null
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    beforePicUpload (file) {
      return new Promise((resolve, reject) => {
        // const isLt = file.size / 1024 < 200 // 判断是否小于200Kb
        // if (!isLt) {
        //   this.notification({ title: '提示', message: '图片大小不能超过300KB! 请重新上传', type: 'warning' })
        //   reject(new Error('图片大小不能超过300KB!'))
        // } else {
        //   mUtils.asyncImgChecked({ file, width: 300, height: 300 })
        //     .then((data) => {
        //       if (data) {
        resolve(true)
        //       } else {
        //         reject(new Error('图片尺寸不小能大于300 X 300!'))
        //         this.notification({ title: '提示', message: '图片尺寸不小能大于300 X 300', type: 'warning' })
        //       }
        //     })
        // }
      })
    },
    uploadPicRequest (param) {
      this.notification({ title: '提示', message: '图片上传中...', type: 'warning' })
      this.uploadFiles({ data: param.file })
        .then((resp) => {
          if (!resp) {
            return
          }
          this.notification({ title: '提示', message: '上传成功！正在更新中', type: 'success' })
          const params = { file_id: resp.id, type: this.presetLibrariesTypeOption[0].value }
          this.updatePresetLibrarie({ params, id: this.presetLibrarieList[this.selectIndex].id })
            .then((resp) => {
              this.getPresetLibrarieData()
              this.selectIndex = null
            })
        })
    },
    closeViewer () {
      this.showViewer = false
      this.previewSrcList[0] = ''
    },
    enlargePicHandler (val) {
      this.showViewer = true
      console.log(val)
      this.previewSrcList[0] = val
    },
    handlePicEdit (data, index) {
      this.selectIndex = index
      document.querySelector('.image-uploader .image-uploader-icon').click()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "assets/sass/color";
.preset-libraries-item-wrap{
}
.preset-libraries-item {
      width: 200px;
      height: 200px;
      padding: 10px;
      font-size: 0;
      &:hover{
        .pic-item-edit{
          display: flex;
        }
      }
      .pic-item-edit{
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        left: 10px;
        top: 10px;
        background: rgba(0,0,0,.5);
        display: none;
        transition: background-color .2s;
        i{
          color: #fff;
          font-weight: bold;
          font-size: 16px;
          margin: 0 10px;
          transition: all .2s;
          cursor: pointer;
          &:hover{
            color: $primary;
            transform: scale(1.2);
          }
        }
      }
    }
    .image-uploader{
      top: -9999px;
    }
</style>
