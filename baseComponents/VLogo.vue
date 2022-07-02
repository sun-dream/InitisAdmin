<template>
  <div class="v-logo" @click="redirect">
    <h4
      :class="{'text-white': light}"
      :style="sizeStyle"
      class="brand-font text-center"
    >
      Initi
    </h4>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'VLogo',
  inheritAttrs: false,
  props: {
    light: {
      type: Boolean,
      required: false,
      default: false
    },
    size: {
      type: Number,
      required: false,
      default: 20
    },
    noRedirect: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      projectName: 'Initi',
      brandCn: 'Initi',
      brandEn: 'Initi  '
    }
  },
  computed: {
    ...mapGetters('logic/login', [
      'isLoggedIn'
    ]),
    sizeStyle () {
      return `font-size: ${this.size}px;`
    }
  },
  methods: {
    redirect () {
      if (!this.noRedirect) {
        if (!this.isLoggedIn) {
          this.jumpTo({
            name: 'index'
          })
        } else {
          this.jumpTo({
            name: 'index'
          })
        }
      }
    }
  }
}
</script>

<style scoped >
.v-logo {
  cursor: pointer;
  /*font-family: "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif !important;*/
  /*border-width: 1px;*/
  /*border-style: solid;*/
  /*border-radius: 1px;*/
}
h4 {
  font-weight: 600;

}
.cn-name {
  font-weight: 800;
}

/*img {*/
/*  height: 20px;*/
/*}*/
</style>
