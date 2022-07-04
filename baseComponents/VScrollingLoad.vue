<template>
  <section id="scrolling-load" class="text-center mt-2">
    <!--
          实现思路：第一页的时候加载全屏幕loading
          页数大于1，并且请求完成后，开始请求下一页
          页数大于1，只加载底部loading
          第一页在vuex中实现
       -->
    <template v-if="isLoading">
      <v-icon class="mdi-spin loading-icon text-primary">
        mdi-loading
      </v-icon>
      <p class="mb-0 text-primary">
        Loading more products...
      </p>
    </template>
    <p v-if="alreadyBottomState" class="grey--text text--lighten-1 mb-0">
      Already at the bottom！
    </p>
  </section>
</template>

<script>
export default {
  name: 'VScrollingLoad',
  props: {
    vuexPath: {
      type: String,
      required: true
    },
    getData: {
      type: Function,
      required: true
    },
    filter: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      // page: 0,
      paginationsVuex: null,
      isLoading: false,
      alreadyBottomState: false
    }
  },
  computed: {
    page: {
      get () {
        return this.$store.getters[this.paginationsVuex + '/page']
      },
      set (val) {
        this.$store.dispatch(this.paginationsVuex + '/updatePage', val)
      }
    },
    valuesTotal () {
      return this.$store.getters[this.paginationsVuex + '/total']
    }
  },
  watch: {},
  mounted () {
    this.initVuex()
    document.querySelector('body').addEventListener('scroll', this.scroll)
  },
  beforeDestroy () {
    document.querySelector('body').removeEventListener('scroll', this.scroll)
  },
  methods: {
    initVuex () {
      this.paginationsVuex = this.cloneObj(this.vuexPath)
      this.$store.dispatch(this.paginationsVuex + '/initPagination')
    },
    nextPage () {
      if (this.page >= this.valuesTotal) {
        this.alreadyBottomState = true
        return
      }
      this.page++
      this.isLoading = true
      this.getData(this.filter).then((resp) => {
        this.isLoading = false
      })
    },
    scroll (e) {
      // this.isLoading = false
      const body = e.target
      const bottomOfWindow =
        body.scrollHeight - body.scrollTop - window.innerHeight <= 200
      // 距离底部200px时加载一次
      if (bottomOfWindow && !this.isLoading) {
        this.nextPage()
      }
    }
  }
}
</script>
<style  scoped>
@import "./assets/sass/color";
.loading-icon {
  font-size: 80px;
  font-weight: bold;
  & + p {
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
