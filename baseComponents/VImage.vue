<template>
  <el-image :src="src" fit="cover" class="w-100 v-image " v-bind="$attrs" v-on="$listeners">
    <div slot="placeholder" class="image-slot text-center w-100">
      <i class="el-icon-loading" />
    </div>
    <el-image slot="error" fit="contain" :src="errorSrc" />
  </el-image>
</template>
<script>
const defaultImgSrc = '/default.png'
export default {
  name: 'VImage',
  components: {
  },
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      errorSrc: defaultImgSrc
    }
  },
  computed: {
  },
  mounted () {},
  methods: {
  }
}
</script>
<style  scoped lang="scss">
.v-image{
  font-size:0
}
.image-slot{

  i{
    // display: inline-block;
    // transform: translateX(-50%);
      // vertical-align:middle;
    font-size: 30px;
  }
}
</style>
