<template>
  <section class="w-100 brand-store-info-wrap">
    <v-blockquote text="基本信息">
      <div>
        <v-button size="mini" @click="resetForm">
          重置
        </v-button>
        <v-button size="mini" type="primary" :disabled="saveState" @click="saveHandler">
          保存
        </v-button>
      </div>
    </v-blockquote>
    <el-form ref="infoFormRef" :model="formInfo" :rules="brandStoreRules" label-width="120px">
      <el-row :gutter="20" class="detail-item">
        <el-col :span="10">
          <el-form-item label="名称" prop="name">
            <v-input v-model="formInfo.name" placeholder="Store名称" @blur="inputBarHandler" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="Path" prop="path">
            <v-input v-model="formInfo.path" placeholder="path" @blur="inputBarHandler" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="状态" prop="status">
            <el-select v-model="formInfo.status" placeholder="请选择" @change="inputBarHandler">
              <el-option
                v-for="item in brandStoresStatusOption"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="邮箱" prop="email">
            <v-input v-model="formInfo.email" placeholder="邮箱地址" @blur="inputBarHandler" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="tiktok" prop="tiktok">
            <v-input v-model="formInfo.tiktok" placeholder="tiktok link" @blur="inputBarHandler" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="youtube" prop="youtube">
            <v-input v-model="formInfo.youtube" placeholder="youtube link" @blur="inputBarHandler" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="facebook" prop="facebook">
            <v-input v-model="formInfo.facebook" placeholder="facebook link" @blur="inputBarHandler" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="instagram" prop="instagram">
            <v-input v-model="formInfo.instagram" placeholder="instagram link" @blur="inputBarHandler" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="货币代码" prop="currency_code">
            <el-select v-model="formInfo.currency_code" filterable placeholder="请选择" @change="inputBarHandler">
              <el-option
                v-for="item in currencysOption"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="绑定用户" prop="user_id">
            <el-select
              v-model="formInfo.user_id"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="userSelectLoading"
              @change="inputBarHandler"
            >
              <el-option
                v-for="item in userOption"
                :key="item.id"
                :label="item.email"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <v-input v-model="formInfo.description" type="textarea" placeholder="..." @blur="inputBarHandler" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </section>
</template>
<script>
import brandStoresMixins from '@/mixins/brandStores'
import publicUseMixins from '@/mixins/publicUse'
import userMixins from '@/mixins/user'
import VInput from '@/baseComponents/VInput'
import VButton from '@/baseComponents/VButton'
import VBlockquote from '@/baseComponents/VBlockquote'
export default {
  name: 'BrandStoreInfo',
  components: {
    VInput, VBlockquote, VButton
  },
  mixins: [brandStoresMixins, publicUseMixins, userMixins],
  props: {
    defaultData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      saveState: true,
      formInfo: {
        user_id: '',
        name: '',
        path: '',
        description: '',
        status: '',
        email: '',
        tiktok: '',
        youtube: '',
        facebook: '',
        instagram: '',
        currency_code: ''
      },
      userSelectLoading: false
    }
  },
  computed: {
  },
  watch: {
    defaultData (newData) {
      this.initData(this.cloneObj(newData))
    }
  },
  mounted () {
    this.initData(this.cloneObj(this.defaultData))
  },
  methods: {
    remoteMethod (query) {
      if (query !== '') {
        this.userSelectLoading = true
        this.loadUserList({ query })
          .then((resp) => {
            this.userSelectLoading = false
            this.userOption = resp
          })
      } else {
        this.userOption = []
      }
    },
    inputBarHandler (val) {
      this.saveState = false
    },
    resetForm () {
      this.notification({ title: '提示', message: '信息重置', type: 'info' })
      this.initData(this.cloneObj(this.defaultData))
    },
    saveHandler () {
      this.$refs.infoFormRef.validate((valid) => {
        if (!valid) {
          this.notification({ title: '提示', message: '请正确填写内容！', type: 'warning' })
          return false
        }
        this.notification({ title: '提示', message: '正在更新当前店铺信息', type: 'warning' })
        this.updateBrandStores({ params: this.formInfo, id: this.defaultData.id })
          .then((resp) => {
            this.saveState = true
            if (resp.id) {
              this.loadBrandStoreItem(resp.id)
              this.notification({ title: '请求结果', message: '更新成功，正在重载中...', type: 'success' })
            }
          })
      })
    },
    initData (data) {
      Object.keys(this.formInfo).forEach((key) => {
        this.formInfo[key] = data[key]
      })
      if (this.formInfo.user_id) {
        this.remoteMethod(this.formInfo.user_id)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
