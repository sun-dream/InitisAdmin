<template>
  <el-input
    v-bind="$attrs"
    :disabled="loading"
    :suffix-icon="loading?'el-icon-loading':''"
    v-on="$listeners"
  />
</template>
<script>
export default {
  name: 'VInput',
  inheritAttrs: false,
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
