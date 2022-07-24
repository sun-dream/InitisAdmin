<template>
  <el-aside :width="isCollapse?'auto':'160px'" class="pos-r">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo h-100"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <template v-for="(menuItem, i) in menuData">
        <el-menu-item
          :key="i"
          :index="menuItem.cpnName"
          class="Level-one-menu"
        >
          <v-link :name="menuItem.cpnName" class="leftMenuLink">
            <i v-if="menuItem.menuIcon" :class="menuItem.menuIcon" class="mx-0 nav-icon my-0" />
            <div v-else class="mx-0 nav-icon my-0">
              {{ menuItem.name }}
            </div>
          </v-link>
          <span slot="title">
            {{ menuItem.name }}
          </span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
import myAppMixins from '@/mixins/myApp'
import VLink from '@/baseComponents/VLink'
export default {
  name: 'LeftMenu',
  components: {
    VLink
  },
  mixins: [myAppMixins],
  data () {
    return {
      isCollapse: true,
      // defaultActive: '',
      menuData: [
        { name: '商品管理', menuIcon: 'el-icon-folder', cpnName: 'all-product' },
        { name: '创建商品', menuIcon: 'el-icon-folder-add', cpnName: 'create-product' },
        { name: '分类管理', menuIcon: 'el-icon-paperclip', cpnName: 'category' },
        { name: '订单管理', menuIcon: 'el-icon-s-order', cpnName: 'order' },
        { name: '已支付订单', menuIcon: 'el-icon-s-ticket', cpnName: 'payments' },
        { name: '所有用户', menuIcon: 'el-icon-user', cpnName: 'all-user' },
        { name: 'Brand Store', menuIcon: 'el-icon-s-shop', cpnName: 'brand-stores' },
        { name: '资金流水', menuIcon: 'el-icon-bank-card', cpnName: 'cashflows' },
        { name: '退款管理', menuIcon: 'el-icon-document-remove', cpnName: 'refund-requests' },
        { name: '提现管理', menuIcon: 'el-icon-s-finance', cpnName: 'withdrawal-requests' },
        { name: '转账记录', menuIcon: 'el-icon-money', cpnName: 'accounting-transactions' },
        { name: '预设管理', menuIcon: 'el-icon-files', cpnName: 'preset-libraries' }
      ]
    }
  },
  computed: {
    defaultActive () {
      return this.$route.name
    }
  },
  watch: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style scoped lang="scss">
@import "assets/sass/color";
.aside {
  overflow: hidden;
  position: relative;
  .el-menu-vertical{
    width: 70px;
    border-right-width: 0px;
  }
  .Level-one-menu {
    height: 50px;
    border-radius: 4px;
    padding: 0 !important;
    display: block;
    width: 50px;
    margin: 10px;
    color: white;
    background-color: transparent;
    i {
        font-size: 20px;
    }
  }
}

::v-deep .Level-one-menu{
  &.is-active{
    background-color:rgba(0,0,0,.5) !important;
  }
  div.el-tooltip{
    padding: 0 0 !important;
    text-align: center;

  }
  .nuxt-link-active{
    color: #fff !important;
  }
}

.nav-icon {
  font-size: 30px !important;
}
.break {
  border-top: 3px solid $info;
  margin-top: 10px;
  opacity: .5;
  margin-bottom: 10px;
  padding: 0 3px;
}
.help-btn i {
  font-size: 36px;
  color: #86899C;
  cursor: pointer;
}
</style>
