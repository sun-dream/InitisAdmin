<template>
  <el-aside :width="isCollapse?'auto':'120px'" class="pos-r">
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
          :index="menuItem.index"
          class="Level-one-menu"
        >
          <v-link :name="menuItem.cpn" class="leftMenuLink">
            <i v-if="menuItem.menuIcon" :class="menuItem.menuIcon" class="mx-0 nav-icon my-0" />
            <div v-else class="mx-0 nav-icon my-0">
              {{ menuItem.menuText }}
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
      defaultActive: '',
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
    this.initActive(this.$route.name)
  },
  methods: {
    initActive (cpnName) {
      this.defaultActive = cpnName
    }
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
