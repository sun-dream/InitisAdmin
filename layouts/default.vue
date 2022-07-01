<template>
<nuxt/>
  <!-- <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.cpnName" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
      <v-notification />
      <v-loading />
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app> -->
</template>

<script>
// import VLoading from "../baseComponents/VLoading";
// import VNotification from "../baseComponents/VNotification";
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { title: "商品管理", icon: "mdi-home-variant",cpnName:'/all-product'},
        { title: "创建商品", icon: "mdi-dolly",cpnName:'/create-product' },
        { title: "分类管理", icon: "mdi-sitemap",cpnName:'/category' },
        { title: "物流模板", icon: "mdi-truck-fast",cpnName:'/shipping' },
        { title: "订单管理", icon: "mdi-clipboard-file",cpnName:'/order' },
        { title: "已支付订单", icon: "mdi-database-check",cpnName:'/payments' },
        { title: "所有用户", icon: "mdi-account-box-multiple",cpnName:'/all-user' },
      ],
      miniVariant: false,
      title: 'Initi - Admin'
    }
  },
  components: {
    // VLoading,
    // VNotification
  },
}
</script>
