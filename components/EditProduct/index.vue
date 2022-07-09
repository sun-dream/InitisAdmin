<template>
  <section
    ref="productEditWrap"
    class="w-100 product-edit-wrap "
    @scroll="handleScroll"
  >
    <div ref="btnWrap" :class="`btn-wrap ${headerFixed ? 'issFixed' : ''}`" />
    <product-info
      :edit-status="true"
      :default-data="createProductForm"
      @nextHandler="nextHandler"
    />
    <upload-product-files
      :edit-status="true"
      :default-data="createProductForm"
      :default-upload-file-cache="uploadFileCache"
      @nextHandler="nextHandler"
    />
    <product-description
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

export default {
  name: 'EditProduct',
  components: { productInfo, uploadProductFiles, productDescription },
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
  destroyed () {
    // this.$refs.productEditWrap.removeEventListener('scroll', this.handleScroll)
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
          if (this.createProductForm[`image${i + 1}_id`]) {
            this.uploadFileCache.images.push({
              url: this.createProductForm[`image${i + 1}`].external_url
            })
          }
        }
        if (this.createProductForm.video1_id) {
          this.uploadFileCache.videos.push({
            url: this.createProductForm.video1.external_url,
            name: this.createProductForm.video1.file_name
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
      console.log(this.headerFixed, scrollTop, this.offsetTop, this.offsetHeight)
    },
    nextHandler ({ status, data, uploadFileCache }) {
      Object.keys(data).forEach((key) => {
        this.createProductForm[key] = data[key]
      })
      if (
        status === this.stepStatusEnum.uploadFiles &&
        this.isDef(uploadFileCache)
      ) {
        this.uploadFileCache = uploadFileCache
      }
      if (status === this.stepStatusEnum.description) {
        this.createHandler()
      }
    },
    submitHandler () {
      const data = this.cloneObj(this.createProductForm)
      this.createProduct(data)
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
  width: 100%;
  margin-bottom: 10px;
  background-color: skyblue;
}
.issFixed {
  position: absolute;
  width:calc(100% - 60px);
  top: 35px;
  left: 20px;
  right: 0px;
  z-index: 4;
}
</style>
