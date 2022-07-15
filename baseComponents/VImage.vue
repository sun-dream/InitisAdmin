<template>
  <el-image :src="src" fit="cover" class="w-100 v-image" v-bind="$attrs" v-on="$listeners">
    <div slot="placeholder" class="image-slot">
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
    font-size: 30px;
  }
}
</style>
