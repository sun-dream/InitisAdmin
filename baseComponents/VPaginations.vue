<template>
  <section
    class="d-flex mt-2"
    :class="{
      'justify-content-center': alginRight || alginLeft ? false : true,
      'justify-content-start': alginLeft,
      'justify-content-end': alginRight,
    }"
  >
    <el-pagination
      :current-page.sync="page"
      :page-sizes="pageSizes"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="dataTotal"
      @size-change="sizeChangeHandler"
      @current-change="currentChangeHandler"
    />
  </section>
</template>

<script>
export default {
  name: 'VPaginations',
  props: {
    vuexPath: {
      type: String,
      required: true
    },
    alginCenter: {
      type: Boolean,
      default: true
    },
    alginRight: {
      type: Boolean,
      default: false
    },
    alginLeft: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      paginationsVuex: null
    }
  },
  computed: {
    limit: {
      get () {
        return this.$store.getters[this.paginationsVuex + '/limit']
      },
      set (val) {
        this.$store.dispatch(this.paginationsVuex + '/updateLimit', val)
      }
    },
    // skip: {
    //   get() {
    //     return this.$store.getters[this.paginationsVuex + "/skip"];
    //   },
    //   set(val) {
    //     this.$store.dispatch(this.paginationsVuex + "/UPDATE_SKIP", val);
    //   },
    // },
    page: {
      get () {
        return this.$store.getters[this.paginationsVuex + '/page']
      },
      set (val) {
        if (this.paginationsVuex) {
          this.$store.dispatch(this.paginationsVuex + '/updatePage', val)
        }
      }
    },
    pageSizes () {
      return this.$store.getters[this.paginationsVuex + '/pageSizes']
    },
    dataLength () {
      const data = this.$store.getters[this.paginationsVuex + '/data']
      return Array.isArray(data) && data.length > 0 ? data.length : 0
    },
    pageCount () {
      return this.$store.getters[this.paginationsVuex + '/pageCount']
    },
    dataTotal () {
      return this.$store.getters[this.paginationsVuex + '/total']
    }
  },
  watch: {},
  mounted () {
    this.initVuex()
  },
  methods: {
    initVuex () {
      this.paginationsVuex = this.cloneObj(this.vuexPath)
      this.$store.dispatch(this.paginationsVuex + '/initPagination')
    },
    sizeChangeHandler (val) {
      this.limit = val
      this.getData()
    },
    currentChangeHandler (val) {
      this.getData()
    },
    getData () {
      this.$emit('pageChange')
    }
  }
}
</script>
<style  scoped>
    .pageSizes {
        width:120px;
    }
    ::v-deep .pageSizes .v-select{
        padding-top: 0;
    }
</style>
