<template>
  <section class="w-100 categorg-wrap h-100">
    <el-table :data="productList" border style="width: 100%" size="small" max-height="680">
      <el-table-column prop="name" label="图片" width="100">
        <template slot-scope="scope">
          <div class="table-cell-pic-wrap d-flex  align-items-center">
            <v-image :src="scope.row.image1?scope.row.image1.external_url:''" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="商品名称" width="220">
        <template slot-scope="scope">
          <div class="title-line">
            {{ scope.row.title }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag> {{ getStatus(scope.row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="source" label="sku" width="160">
        <template slot-scope="scope">
          <div v-if="scope.row.skus.length">
            一共有
            <v-button size="small" type="primary" plain>
              {{ scope.row.skus.length }}
            </v-button>
            个sku
          </div>
          <div v-else>
            未检测出sku,<span>现在创建？</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="source" label="厂商信息" min-width="160">
        <template slot-scope="scope">
          <div class="source-wrap">
            <p>
              名称：
              <el-link type="primary" :href="scope.row.source" :underline="false" target="_blank">
                {{ scope.row.source_name }}
              </el-link>
            </p>
            <p>地址：{{ scope.row.source_contact }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editHandler(scope.row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-paginations
      :vuex-path="productVuexBasePath"
      algin-right
      @pageChange="pageChangeHandler"
    />
  </section>
</template>
<script>
import VButton from '../../baseComponents/VButton.vue'
import allProductMixins from '@/mixins/product/allProduct'
import publicUseMixins from '@/mixins/publicUse'
// eslint-disable-next-line no-unused-vars
// import * as mUtils from '@/assets/utils/mUtils'
import VPaginations from '@/baseComponents/VPaginations'
import VImage from '@/baseComponents/VImage'
export default {
  name: 'CategorysComponents',
  components: {
    VPaginations, VImage, VButton
  },
  mixins: [allProductMixins, publicUseMixins],
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    editHandler (product) {
      this.$router.push({
        name: 'all-product-edit-id',
        params: { id: product.id }
      })
    },
    pageChangeHandler (data) {
      this.getProductAllData(data)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "assets/sass/color";
  .table-cell-pic-wrap{
    width: 80px;
    height: 80px;
  }
  .title-line{
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;//溢出内容隐藏
  text-overflow: ellipsis;//文本溢出部分用省略号表示
  display: -webkit-box;//特别显示模式
  -webkit-line-clamp: 3;//行数
  line-clamp: 3;
  -webkit-box-orient: vertical;//盒子中内容竖直排列
}
</style>
