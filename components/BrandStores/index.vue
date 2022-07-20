<template>
  <section class="w-100 brand-stores-wrap">
    <brand-stores-query />
    <el-table :data="brandStoresList" border style="width: 100%" max-height="700">
      <el-table-column prop="name" label="商店名称" width="220">
        <template slot-scope="scope">
          <div class="d-flex align-items-center">
            <div class="img-wrap">
              <v-image :src="getBrandStoreImageSrc({data:scope.row,key:'logo'})" />
            </div>
            <div class="store-info ml-2">
              <p class="title-line">
                <span class="text-info">Name:</span>
                <v-link v-if="scope.row.user_id" :name="'all-user'" :query="{query:scope.row.user_id}">
                  {{ scope.row.name }}
                </v-link>
              </p>
              <p class="">
                <span class="text-info">Email:</span>  {{ scope.row.email }}
              </p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template slot-scope="scope">
          {{ getBrandStoresStatus(scope.row.status)['name']||'-' }}
        </template>
      </el-table-column>

      <el-table-column prop="create_at" label="创建时间" width="120">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ getDate(scope.row.create_at) }}
        </template>
      </el-table-column>
      <el-table-column prop="modules" label="贴纸" width="70">
        <template slot-scope="scope">
          <div class="img-wrap">
            <v-image :src="getBrandStoreImageSrc({data:scope.row,key:'sticker'})" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="modules" label="导入商品数量" width="120">
        <template slot-scope="scope">
          {{ scope.row.modules ? scope.row.modules.length :0 }}
        </template>
      </el-table-column>
      <el-table-column prop="modules" label="社交平台地址" min-width="160">
        <template slot-scope="scope">
          <p v-if="scope.row.tiktok" class="title-line-1">
            <span class="text-info">Tiktok:</span>
            <a target="_blank" :href="scope.row.tiktok">{{ scope.row.tiktok }}</a>
          </p>
          <p v-if="scope.row.youtube" class="title-line-1">
            <span class="text-info">Youtube:</span>
            <a target="_blank" :href="scope.row.youtube">{{ scope.row.youtube }}</a>
          </p>
          <p v-if="scope.row.facebook" class="title-line-1">
            <span class="text-info">Facebook:</span>
            <a target="_blank" :href="scope.row.facebook">{{ scope.row.facebook }}</a>
          </p>
          <p v-if="scope.row.instagram" class="title-line-1">
            <span class="text-info">Instagram:</span>
            <a target="_blank" :href="scope.row.instagram">{{ scope.row.instagram }}</a>
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="goDetail(scope.row)">
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
import brandStoresQuery from './brandStoresQuery.vue'
import brandStoresMixins from '@/mixins/brandStores'
import VImage from '@/baseComponents/VImage'
import VLink from '@/baseComponents/VLink'
import * as mUtils from '@/assets/utils/mUtils'
import VPaginations from '@/baseComponents/VPaginations'
export default {
  name: 'BrandStores',
  components: {
    VPaginations, VImage, VLink, brandStoresQuery
  },
  mixins: [brandStoresMixins],
  data () {
    return {
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
    getBrandStoreImageSrc ({ data, key }) {
      if (key === 'logo') {
        return data.logo_id && data.logo ? data.logo.external_url : ''
      } if (key === 'sticker') {
        return data.sticker_id && data.sticker ? data.sticker.external_url : ''
      } else {
        return ''
      }
    },
    goDetail (data) {
      this.jumpTo({ name: 'brand-stores-id', params: { id: data.id } })
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
 .title-line-1{
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;//溢出内容隐藏
  text-overflow: ellipsis;//文本溢出部分用省略号表示
  display: -webkit-box;//特别显示模式
  -webkit-line-clamp: 1;//行数
  line-clamp: 1;
  -webkit-box-orient: vertical;//盒子中内容竖直排列
  line-height: 14px;
}

.img-wrap{
    width: 50px;
    height: 50px;
    overflow: hidden;
}
.store-info{
    width: 150px;
    line-height: 14px;
}
.date-warp{
  line-height: 14px;
}
</style>
