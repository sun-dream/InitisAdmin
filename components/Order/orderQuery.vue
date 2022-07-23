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
    <div class="shipment-wrap">
      <v-button type="primary" size="small" icon="el-icon-truck" @click="shipmentHandler">
        发货
      </v-button>
      <shipment-dialog
        :show-dialog.sync="shipmentsDialogVisible"
        :default-data="shipmentSku"
      />
    </div>
  </div>
</template>

<script>
import VButton from '../../baseComponents/VButton.vue'
import shipmentDialog from './shipmentDialog'
import ordersMixins from '@/mixins/orders'
// import VImage from '@/baseComponents/VImage'
export default {
  name: 'OrderQuery',
  components: {
    VButton,
    shipmentDialog
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
      shipmentsDialogVisible: false
    }
  },
  watch: {
  },
  methods: {
    shipmentHandler () {
      if (this.shipmentSku.length > 0) {
        this.shipmentsDialogVisible = true
      } else {
        this.notification({ title: '提示', message: '请至少选中1个SKU待发货的订单', type: 'warning' })
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
   .shipment-wrap{
      padding-top: 2px;
   }
</style>
