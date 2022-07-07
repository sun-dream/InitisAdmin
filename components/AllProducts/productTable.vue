<template>
  <section class="w-100 categorg-wrap h-100">
    <el-table :data="productList" border style="width: 100%" size="small" max-height="700">
      <el-table-column prop="name" label="名称" width="160" />
      <el-table-column prop="status" label="状态" width="120" />
      <el-table-column prop="create_at" label="创建时间" width="120" />
      <el-table-column prop="description" label="备注" min-width="160" />
      <el-table-column prop="name" label="操作" width="160" />
    </el-table>
    <v-paginations
      :vuex-path="productVuexBasePath"
      algin-right
      @pageChange="pageChangeHandler"
    />
  </section>
</template>
<script>
import allProductMixins from '@/mixins/product/allProduct'
// eslint-disable-next-line no-unused-vars
import * as mUtils from '@/assets/utils/mUtils'
import VPaginations from '@/baseComponents/VPaginations'
export default {
  name: 'CategorysComponents',
  components: {
    VPaginations
  },
  mixins: [allProductMixins],
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    pageChangeHandler (data) {
      this.getProductAllData(data)
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
