<template>
  <section class="w-100 categorg-wrap">
    <el-table :data="brandStoresList" border style="width: 100%" size="small" max-height="700">
      <el-table-column prop="name" label="商店名称" width="160">
        <template slot-scope="scope">
          <div class="d-flex align-items-center">
            <div class="img-wrap">
              <v-image :src="getBrandStoreImageSrc(scope.row)" style="" />
            </div>
            <div class="store-info ml-2">
              <p class="title-line">
                {{ scope.row.name }}
              </p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120" />
      <el-table-column prop="create_at" label="创建时间" width="120" />
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
      :vuex-path="brandStoresVuexBasePath"
      algin-right
      @pageChange="getBrandStoresData()"
    />
  </section>
</template>
<script>
// import CategorysFilter from './CategorysFilter'
import brandStoresMixins from '@/mixins/brandStores'

import VImage from '@/baseComponents/VImage'
// eslint-disable-next-line no-unused-vars
import * as mUtils from '@/assets/utils/mUtils'
import VPaginations from '@/baseComponents/VPaginations'
export default {
  name: 'CategorysComponents',
  components: {
    VPaginations, VImage
  },
  mixins: [brandStoresMixins],
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
    getBrandStoreImageSrc (data) {
      const src = ''
      return src
    },
    editHandler (category) {
    }
  }
}
</script>
<style lang="scss" scoped>
 .title-line{
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;//溢出内容隐藏
  text-overflow: ellipsis;//文本溢出部分用省略号表示
  display: -webkit-box;//特别显示模式
  -webkit-line-clamp: 2;//行数
  line-clamp: 2;
  -webkit-box-orient: vertical;//盒子中内容竖直排列
}

.img-wrap{
    width: 50px;
    height: 50px;
    overflow: hidden;
}
.store-info{
    width: 122px;
    line-height: 14px;
}
.date-warp{
  line-height: 14px;
}
</style>
