<template>
  <el-header class="my-header d-flex align-items-center justify-content-between">
    <v-logo :size="36" />
    <el-dropdown trigger="click" :hide-on-click="false" @command="handleCommand">
      <span class="el-dropdown-link">
        Hi Admin!<i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>

<script>
import myAppMixins from '@/mixins/myApp'
import VLogo from '@/baseComponents/VLogo'
export default {
  name: 'TheHeader',
  components: {
    VLogo
  },
  mixins: [myAppMixins],
  data () {
    return {
      isCollapse: true,
      menuData: [
        { name: '商品管理', index: 'all-product', menuIcon: 'el-icon-folder', menuText: '商品管理', cpn: 'all-product' },
        { name: '创建商品', index: 'create-product', menuIcon: 'el-icon-folder-add', menuText: '创建商品', cpn: 'create-product' },
        { name: '分类管理', index: 'category', menuIcon: 'el-icon-paperclip', menuText: '分类管理', cpn: 'category' },
        { name: '订单管理', index: 'order', menuIcon: 'el-icon-s-order', menuText: '订单管理', cpn: 'order' },
        { name: '已支付订单', index: 'payments', menuIcon: 'el-icon-s-ticket', menuText: '已支付订单', cpn: 'payments' },
        { name: '所有用户', index: 'all-user', menuIcon: 'el-icon-user', menuText: '所有用户', cpn: 'all-user' }

      ]
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    handleCommand (command) {
      // this.$message('click on item ' + command)
      if (command === 'logout') {
        this.$router.push('logout')
      }
    }
  }
}
</script>
<style scoped lang="scss">
    .my-header{
        border-bottom: 1px solid #ebe9e9;
    }
</style>
