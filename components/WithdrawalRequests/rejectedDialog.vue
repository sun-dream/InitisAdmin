<template>
  <el-dialog v-if="show" title="拒绝提现" :visible="show" width="50%" :before-close="closeHandler">
    <el-form ref="form" :model="formInfo" label-position="top" label-width="80px">
      <el-form-item label="拒绝理由">
        <el-input v-model="formInfo.reject_note" type="textarea" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <v-button size="small" @click="closeHandler">取 消</v-button>
      <v-button type="primary" size="small" @click="saveHandler">确 定</v-button>
    </span>
  </el-dialog>
</template>
<script>
import VButton from '../../baseComponents/VButton.vue'
import ordersMixins from '@/mixins/orders'
import withdrawalRequestsMixins from '@/mixins/withdrawalRequests'
export default {
  name: 'RejectedDialog',
  components: { VButton },
  mixins: [withdrawalRequestsMixins, ordersMixins],
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
        status: 'REJECTED',
        reject_note: ''
      }
    }
  },
  computed: {

  },
  watch: {
  },
  methods: {
    closeHandler () {
      this.$emit('update:show', false)
    },
    saveHandler () {
      const params = this.cloneObj(this.formInfo)
      this.notification({ title: '提示', message: '正在拒绝提现', type: 'warning' })
      this.updateWithdrawalRequests({ id: this.defaultData.id, params })
        .then((resp) => {
          if (this.detailStatus) {
            this.loadWithdrawalRequestsItem(this.$route.params.id)
          } else {
            this.getWithdrawalRequestsData()
          }
          this.closeHandler()
          this.notification({ title: '提示', message: '拒绝提现完成', type: 'success' })
        })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
