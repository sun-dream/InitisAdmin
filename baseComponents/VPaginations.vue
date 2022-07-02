<template>
  <section
    class="d-flex mt-2"
    :class="{
      'justify-center': alginRight || alginLeft ? false : true,
      'justify-start': alginLeft,
      'justify-end': alginRight,
    }"
  >
    <!-- :page-size="limit" -->

    <el-pagination
      :current-page.sync="page"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="dataTotal"
      @size-change="sizeChangeHandler"
      @current-change="sizeChangeHandler"
    />
    <div class="pageSizes">
      <!-- <v-select
        id="pageSizes-select"
        v-model="limit"
        :items="pageSizes"
        label="Page Sizes"
        hide-details
        single-line
        @change="getData"
      /> -->
    </div>
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
        console.log('limit：' + val)
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
        console.log('page:' + val)
        this.$store.dispatch(this.paginationsVuex + '/updatePage', val)
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
      console.log('pageSize' + val)
      // this.limit = val
      // this.getData()
    },
    currentChangeHandler (val) {
      console.log('page' + val)
    },
    getData () {
      // this.$emit('pageChange')
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
