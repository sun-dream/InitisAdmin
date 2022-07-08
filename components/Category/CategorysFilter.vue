<template>
  <div class="d-flex justify-content-between mb-2">
    <el-form
      ref="queryForm"
      :inline="true"
      :model="categoryFilter"
      label-width="50px"
      @submit.native.prevent
    >
      <el-form-item label="查询" class="mb-0">
        <el-input v-model="categoryFilter.query" @keyup.enter.native="searchHandle" />
      </el-form-item>
      <el-form-item class="mb-0">
        <v-button type="primary" size="small" icon="el-icon-search" @click="searchHandle">
          查询
        </v-button>
      </el-form-item>
    </el-form>
    <div class="p-1">
      <v-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="createHandler">
        新增分类
      </v-button>
    </div>

    <el-dialog :title="categoryFormTitle" :visible="categoryDialog">
      <el-form ref="categoryDetailForm" :model="categoryForm" class="px-4" :rules="categoryFormRules">
        <el-form-item label="分类名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="categoryForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="categoryForm.status"
            active-text="开启"
            inactive-text="关闭"
            :active-value="statusEnum.ACTIVE"
            :inactive-value="statusEnum.INACTIVE"
          />
        </el-form-item>

        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="categoryForm.description" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEditFormHandler">
          取 消
        </el-button>
        <el-button type="primary" @click="saveEditFormHandler">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VButton from '../../baseComponents/VButton.vue'
import categoryMixins from '@/mixins/product/category'
export default {
  name: 'CategorysFilter',
  components: {
    VButton
  },
  mixins: [categoryMixins],
  props: {
    categoryFormTitle: {
      type: String,
      default: ''
    },
    categoryDialog: {
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
      formLabelWidth: '90px',
      categoryFilter: {
        query: ''
      },
      categoryForm: {
        name: '',
        description: '',
        status: 'ACTIVE',
        id: null
      }
    }
  },
  methods: {
    searchHandle () {
      this.getCategoryAllData(this.categoryFilter)
    },
    createHandler () {
      this.$emit('create')
    },
    closeEditFormHandler () {
      this.categoryForm = {
        name: '',
        description: '',
        id: null,
        status: 'ACTIVE'
      }
      this.$refs.categoryDetailForm.resetFields()
      this.$emit('close')
    },
    saveEditFormHandler () {
      this.$refs.categoryDetailForm.validate((valid) => {
        if (!valid) {
          this.notification({ title: '提示', message: '请正确填写内容！', type: 'warning' })
          return false
        }
        this.$emit('save', this.cloneObj(this.categoryForm))
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
