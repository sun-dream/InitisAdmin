<template>
  <el-dialog v-if="show" title="允许提现" :visible="show" width="540px" :before-close="closeHandler">
    <el-form
      ref="withdrawalForm"
      :model="formInfo"
      class="px-4 form-wrap"
      size="small"
      label-width="140px"
      :rules="withdrawalRules"
    >
      <el-form-item label="转账号码" prop="source_financial_account_id">
        <el-input v-model="formInfo.source_financial_account_id" placeholder="转账号码" />
      </el-form-item>
      <el-form-item label="支付订单号" prop="third_party_transactional_id">
        <el-input v-model="formInfo.third_party_transactional_id" placeholder="转账后生成的订单号码" />
      </el-form-item>
      <el-form-item label="转账方式">
        <el-select v-model="formInfo.method" placeholder="请选择">
          <el-option
            v-for="item in paymentMethodTypeOption"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="钱包可提现金额" prop="source_amount">
        <el-col :span="11">
          <el-select v-model="formInfo.source_currency" placeholder="货币单位" filterable>
            <el-option
              v-for="item in currencysOption"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col class="line text-center" :span="2">
          -
        </el-col>
        <el-col :span="11">
          <el-input v-model.number="formInfo.source_amount" placeholder="金额" />
        </el-col>
      </el-form-item>
      <el-form-item label="交易手续费" prop="transaction_fee">
        <el-col :span="11">
          <el-select v-model="formInfo.transaction_currency" placeholder="货币单位" filterable>
            <el-option
              v-for="item in currencysOption"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col class="line text-center" :span="2">
          -
        </el-col>
        <el-col :span="11">
          <el-input v-model.number="formInfo.transaction_fee" placeholder="金额" />
        </el-col>
      </el-form-item>
      <el-form-item label="目标提现金额" prop="target_amount">
        <el-col :span="11">
          <el-select v-model="formInfo.target_currency" placeholder="货币单位" filterable>
            <el-option
              v-for="item in currencysOption"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col class="line text-center" :span="2">
          -
        </el-col>
        <el-col :span="11">
          <el-input v-model.number="formInfo.target_amount" placeholder="金额" />
        </el-col>
      </el-form-item>
      <el-form-item label="汇率" prop="exchange_rate">
        <el-input v-model="formInfo.exchange_rate" placeholder="汇率" />
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
import publicUseMixins from '@/mixins/publicUse'
import withdrawalRequestsMixins from '@/mixins/withdrawalRequests'
export default {
  name: 'SuccessDialog',
  components: { VButton },
  mixins: [withdrawalRequestsMixins, publicUseMixins],
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
        third_party_transactional_id: '',
        method: 'BANK_TRANSACTION',
        source_financial_account_id: '',
        source_amount: '',
        source_currency: '',
        transaction_fee: '',
        transaction_currency: '',
        exchange_rate: '',
        target_amount: '',
        target_currency: ''
      }
    }
  },
  computed: {
  },
  watch: {
    defaultData: {
      deep: true,
      handler (newVal, oldVal) {
        this.initData(newVal)
      }
    }
  },
  mounted () {
    this.initData(this.defaultData)
  },
  methods: {
    initData (data) {
      const d = this.cloneObj(data)
      Object.keys(this.formInfo).forEach((key) => {
        if (key === 'method') {
          this.formInfo[key] = 'BANK_TRANSACTION'
        } else if (key === 'exchange_rate') {
          this.formInfo[key] = d.platform_exchange_rate
        } else {
          this.formInfo[key] = d[key]
        }
      })
    },
    closeHandler () {
      this.$emit('update:show', false)
    },
    saveHandler () {
      this.$refs.withdrawalForm.validate((valid) => {
        if (valid) {
          const params = this.cloneObj(this.formInfo)
          this.notification({ title: '提示', message: '正在允许提现', type: 'warning' })
          this.updateWithdrawalRequestsOfSuccess({ id: this.withdrawalRequeststItem.id, params })
            .then((resp) => {
              if (this.detailStatus) {
                this.loadWithdrawalRequestsItem(this.$route.params.id)
              } else {
                this.getWithdrawalRequestsData()
              }
              this.closeHandler()
              this.notification({ title: '提示', message: '允许提现完成', type: 'success' })
            })
        } else {
          this.notification({ title: '提示', message: '请正确填写表单', type: 'warning' })
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.form-wrap{
  width: 500px;
}

</style>
