<template>
  <el-button v-bind="$attrs" v-on="$listeners">
    {{ text }}
    <slot />
  </el-button>
</template>
<script>
export default {
  name: 'VButton',
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
