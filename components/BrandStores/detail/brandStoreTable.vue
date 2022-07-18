<template>
  <section class="w-100 brand-store-table-wrap">
    <item-title :text="`商品列表 -（${tables.length}）个商品`" />
    <el-table :data="tables" border size="small" max-height="660">
      <el-table-column prop="name" label="图片" width="60">
        <template slot-scope="scope">
          <div class="table-cell-pic-wrap d-flex  align-items-center">
            <v-image :src="scope.row.product_import&&scope.row.product_import.image1 ?scope.row.product_import.image1.external_url:''" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="商品名称" width="220">
        <template slot-scope="scope">
          <div class="title-line">
            {{ scope.row.product_import&&scope.row.product_import.title ? scope.row.product_import.title:'-' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag> {{ scope.row.product_import&&scope.row.product_import.status ? getStatus(scope.row.product_import.status):'-' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="source" label="sku" width="160">
        <template slot-scope="scope">
          <div v-if="scope.row.product_import&&scope.row.product_import.sku_imports">
            一共有
            <v-button size="small" type="primary" plain>
              {{ scope.row.product_import.sku_imports.length }}
            </v-button>
            个sku
          </div>
          <div v-else>
            未检测出sku
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="source" label="备注" min-width="160">
        <template slot-scope="scope">
          {{ scope.row.product_import&&scope.row.product_import.description ? scope.row.product_import.description :'-' }}
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>
<script>
import itemTitle from '../itemTitle.vue'
import brandStoresMixins from '@/mixins/brandStores'
import publicUseMixins from '@/mixins/publicUse'
// import VLink from '@/baseComponents/VLink'
import VImage from '@/baseComponents/VImage'
import VButton from '@/baseComponents/VButton'
// import * as mUtils from '@/assets/utils/mUtils'
import uploadFilesMixins from '@/mixins/uploadFiles'
export default {
  name: 'BrandStoreTable',
  components: {
    itemTitle, VImage, VButton
    // VLink,
  },
  mixins: [brandStoresMixins, publicUseMixins, uploadFilesMixins],
  props: {
    defaultData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      tables: []
    }
  },
  computed: {
  },
  watch: {
    defaultData (newData) {
      this.initData(this.cloneObj(newData))
    }
  },
  mounted () {
    this.initData(this.cloneObj(this.defaultData))
  },
  methods: {
    uploadPicHandler (key) {
    },
    enlargePicHandler (key, value) {

    },
    handlePicRemove (key) {
    },
    uploadSuccessHandler (param) {
    },
    beforePicUpload (file) {

    },
    uploadRequest (param) {

    },
    resetForm () {

    },
    saveHandler () {

    },
    initData (data) {
      if (data && Array.isArray(data.modules) && data.modules.length > 0) {
        this.tables = data.modules
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "assets/sass/color";
  .table-cell-pic-wrap{
    width: 40px;
    height: 40px;
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
