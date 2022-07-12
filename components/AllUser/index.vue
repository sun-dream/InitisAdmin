<template>
  <section class="w-100 user-wrap">
    <user-filter
      ref="userFilter"
      :user-form-title="userFormTitle"
      :user-dialog="userDialog"
      :select-edit-id="selectEditId"
      @close="closeHandler"
      @save="saveHandler"
    />
    <el-table :data="userList" border size="small" max-height="700">
      <el-table-column prop="full_name" label="名字" width="160">
        <template slot-scope="scope">
          <el-tag size="medium">
            {{ scope.row.full_name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="140" />
      <el-table-column prop="phone" label="电话" width="140" />
      <el-table-column prop="hashed_password" label="密码" width="160">
        <template slot-scope="scope">
          <p class="title-line">
            {{ scope.row.hashed_password }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="create_at" label="创建时间" width="110">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ getDate(scope.row.create_at) }}
        </template>
      </el-table-column>
      <el-table-column prop="create_at" label="激活状态、超级管理员状态" min-width="200">
        <template slot-scope="scope">
          <div class="d-flex align-items-center">
            <span :class="`${scope.row.is_active ? 'text-primary':'text-info'} mr-2`">
              {{ scope.row.is_active ? '已激活':'未激活' }}
            </span>
            <el-tag v-if="scope.row.is_superuser" size="small" effect="dark">
              超级管理员
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editHandler(scope.row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-paginations
      :vuex-path="userVuexBasePath"
      algin-right
      @pageChange="pageChangeHandler"
    />
  </section>
</template>
<script>
import userFilter from './userFilter'
import userMixins from '@/mixins/user'
// eslint-disable-next-line no-unused-vars
import * as mUtils from '@/assets/utils/mUtils'
import VPaginations from '@/baseComponents/VPaginations'
export default {
  name: 'AllUser',
  components: {
    userFilter,
    VPaginations
  },
  mixins: [userMixins],
  data () {
    return {
      userDialog: false,
      userFormTitle: '',
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
    pageChangeHandler () {
      this.getUserData()
    },
    editHandler (user) {
      this.userDialog = true
      this.userFormTitle = '编辑用户信息'
      const data = this.cloneObj(user)
      this.$refs.userFilter.userForm = data
      this.selectEditId = user.id
    },
    closeHandler () {
      this.userDialog = false
      this.userFormTitle = ''
      this.selectEditId = null
    },
    saveHandler (params) {
      const data = this.cloneObj(params)
      delete data.id
      this.notification({ title: '提示', message: '用户正在更新中...', type: 'warning' })
      this.updateUser({ params: data, id: params.id })
        .then((resp) => {
          this.notification({
            title: '修改成功',
            message: '已更新列表！',
            type: 'success'
          })
          this.getUserData()
          this.closeHandler()
          this.$refs.userFilter.closeEditFormHandler()
        })
    //   this.updateProductCategory({
    //     params: { ...data },
    //     categoryId: params.id
    //   }).then((resp) => {
    //     this.notification({
    //       title: '修改成功',
    //       message: '已更新列表！',
    //       type: 'success'
    //     })
    //     this.getCategoryAllData()
    //     this.closeHandler()
    //     this.$refs.userFilter.closeEditFormHandler()
    //   })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "assets/sass/color";
    .title-line{
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;//溢出内容隐藏
        text-overflow: ellipsis;//文本溢出部分用省略号表示
        display: -webkit-box;//特别显示模式
        -webkit-line-clamp: 1;//行数
        line-clamp:1;
        -webkit-box-orient: vertical;//盒子中内容竖直排列
    }
</style>
