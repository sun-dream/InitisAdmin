<template>
  <div class="d-flex align-items-center">
    <div class="table-cell-pic-wrap ">
      <v-image :src="getPicSrc" />
    </div>
    <div class="sku-info">
      <p class="title-line sku-info-item">
        名称：
        <v-link name="order" :query="{query:defaultData.order_id}">
          {{ defaultData.sku_import_id&&defaultData.sku_import&&defaultData.sku_import.title?defaultData.sku_import.title:'-' }}
        </v-link>
      </p>
      <p class="sku-info-item">
        数量：  {{ defaultData.quantity||'-' }}
      </p>
      <p class="sku-info-item">
        总价：
        {{ getCurrencySymbols(defaultData.currency)||'-' }}
        {{ defaultData.final_price||'-' }}
      </p>
      <p class="sku-info-item">
        购买日期：
        <i class="el-icon-time" />
        {{ getDate(defaultData.create_at)||'-' }}
      </p>
    </div>
  </div>
</template>
<script>
import publicUseMixins from '@/mixins/publicUse'
import VImage from '@/baseComponents/VImage'
import * as mUtils from '@/assets/utils/mUtils'
import VLink from '@/baseComponents/VLink'
export default {
  name: 'SkuItem',
  components: { VImage, VLink },
  mixins: [publicUseMixins],
  props: {
    defaultData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
    }
  },
  computed: {
    getDate (val) {
      return function (val) {
        return mUtils.formatDate(val, 3)
      }
    },
    getPicSrc () {
      if (this.defaultData.id && this.defaultData.sku_import.id && this.defaultData.sku_import.image1_id && this.defaultData.sku_import.image1) {
        return this.defaultData.sku_import.image1.external_url
      } else {
        return ''
      }
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
@import "assets/sass/color";
    .title-line{
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;//溢出内容隐藏
        text-overflow: ellipsis;//文本溢出部分用省略号表示
        display: -webkit-box;//特别显示模式
        -webkit-line-clamp: 1;//行数
        line-clamp:1;
        -webkit-box-orient: vertical;//盒子中内容竖直排列
    }
  .table-cell-pic-wrap{
    width: 60px;
    height: 60px;
  }
  .sku-info{
    width: 150px;
    margin-left: 10px;
  }
  .sku-info-item{
    line-height:16px;
  }
</style>
