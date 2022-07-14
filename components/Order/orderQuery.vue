<template>
  <div class="d-flex justify-content-between mb-2">
    <el-form
      ref="queryForm"
      :inline="true"
      label-width="50px"
      @submit.native.prevent
    >
      <el-form-item label="查询" class="mb-0">
        <el-input v-model="orderQuery" @keyup.enter.native="getOrderData()" />
      </el-form-item>
      <el-form-item class="mb-0">
        <v-button type="primary" size="small" icon="el-icon-search" @click="getOrderData()">
          查询
        </v-button>
      </el-form-item>
    </el-form>
    <v-button type="primary" size="small" icon="el-icon-search" @click="shipmentHandler">
      发货
    </v-button>
  </div>
</template>

<script>
import VButton from '../../baseComponents/VButton.vue'
import ordersMixins from '@/mixins/orders'
// import VImage from '@/baseComponents/VImage'
export default {
  name: 'OrderQuery',
  components: {
    VButton
    // VImage
  },
  mixins: [ordersMixins],
  props: {
    orderFormTitle: {
      type: String,
      default: ''
    },
    shipmentSku: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      valid: false,
      formLabelWidth: '100px',
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
  },
  methods: {
    shipmentHandler () {
      if (this.shipmentSku.length > 0) {
        console.log(1)
      } else {
        this.notification({ title: '提示', message: '请至少选中1个待发货的订单', type: 'warning' })
      }
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
