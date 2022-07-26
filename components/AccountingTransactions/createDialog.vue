<template>
  <el-dialog v-if="show" title="创建转账记录" :visible="show" width="540px" :before-close="closeHandler">
    <el-form
      ref="withdrawalForm"
      :model="formInfo"
      class="px-4 form-wrap"
      size="small"
      label-width="140px"
      :rules="accountRules"
    >
      <v-blockquote text="基本信息" />
      <el-form-item label="支付订单号" prop="third_party_transactional_id" class="mt-4">
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
      <el-form-item label="状态">
        <el-select v-model="formInfo.status" placeholder="请选择">
          <el-option
            v-for="item in accountStatusOption"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <v-blockquote text="提现信息" />
      <el-form-item label="提现订单" class="mt-4">
        <el-select
          v-model="formInfo.withdrawal_request_id"
          filterable
          remote
          :remote-method="remoteMethod"
          :loading="selectLoading"
          placeholder="请选择提现订单"
        >
          <el-option
            v-for="item in withdrawalRequestsOption"
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
      <!-- <el-form-item label="转账号码" prop="source_financial_account_id">
        <el-input v-model="formInfo.source_financial_account_id" placeholder="转账号码" />
      </el-form-item>
      -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <v-button size="small" @click="closeHandler">取 消</v-button>
      <v-button type="primary" size="small" @click="saveHandler">确 定</v-button>
    </span>
  </el-dialog>
</template>
<script>
import VButton from '../../baseComponents/VButton.vue'
import VBlockquote from '@/baseComponents/VBlockquote'
import accountingTransactionsMixins from '@/mixins/accountingTransactions'
import withdrawalRequestsMixins from '@/mixins/withdrawalRequests'
import publicUseMixins from '@/mixins/publicUse'
export default {
  name: 'CreateDialog',
  components: {
    VButton, VBlockquote
  },
  mixins: [publicUseMixins, accountingTransactionsMixins, withdrawalRequestsMixins],
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectLoading: false,
      formInfo: {
        method: 'BANK_TRANSACTION',
        third_party_transactional_id: 'string',
        status: 'ACTIVE',
        withdrawal_request_id: 'string',
        source_amount: 0,
        source_currency: 'AED',
        transaction_fee: 0,
        transaction_currency: 'AED',
        target_amount: 0,
        target_currency: 'AED',
        exchange_rate: 0,
        source_financial_account_id: 'string',
        target_financial_account_id: 'string'
      }
    }
  },
  computed: {
    withdrawalRequestsOption () {
      const arr = []
      if (this.withdrawalRequestsList.length < 1) {
        return arr
      }
      this.withdrawalRequestsList.forEach((item) => {
        arr.push({ name: item.id, value: item.id })
      })
      return arr
    }
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    remoteMethod (query) {
      if (!query) {
        return []
      }
      this.loadWithdrawalRequestsList({ query })
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
