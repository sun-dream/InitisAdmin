<template>
  <div class="d-flex justify-content-between mb-2">
    <el-form
      ref="queryForm"
      :inline="true"
      :model="userFilter"
      label-width="50px"
      @submit.native.prevent
    >
      <el-form-item label="查询" class="mb-0">
        <el-input v-model="userFilter.query" @keyup.enter.native="searchHandle" />
      </el-form-item>
      <el-form-item class="mb-0">
        <v-button type="primary" size="small" icon="el-icon-search" @click="searchHandle">
          查询
        </v-button>
      </el-form-item>
    </el-form>
    <el-dialog :title="userFormTitle" :visible="userDialog" width="60%">
      <el-form ref="userDetailForm" :model="userForm" class="pr-4" :label-width="formLabelWidth" :rules="userFormRules">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-upload
              class="avatar-uploader mb-4"
              action=""
              :show-file-list="false"
              :before-upload="beforePicUpload"
              :http-request="uploadPicRequest"
              accept=".jpg,.jpeg,.png"
            >
              <v-image v-if="fileObject.id" class="avatar" :src="fileObject.external_url" />
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名字">
              <el-input v-model="userForm.full_name" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码">
              <el-input v-model="userForm.hashed_password" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱">
              <el-input v-model="userForm.email" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话">
              <el-input v-model="userForm.phone" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="激活状态">
              <el-switch
                v-model="userForm.is_active"
                active-text="开启"
                inactive-text="关闭"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="超级管理员">
              <el-switch
                v-model="userForm.is_superuser"
                active-text="开启"
                inactive-text="关闭"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEditFormHandler">
          取 消
        </el-button>
        <el-button type="primary" @click="saveEditFormHandler">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VButton from '../../baseComponents/VButton.vue'
import userMixins from '@/mixins/user'
import uploadFilesMixins from '@/mixins/uploadFiles'
import * as mUtils from '@/assets/utils/mUtils'
import VImage from '@/baseComponents/VImage'
export default {
  name: 'UserFilter',
  components: {
    VButton,
    VImage
  },
  mixins: [userMixins, uploadFilesMixins],
  props: {
    userFormTitle: {
      type: String,
      default: ''
    },
    userDialog: {
      type: Boolean,
      default: false
    },
    selectEditId: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Number,
      default: ''
    }
  },
  data () {
    return {
      valid: false,
      formLabelWidth: '100px',
      userFilter: {
        query: ''
      },
      userForm: {
        is_active: false,
        is_superuser: false,
        full_name: '',
        email: '',
        phone: '',
        hashed_password: '',
        avatar_id: null
      }
    }
  },
  watch: {
    'userForm.avatar_id' (newData, oldData) {
      if (newData && newData !== oldData) {
        this.getFiles(newData)
      }
    }
  },
  methods: {
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
      this.notification({ title: '提示', message: '图片上传中....', type: 'warning' })
      this.uploadFiles({ data: param.file })
        .then((resp) => {
          if (!resp.id) {
            this.notification({ title: '提示', message: '上传失败！', type: 'error' })
            return
          }
          this.notification({ title: '提示', message: '上传成功！', type: 'success' })
          this.getFiles(resp.id)
          this.userForm.avatar_id = resp.id
        })
    },
    searchHandle () {
      this.getUserData(this.userFilter)
    },
    closeEditFormHandler () {
      this.userForm = {
        is_active: false,
        is_superuser: false,
        full_name: '',
        email: '',
        phone: '',
        hashed_password: '',
        avatar_id: null
      }
      this.$refs.userDetailForm.resetFields()
      this.$emit('close')
    },
    saveEditFormHandler () {
      const data = this.cloneObj(this.userForm)
      delete data.create_at
      delete data.update_at
      this.$emit('save', data)
    }
  }
}
</script>
<style lang="scss" scoped>
    .avatar-uploader{
        width: 178px;
        margin: 0 auto;
    }
  ::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  ::v-deep.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
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
  }
</style>
