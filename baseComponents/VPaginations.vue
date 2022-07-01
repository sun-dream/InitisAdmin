<template>
  <section
    class="d-flex mt-2"
    :class="{
      'justify-center': alginRight || alginLeft ? false : true,
      'justify-start': alginLeft,
      'justify-end': alginRight,
    }"
  >
    <v-pagination v-model="page" @input="getData" :length="pageCount" :total-visible="7" ></v-pagination>
    <div class="pageSizes">
      <v-select
        :items="pageSizes"
        v-model="limit"
        label="Page Sizes"
        hide-details
        single-line
        @change="getData"
        id="pageSizes-select"
      ></v-select>
    </div>
  </section>
</template>

<script>
export default {
  name: "VPaginations",
  data() {
    return {
      paginationsVuex: null,
    };
  },
  props: {
    vuexPath: {
      type: String,
      required: true,
    },
    alginCenter: {
      type: Boolean,
      default: true,
    },
    alginRight: {
      type: Boolean,
      default: false,
    },
    alginLeft: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    limit: {
      get() {
        return this.$store.getters[this.paginationsVuex + "/limit"];
      },
      set(val) {
        this.$store.dispatch(this.paginationsVuex + "/updateLimit", val);
      },
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
      get() {
        return this.$store.getters[this.paginationsVuex + "/page"];
      },
      set(val) {
        this.$store.dispatch(this.paginationsVuex + "/updatePage", val);
      },
    },
    pageSizes() {
      return this.$store.getters[this.paginationsVuex + "/pageSizes"];
    },
    dataLength() {
      let data = this.$store.getters[this.paginationsVuex + "/data"]
      return Array.isArray(data)&&data.length>0?data.length:0;
    },
    pageCount() {
      return this.$store.getters[this.paginationsVuex + "/pageCount"];
    },
    dataTotal() {
      return this.$store.getters[this.paginationsVuex + "/total"];
    },
  },
  watch: {},
  mounted() {
    this.initVuex();
  },
  methods: {
    initVuex() {
      this.paginationsVuex = this.cloneObj(this.vuexPath);
      this.$store.dispatch(this.paginationsVuex + "/initPagination");
    },
    getData() {
      this.$emit("pageChange");
    },
  },
};
</script>
<style  scoped>
    .pageSizes {
        width:120px;
    }
    ::v-deep .pageSizes .v-select{
        padding-top: 0;
    }   
</style>

