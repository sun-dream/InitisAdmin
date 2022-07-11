<template>
  <section
    ref="productEditWrap"
    class="w-100 product-edit-wrap "
    @scroll="handleScroll"
  >
    <div ref="btnWrap" :class="`btn-wrap shadowed d-flex justify-content-between align-items-center ${headerFixed ? 'issFixed' : ''}`">
      <p>
        共有
        <span class="text-primary mx-1">{{ skus.length }}</span>
        个sku
      </p>
      <div>
        <v-button size="small" @click="goToCreateHandler">
          创建新的SKU
        </v-button>
        <v-button type="primary" size="small">
          商品更新
        </v-button>
      </div>
    </div>
    <div class="sku-tabs-wrap">
      <el-tabs v-for="(item,index) in skus" :key="item.id+index" class="sku-item" type="border-card">
        <el-tab-pane label="SKU基础信息">
          <sku-info
            :ref="`skuInfoRef${index}`"
            :edit-status="true"
            :edit-index="index"
            :default-data="item"
            :all-loading="loadings"
            @updateHandler="updateHandler"
          />
        </el-tab-pane>
        <el-tab-pane label="价格管理">
          <sku-price
            :ref="`skuPriceRef${index}`"
            :edit-status="true"
            :default-data="item"
            :edit-index="index"
            :all-loading="loadings"
          />
        </el-tab-pane>
        <el-tab-pane label="图片管理">
          <sku-images
            :ref="`skusFilesRef${index}`"
            :edit-status="true"
            :edit-index="index"
            :default-data="item"
            :all-loading="loadings"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </section>
</template>

<script>
import skuInfo from './skuInfo'
import skuPrice from './skuPrice'
import skuImages from './skuImages'
import skuofProductMixins from '@/mixins/product/sku'
import allProductMixins from '@/mixins/product/allProduct'
import uploadFilesMixins from '@/mixins/uploadFiles'
import VButton from '@/baseComponents/VButton'
export default {
  name: 'EditProduct',
  components: { VButton, skuInfo, skuPrice, skuImages },
  mixins: [allProductMixins, uploadFilesMixins, skuofProductMixins],
  data () {
    return {
      offsetTop: 0,
      offsetHeight: 0,
      headerFixed: 0
    }
  },
  computed: {
  },
  mounted () {
    this.initData()
    this.$nextTick(() => {
      // 获取吸顶元素的dom
      const btnWrap = this.$refs.btnWrap
      // 吸顶元素到top的距离
      this.offsetTop = btnWrap.offsetTop
      // 元素自身的高度
      this.offsetHeight = btnWrap.offsetHeight
      // 监听滚动条
      this.$refs.productEditWrap.addEventListener('scroll', this.handleScroll)
    })
  },
  methods: {
    initData () {
      this.getProductItem(this.$route.params.id).then((resp) => {
        if (resp === null || !resp.id) {
          this.notification({ title: '提示', message: '未检测到商品信息，返回到商品列表', type: 'error' })
          this.jumpTo({ name: 'index' })
        }
        if (Array.isArray(resp.skus) && resp.skus.length > 0) {
          this.skus = this.cloneObj(resp.skus)
        }
      })
    },
    handleScroll () {
      // 得到页面滚动的距离，兼容写法
      const scrollTop =
        this.$refs.productEditWrap.pageYOffset ||
        this.$refs.productEditWrap.scrollTop ||
        this.$refs.productEditWrap.scrollTop
      // 判断页面滚动的距离是否大于吸顶元素的位置
      this.headerFixed = scrollTop > this.offsetTop + this.offsetHeight
    },
    goToCreateHandler () {
      if (this.$route.params.id) {
        this.jumpTo({ name: 'all-product-sku-id-create', params: { id: this.$route.params.id } })
      }
    },
    updateHandler ({ key, value, index }) {
      const loadingName = key + index + 'loading'
      this.loadings.push(loadingName)
      const data = this.cloneObj(this.skus[index])
      const { id, params } = this.initUpdateParams({ key, value, data })
      this.notification({ title: '发起请求', message: `${key}-正在更新中`, type: 'warning' })
      this.updateSku({ params, skuId: id })
        .then((resp) => {
          this.loadings.splice(this.loadings.findIndex(item => item === loadingName), 1)
          this.notification({ title: '请求结果', message: `${key}-正在更新完成`, type: 'success' })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.sku-tabs-wrap{
  width:780px;
  margin: 0 auto;
}
.btn-wrap {
  height: 40px;
  width: 780px;
  margin: 0 auto 10px;
  padding: 0 10px;
  background:#fff;
}
.issFixed {
  position: absolute;
  width:780px;
  top: 35px;
  left: 50%;
  margin-left: -378px;
  right: 0px;
  z-index: 4;
}
.sku-item{
  margin-bottom: 10px;
}
</style>
