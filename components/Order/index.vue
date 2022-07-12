<template>
  <section class="w-100 user-wrap">
    <!-- <user-filter
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
    /> -->
  </section>
</template>
<script>
import userMixins from '@/mixins/user'
// eslint-disable-next-line no-unused-vars
import * as mUtils from '@/assets/utils/mUtils'
// import VPaginations from '@/baseComponents/VPaginations'
export default {
  name: 'MyOrder',
  components: {
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
  },
  mounted () {
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
@import "assets/sass/color";

</style>
