<template>
  <n-link
    :to="{
      name:name,
      params:params
    }"
    :class="className"
  >
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
    params: {
      type: Object,
      default: () => ({})
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
