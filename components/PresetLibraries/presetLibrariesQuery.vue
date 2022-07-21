<template>
  <div class="d-flex justify-content-between mb-2">
    <el-form
      ref="queryForm"
      :inline="true"
      label-width="50px"
      @submit.native.prevent
    >
      <el-form-item label="查询" class="mb-0">
        <!-- <el-input v-model="refundRequestQuery"  /> -->
        <el-select v-model="presetLibrarieQuery" placeholder="请选择">
          <el-option
            v-for="item in presetLibrariesTypeOption"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item class="mb-0">
        <v-button type="primary" size="small" icon="el-icon-search" @click="getPresetLibrarieData()">
          查询
        </v-button>
      </el-form-item>
    </el-form>
    <div class="create-wrap pos-r">
      <v-button size="small" type="primary" icon="el-icon-plus" @click="createHandler">
        创建新的外设
      </v-button>
      <el-upload
        class="image-uploader-create pos-a"
        action=""
        :show-file-list="false"
        accept=".jpg,.jpeg,.png"
        :before-upload="beforePicUpload"
        :http-request="uploadPicRequest"
      >
        <i class="el-icon-plus image-uploader-icon" />
      </el-upload>
    </div>
  </div>
</template>

<script>
import VButton from '../../baseComponents/VButton.vue'
import presetLibrariesMixins from '@/mixins/presetLibraries'
import uploadFilesMixins from '@/mixins/uploadFiles'
export default {
  name: 'PresetLibrariesQuery',
  components: {
    VButton
  },
  mixins: [presetLibrariesMixins, uploadFilesMixins],
  props: {
  },
  data () {
    return {
    }
  },
  watch: {
  },
  methods: {
    uploadPicRequest (param) {
      this.notification({ title: '提示', message: '图片上传中...', type: 'warning' })
      this.uploadFiles({ data: param.file })
        .then((resp) => {
          if (!resp) {
            return
          }
          this.notification({ title: '提示', message: '上传成功！正在创建预设中', type: 'success' })
          const params = { file_id: resp.id, type: this.presetLibrariesTypeOption[0].value }
          this.createPresetLibrarie(params)
            .then((resp) => {
              this.notification({ title: '提示', message: '创建预设成功,重载列表', type: 'success' })
              this.getPresetLibrarieData()
              console.log(resp)
            })
        })
    },
    beforePicUpload () {},
    createHandler () {
      document.querySelector('.image-uploader-create .image-uploader-icon').click()
    }
  }
}
</script>
<style lang="scss" scoped>
 .create-wrap{
    padding-top: 2px;
  }
  .image-uploader-create{
      top: -9999px;
    }
</style>
