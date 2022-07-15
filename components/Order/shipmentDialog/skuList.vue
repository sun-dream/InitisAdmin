<template>
  <el-table
    ref="skuTable"
    :data="defaultData"
    border
    size="small"
    max-height="500"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column prop="id" label="商品" width="180">
      <template slot-scope="scope">
        <div class="product-wrap d-flex align-items-center">
          <div class="img-wrap">
            <v-image :src="getSkuImageSrc(scope.row)" />
          </div>
          <div class="product-info ml-2">
            <p class="title-line">
              {{ scope.row.sku_import&& scope.row.sku_import.title ? scope.row.sku_import.title:'' }}
            </p>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="each_overprice" label="单价（基础价格+卖家价格）" width="200">
      <template slot-scope="scope">
        {{ getCurrencySymbols(scope.row.currency) }}
        {{ scope.row.each_base_price+scope.row.each_overprice }}
        ({{ scope.row.each_base_price+'+'+scope.row.each_overprice }})
      </template>
    </el-table-column>
    <el-table-column prop="quantity" label="数量" width="80" />
    <el-table-column prop="final_price" label="总额" width="120">
      <template slot-scope="scope">
        {{ getCurrencySymbols(scope.row.currency) }}
        {{ scope.row.final_price }}
      </template>
    </el-table-column>
    <el-table-column prop="create_at" label="购买时间" min-width="110">
      <template slot-scope="scope">
        <p class="date-warp">
          <i class="el-icon-time" />
          {{ getDate(scope.row.create_at) }}
        </p>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="状态" width="90">
      <template slot-scope="scope">
        {{ getOrderskuStatus(scope.row.status).name }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import ordersMixins from '@/mixins/orders'
import VImage from '@/baseComponents/VImage'
import publicUseMixins from '@/mixins/publicUse'
import * as mUtils from '@/assets/utils/mUtils'
export default {
  name: 'SkuList',
  components: {
    VImage
  },
  mixins: [ordersMixins, publicUseMixins],
  props: {
    defaultData: {
      type: Array,
      default: () => []
    },
    selectSkus: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  computed: {
    getDate (val) {
      return function (val) {
        return mUtils.formatDate(val, 4)
      }
    }
  },
  mounted () {
    this.defaultData.forEach((row) => {
      this.$refs.skuTable.toggleRowSelection(row)
    })
  },
  methods: {
    getSkuImageSrc (data) {
      const imageKeys = ['image1', 'image2', 'image3', 'image4', 'image5']
      let src = ''
      if (!data.sku_import) {
        return ''
      }
      for (let i = 0; i < imageKeys.length; i++) {
        if (data.sku_import[imageKeys[i + 1]]) {
          src = data.sku_import[`${imageKeys[i + 1]}`].external_url
          break
        }
      }
      return src
    },
    handleSelectionChange (val) {
      this.$emit('update:selectSkus', val.length > 0 ? val : [])
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
.item-title{
    display: inline-block;
    width:90px;
    text-align: right;
    margin-right: 6px;
}
.img-wrap{
    width: 50px;
    height: 50px;
    overflow: hidden;
}
.product-info{
    width: 122px;
}
.date-warp{
  line-height: 14px;
}
</style>
