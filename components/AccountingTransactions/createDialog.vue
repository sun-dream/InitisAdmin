<template>
  <el-dialog
    v-if="show"
    :title="editStatus?'更新转账记录':'创建转账记录'"
    close-on-click-modal
    :visible="show"
    width="800px"
    :before-close="closeHandler"
  >
    <el-form
      ref="accountForm"
      :model="formInfo"
      class="px-4 form-wrap w-100"
      size="small"
      label-width="160px"
      :rules="accountRules"
    >
      <el-row :gutter="20" class="">
        <v-blockquote text="基本信息" />
        <el-form-item label="支付订单号" prop="third_party_transactional_id" class="mt-4">
          <el-input v-model="formInfo.third_party_transactional_id" placeholder="转账后生成的订单号码" />
        </el-form-item>
        <el-col :span="12">
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
        </el-col>
        <el-col :span="12">
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
        </el-col>
        <v-blockquote text="提现信息" />

        <el-col :span="24">
          <el-form-item label="提现订单" prop="withdrawal_request_id" class="mt-4">
            <el-select
              :value="formInfo.withdrawal_request_id"
              filterable
              remote
              :remote-method="remoteMethod"
              :loading="selectLoading"
              placeholder="请选择提现订单(可输入搜索)"
              class="w-100"
              @input="withdrawalInputHander"
            >
              <el-option
                v-for="item in withdrawalRequestsOption"
                :key="item.id"
                :label="item.id"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="钱包可提现金额" prop="source_amount">
            <el-row :gutter="0" class="">
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
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="交易手续费" prop="transaction_fee">
            <el-row :gutter="0" class="">
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
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="目标提现金额" prop="target_amount">
            <el-row :gutter="0" class="">
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
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="汇率" prop="exchange_rate">
            <el-input v-model.number="formInfo.exchange_rate" placeholder="汇率" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="平台转账账号的ID" prop="source_financial_account_id">
            <el-input v-model="formInfo.source_financial_account_id" placeholder="平台转账账号的ID" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="提现账号的ID" prop="target_financial_account_id">
            <el-input v-model="formInfo.target_financial_account_id" placeholder="提现账号的ID" />
          </el-form-item>
        </el-col>
      </el-row>
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
    defaultData: {
      type: Object,
      default: () => {}
    },
    show: {
      type: Boolean,
      default: false
    },
    editStatus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectLoading: false,
      withdrawalRequestsOption: [],
      formInfo: {
        method: 'BANK_TRANSACTION',
        third_party_transactional_id: '',
        status: 'ACTIVE',
        withdrawal_request_id: '',
        source_amount: null,
        source_currency: null,
        transaction_fee: null,
        transaction_currency: null,
        target_amount: null,
        target_currency: null,
        exchange_rate: null,
        source_financial_account_id: null,
        target_financial_account_id: null
      }
    }
  },
  computed: {
  },
  watch: {
    defaultData: {
      deep: true,
      handler (newVal) {
        if (newVal) {
          this.initData(newVal)
        }
      }
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData (data) {
      Object.keys(this.formInfo).forEach((key) => {
        if (this.editStatus && data && data.id) {
          this.formInfo[key] = data[key]
        } else if (key === 'method') {
          this.formInfo[key] = 'BANK_TRANSACTION'
        } else if (key === 'status') {
          this.formInfo[key] = 'ACTIVE'
        } else {
          this.formInfo[key] = null
        }
      })
    },
    withdrawalInputHander (val) {
      const selectItem = this.withdrawalRequestsList.find(item => item.id === val)
      if (selectItem && selectItem.id) {
        Object.keys(this.formInfo).forEach((key) => {
          if (key !== 'status' && key !== 'third_party_transactional_id' && key !== 'method') {
            this.formInfo[key] = selectItem[key]
          }
        })
        this.formInfo.withdrawal_request_id = selectItem.id
      } else {
        this.formInfo.withdrawal_request_id = val
      }
    },
    remoteMethod (query) {
      if (!query) {
        return []
      }
      this.loadWithdrawalRequestsList({ query })
        .then((resp) => {
          if (Array.isArray(resp) && resp.length > 0) {
            this.withdrawalRequestsOption = this.cloneObj(resp)
          } else {
            this.withdrawalRequestsOption = []
          }
        })
    },
    closeHandler () {
      this.$emit('update:show', false)
      this.initData()
    },
    saveHandler () {
      this.$refs.accountForm.validate((valid) => {
        if (valid) {
          const params = this.cloneObj(this.formInfo)
          if (!this.editStatus) {
            this.notification({ title: '提示', message: '正在创建转账记录', type: 'warning' })
            this.createAccountingTransactions(params)
              .then((resp) => {
                this.getAccountingTransactionsData()
                this.closeHandler()
                this.notification({ title: '提示', message: '创建转账记录完成', type: 'success' })
              })
          } else {
            this.notification({ title: '提示', message: '正在更新转账记录', type: 'warning' })
            this.updateAccountingTransactions({ params, id: this.defaultData.id })
              .then((resp) => {
                this.getAccountingTransactionsData()
                this.closeHandler()
                this.notification({ title: '提示', message: '更新转账记录完成', type: 'success' })
              })
          }
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

</style>
