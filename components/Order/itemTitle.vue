<template>
  <h4 class="product-info-title h4 shadowed-sm">
    {{text}}
  </h4>
</template>

<script>
export default {
  name: 'ItemTitle',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
@import "assets/sass/color";
  .product-info-title {
    padding: 10px 6px;
    border-left: 4px solid $primary;
    margin-bottom: 10px;
  }
</style>
