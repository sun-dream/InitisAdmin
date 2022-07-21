<template>
  <el-dialog title="退款审批" :visible="show" width="600px">
    <el-form
      ref="shipmentForm"
      :model="formInfo"
      :rules="refundRules"
      size="small"
      label-width="110px"
      class="px-4 form-wrap"
    >
      <el-form-item label="退款状态">
        <el-select v-model="formInfo.status" placeholder="请选择">
          <el-option
            v-for="item in refundRequestsStatusOption"
            :key="item.value"
            :label="item.name"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="formInfo.status === 'REJECTED'||formInfo.status === 'CANCELLED'" label="拒绝理由">
        <el-select v-model="formInfo.refund_reason" filterable placeholder="请选择">
          <el-option
            v-for="item in refundRequestsRefundReasonOption"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="formInfo.status === 'REJECTED'||formInfo.status === 'CANCELLED'" label="拒绝说明">
        <el-input v-model="formInfo.reject_note" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="拒绝说明" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeHandler">取 消</el-button>
      <el-button size="small" type="primary" @click="saveHandler">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import publicUseMixins from '@/mixins/publicUse'
import refundRequestsMixins from '@/mixins/refundReuqests'
// import ordersMixins from '@/mixins/orders'
// import VImage from '@/baseComponents/VImage'
// import * as mUtils from '@/assets/utils/mUtils'
// import VLink from '@/baseComponents/VLink'
export default {
  name: 'SkuItem',
  // components: { VImage, VLink },
  mixins: [publicUseMixins, refundRequestsMixins],
  props: {
    defaultData: {
      type: Object,
      default: () => {}
    },
    show: {
      type: Boolean,
      default: false
    },
    detailStatus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formInfo: {
        reject_note: '',
        refund_reason: 'duplicate',
        status: 'PENDING'
      }
    }
  },
  computed: {
  },
  watch: {
    show (newVal) {
      if (newVal) {
        this.formInfo = {
          reject_note: this.defaultData.reject_note,
          refund_reason: 'duplicate',
          status: this.defaultData.status
        }
      }
    }
  },
  mounted () {
  },
  methods: {
    closeHandler () {
      this.$emit('update:show', false)
    },
    saveHandler () {
      const params = this.cloneObj(this.formInfo)
      if (params.status !== 'REJECTED' || params.status !== 'CANCELLED') {
        delete params.reject_note
        delete params.refund_reason
      }
      this.notification({ title: '提示', message: '正在更新退款信息', type: 'warning' })
      this.updateRefundRequests({ id: this.defaultData.id, params })
        .then((resp) => {
          if (this.detailStatus) {
            this.getRefundRequestsItem(this.$route.params.id)
          } else {
            this.getRefundRequestsData()
          }
          this.closeHandler()
          this.notification({ title: '提示', message: '更新退款完成', type: 'success' })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.form-wrap{
  min-height: 160px;
}
</style>
