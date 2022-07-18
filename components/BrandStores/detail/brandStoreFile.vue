<template>
  <section class="w-100 brand-store-file-wrap">
    <item-title text="贴纸图和背景图">
      <div>
        <v-button size="mini" @click="resetForm">
          重置
        </v-button>
        <v-button size="mini" type="primary" :disabled="saveState" @click="saveHandler">
          保存
        </v-button>
      </div>
    </item-title>
    <el-row :gutter="20" class="detail-item mb-2">
      <template v-for="(item,key) in brandStorefiles">
        <el-col :key="key" :span="6" class="">
          <p class="w-100">
            {{ key }}：
          </p>
          <el-upload
            :ref="`uploadImg${key}`"
            class="image-uploader"
            action=""
            :show-file-list="false"
            accept=".jpg,.jpeg,.png"
            :before-upload="beforePicUpload"
            :http-request="uploadRequest"
            :on-success="uploadSuccessHandler"
          >
            <div v-if="getImageSrc(key,item)" class="upload-image-item pos-r" @click.stop="()=>{}">
              <v-image :src="getImageSrc(key,item)" @click.stop="()=>{}" />
              <div class="pos-a  pic-item-edit justify-content-center align-items-center">
                <i class="el-icon-zoom-in" @click.stop="enlargePicHandler(key,item)" />
                <i class="el-icon-delete" @click.stop="handlePicRemove(key)" />
              </div>
            </div>
            <i v-else class="el-icon-plus image-uploader-icon" @click="uploadPicHandler(key)" />
          </el-upload>
        </el-col>
      </template>
    </el-row>
  </section>
</template>
<script>
import itemTitle from '../itemTitle.vue'
import brandStoresMixins from '@/mixins/brandStores'
import publicUseMixins from '@/mixins/publicUse'
import VButton from '@/baseComponents/VButton'
import VImage from '@/baseComponents/VImage'
// import * as mUtils from '@/assets/utils/mUtils'
import uploadFilesMixins from '@/mixins/uploadFiles'
export default {
  name: 'BrandStoreFile',
  components: {
    itemTitle, VButton, VImage
  },
  mixins: [brandStoresMixins, publicUseMixins, uploadFilesMixins],
  props: {
    defaultData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      selectUploadKey: null,
      saveState: true,
      brandStorefileIds: {
        logo_id: null,
        sticker_id: null,
        bg_cover_id: null
      },
      brandStorefiles: {
        bg_cover: {},
        logo: {},
        sticker: {}
      }
    }
  },
  computed: {
    getImageSrc (key, item) {
      return function (key, item) {
        if (key && item && item.id) {
          return this.brandStorefiles[key].external_url
        } else {
          return ''
        }
      }
    }
  },
  watch: {
    defaultData (newData) {
      this.initData(this.cloneObj(newData))
    }
  },
  mounted () {
    this.initData(this.cloneObj(this.defaultData))
  },
  methods: {
    uploadPicHandler (key) {
      this.selectUploadKey = key
      this.saveState = false
    },
    enlargePicHandler (key, value) {

    },
    handlePicRemove (key) {
      this.brandStorefiles[key] = {}
      this.brandStorefileIds[key + '_id'] = null
      this.saveState = false
    },
    uploadSuccessHandler (param) {
      this.brandStorefiles[this.selectUploadKey] = param
      this.brandStorefileIds[this.selectUploadKey + '_id'] = param.id
    },
    beforePicUpload (file) {
      return new Promise((resolve, reject) => {
        const isLt = file.size / 1024 < 300 // 判断是否小于300Kb
        if (!isLt) {
          this.notification({ title: '提示', message: '图片大小不能超过300KB! 请重新上传', type: 'warning' })
          reject(new Error('图片大小不能超过300KB!'))
        }
        resolve(true)
      })
    },
    uploadRequest (param) {
      this.notification({ title: '提示', message: '上传文件中...', type: 'warning' })
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
    resetForm () {
      this.notification({ title: '提示', message: '信息重置', type: 'info' })
      this.initData(this.cloneObj(this.defaultData))
    },
    saveHandler () {
      this.notification({ title: '提示', message: '正在更新当前店铺信息', type: 'warning' })
      this.updateBrandStores({ params: this.brandStorefileIds, id: this.defaultData.id })
        .then((resp) => {
          this.saveState = true
          if (resp.id) {
            this.loadBrandStoreItem(resp.id)
            this.notification({ title: '请求结果', message: '更新成功，正在重载中...', type: 'success' })
          }
        })
    },
    initData (data) {
      Object.keys(this.brandStorefileIds).forEach((key) => {
        if (data[key]) {
          this.brandStorefileIds[key] = data[key]
          const keys = key.split('_')
          if (keys.length === 3) {
            this.brandStorefiles[`${keys[0]}_${keys[1]}`] = data[`${keys[0]}_${keys[1]}`]
          } else {
            this.brandStorefiles[`${keys[0]}`] = data[`${keys[0]}`]
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.image-uploader-wrap{
    display: inline-block;
}
.image-uploader {
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
