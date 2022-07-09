<template>
  <div
    v-loading="imageLoading"
    class="description-wrap"
    element-loading-text="请稍等，图片上传中"
  >
    <div class="upload-image-wrap">
      <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        accept=".jpg,.jpeg, .png"
        :http-request="uploadPicRequest"
      >
        <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
        <i class="el-icon-plus avatar-uploader-icon upload-descriptoon-icon" />
      </el-upload>
    </div>
    <item-title text="商品详情" />
    <section
      ref="myQuillEditor"
      v-quill:myQuillEditor="editorOption"
      :content="description"
      class="quill-editor"
      @change="onEditorChange($event)"
    />

    <!-- @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)" -->
    <div v-if="!editStatus" class="d-flex btn-warp justify-content-between align-items-center">
      <v-button @click="prevDetailHandler">
        上一步
      </v-button>
      <v-button type="primary" @click="nextStepHandler">
        完成商品创建
      </v-button>
    </div>
  </div>
</template>

<script>
// 工具栏配置
// import Quill from 'quill'
import itemTitle from './itemTitle'
import createProductMixins from '@/mixins/product/createProduct'
import VButton from '@/baseComponents/VButton'
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  [{ header: 1 }, { header: 2 }], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表-----[{ productBlock: 'ordered' }, { productBlock: 'bullet' }]
  [{ indent: '-1' }, { indent: '+1' }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
  [{ direction: 'rtl' }], // 文本方向-----[{'direction': 'rtl'}]
  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  [{ font: [] }], // 字体种类-----[{ font: [] }]
  [{ align: [] }], // 对齐方式-----[{ align: [] }]
  //   ["clean"], // 清除文本格式-----['clean']
  ['link', 'image'] // 链接、图片、视频-----['link', 'image', 'video']
]
export default {
  name: 'ProductDescription',
  components: { VButton, itemTitle },
  mixins: [createProductMixins],
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
      imageLoading: false,
      imageUrl: '',
      description: '',
      uploadImageValues: [],
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image (value) {
                if (value) {
                  document.querySelector('.description-wrap .avatar-uploader .upload-descriptoon-icon').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      }
    }
  },
  watch: {
    defaultData: {
      deep: true,
      handler (newData, oldData) {
        this.initDetail()
      }
    }
  },

  mounted () {
    this.initDetail()
  },
  methods: {
    handleAvatarSuccess (res, file) {
      const imgs = `<img src="${res.external_url}" alt="${res.upload_filename}">`
      this.description += imgs
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
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
    onEditorChange ({ editor, html, text }) {
      this.description = html
    },
    nextStepHandler () {
      this.$emit('nextHandler', {
        status: this.stepStatusEnum.description,
        data: { description: this.description }
      })
    },
    prevDetailHandler () {
      this.$emit('prevHandler', {
        status: this.stepStatusEnum.description,
        data: { description: this.description }
      })
    },
    initDetail () {
      this.description = this.cloneObj(this.defaultData).description
    }
  }
}
</script>
<style lang="scss" scoped>
.quill-editor {
  min-height: 300px;
  max-height: 660px;
  margin-bottom: 20px;
}
.description-wrap{
  margin: 40px auto 0;
 width: 740px;
}
 .upload-image-wrap{
    position: absolute;
    top:-9999px;
 }
</style>
