<template>
  <section
    ref="productEditWrap"
    class="w-100 product-edit-wrap "
    @scroll="handleScroll"
  >
    <div ref="btnWrap" :class="`btn-wrap shadowed d-flex justify-content-between align-items-center ${headerFixed ? 'issFixed' : ''}`">
      <v-button size="small" @click="resetHandler">
        重置到初始状态
      </v-button>
      <v-button type="primary" size="small" @click="submitHandler">
        商品更新
      </v-button>
    </div>
    <product-info
      ref="prodcutInfoRef"
      :edit-status="true"
      :default-data="createProductForm"
      @nextHandler="nextHandler"
    />
    <upload-product-files
      ref="prodcutFilesRef"
      :edit-status="true"
      :default-data="createProductForm"
      :default-upload-file-cache="uploadFileCache"
      @nextHandler="nextHandler"
    />
    <product-description
      ref="prodcutDescriptionRef"
      :edit-status="true"
      :default-data="createProductForm"
      @nextHandler="nextHandler"
    />
  </section>
</template>

<script>
import productInfo from '@/components/CreateProduct/productInfo'
import productDescription from '@/components/CreateProduct/productDescription'
import uploadProductFiles from '@/components/CreateProduct/uploadProductFiles'
import createProductMixins from '@/mixins/product/createProduct'
import allProductMixins from '@/mixins/product/allProduct'
import uploadFilesMixins from '@/mixins/uploadFiles'
import VButton from '@/baseComponents/VButton'
export default {
  name: 'EditProduct',
  components: { productInfo, uploadProductFiles, productDescription, VButton },
  mixins: [createProductMixins, allProductMixins, uploadFilesMixins],
  data () {
    return {
      offsetTop: 0,
      offsetHeight: 0,
      headerFixed: 0
    }
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
        if (!resp.id) {
          return
        }
        Object.keys(resp).forEach((key) => {
          this.createProductForm[key] = resp[key]
        })
        for (let i = 0; i < this.maxNumOfPicUpload; i++) {
          if (resp[`image${i + 1}_id`]) {
            this.uploadFileCache.images.push({
              url: resp[`image${i + 1}`].external_url,
              response: resp[`image${i + 1}`]
            })
          }
        }
        if (resp.video1_id) {
          this.uploadFileCache.videos.push({
            url: resp.video1.external_url,
            name: resp.video1.file_name,
            response: resp.video1
          })
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
    nextHandler ({ status, data, uploadFileCache }) {
      Object.keys(data).forEach((key) => {
        this.createProductForm[key] = data[key]
      })
      if (status === this.stepStatusEnum.productInfo) {
        this.$refs.prodcutFilesRef.nextStepHandler()
      } else if (
        status === this.stepStatusEnum.uploadFiles &&
        this.isDef(uploadFileCache)
      ) {
        this.uploadFileCache = uploadFileCache
        this.$refs.prodcutDescriptionRef.nextStepHandler()
      } else if (status === this.stepStatusEnum.description) {
        this.updateHandler()
      }
    },
    resetHandler () {
      this.initData()
    },
    submitHandler () {
      this.$refs.prodcutInfoRef.nextStepHandler()
    },
    updateHandler () {
      if (this.productItem.id) {
        this.notification({ title: '提示', message: '商品正在更新中...', type: 'warning' })
        this.updateProduct({ data: this.createProductForm, id: this.productItem.id })
          .then((resp) => {
            console.log(resp)
            this.notification({ title: '提示', message: '更新成功！', type: 'success' })
          })
      } else {
        this.notification({ title: '提示', message: '更新失败，请重新尝试', type: 'error' })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.product-edit-wrap {
  height: calc(100% - 28px);
  overflow-y: auto;
}
.btn-wrap {
  height: 40px;
  width: 740px;
  margin: 0 auto;
  margin-bottom: 10px;
  background:#fff;
}
.issFixed {
  position: absolute;
  width:740px;
  top: 35px;
  left: 50%;
  margin-left: -378px;
  right: 0px;
  z-index: 4;
}
</style>
