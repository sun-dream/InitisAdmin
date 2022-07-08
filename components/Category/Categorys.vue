<template>
  <section class="w-100 categorg-wrap">
    <categorys-filter
      ref="categoryFilter"
      :category-form-title="categoryFormTitle"
      :category-dialog="categoryDialog"
      :select-edit-id="selectEditId"
      @create="createHandler"
      @close="closeHandler"
      @save="saveHandler"
    />
    <el-table :data="categoryData" border style="width: 100%" size="small" max-height="700">
      <el-table-column prop="name" label="名称" width="160" />
      <el-table-column prop="status" label="状态" width="120">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.status"
            :active-value="statusEnum.ACTIVE"
            :inactive-value="statusEnum.INACTIVE"
            @change="statusChangeHandle(scope.row)"
          />
          <span :class="`ml-2 d-inline-block ${scope.row.status===statusEnum.ACTIVE?'el-link':''}`">
            {{ scope.row.status===statusEnum.ACTIVE?'开启':'关闭' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="create_at" label="创建时间" width="120">
        <template slot-scope="scope">
          {{ getDate(scope.row.create_at) }}
        </template>
      </el-table-column>
      <el-table-column prop="description" label="备注" min-width="160" />
      <el-table-column prop="name" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editHandler(scope.row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-paginations
      :vuex-path="categoryVuexBasePath"
      algin-right
      @pageChange="pageChangeHandler"
    />
  </section>
</template>
<script>
import CategorysFilter from './CategorysFilter'
import categoryMixins from '@/mixins/product/category'
// eslint-disable-next-line no-unused-vars
import * as mUtils from '@/assets/utils/mUtils'
import VPaginations from '@/baseComponents/VPaginations'
export default {
  name: 'CategorysComponents',
  components: {
    CategorysFilter,
    VPaginations
  },
  mixins: [categoryMixins],
  data () {
    return {
      categoryDialog: false,
      categoryFormTitle: '',
      selectEditId: null
    }
  },
  computed: {
    getDate (val) {
      return function (val) {
        return mUtils.formatDate(val, 3)
      }
    }
  },
  mounted () {
  },
  methods: {
    statusChangeHandle (item) {
      this.updateProductCategory({
        params: { status: item.status === this.statusEnum.ACTIVE ? this.statusEnum.INACTIVE : this.statusEnum.ACTIVE },
        categoryId: item.id
      }).then((resp) => {
        this.notification({
          title: '修改成功',
          message: '已更新列表！',
          type: 'success'
        })
        this.getCategoryAllData()
      })
    },
    pageChangeHandler () {
      this.getCategoryAllData()
    },
    editHandler (category) {
      this.categoryDialog = true
      this.categoryFormTitle = '编辑商品分类'
      const data = this.cloneObj(category)
      this.$refs.categoryFilter.categoryForm = data
      this.selectEditId = category.id
    },
    createHandler () {
      this.categoryDialog = true
      this.categoryFormTitle = '创建商品分类'
      this.selectEditId = null
    },
    closeHandler () {
      this.categoryDialog = false
      this.categoryFormTitle = ''
      this.selectEditId = null
    },
    saveHandler (params) {
      const data = this.cloneObj(params)
      delete data.id
      if (params.id) {
        this.updateProductCategory({
          params: { ...data },
          categoryId: params.id
        }).then((resp) => {
          this.notification({
            title: '修改成功',
            message: '已更新列表！',
            type: 'success'
          })
          this.getCategoryAllData()
          this.closeHandler()
          this.$refs.categoryFilter.closeEditFormHandler()
        })
      } else {
        this.createdProductCategory(data)
          .then((resp) => {
            this.notification({
              title: '创建成功',
              message: '已更新列表！',
              type: 'success'
            })
            this.getCategoryAllData()
            this.closeHandler()
            this.$refs.categoryFilter.closeEditFormHandler()
          })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "assets/sass/color";
  .el-link{
    // color:$info;
  }
</style>
