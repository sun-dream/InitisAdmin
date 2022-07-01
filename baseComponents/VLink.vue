<template>
  <n-link :to="{name:name}" :class="className">
    <slot />
  </n-link>
</template>
<script>
export default {
  name: 'VLink',
  props: {
    name: {
      type: String,
      default: '/'
    },
    className: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {},
  methods: {
  }
}
</script>
<style  scoped>
</style>
