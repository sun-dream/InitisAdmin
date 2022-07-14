<template>
  <el-button v-bind="$attrs" v-on="$listeners">
    <slot />
  </el-button>
</template>
<script>
export default {
  name: 'VButton',
  inheritAttrs: false,
  props: {
  }
}
</script>
<style lang="scss" scoped>

</style>
