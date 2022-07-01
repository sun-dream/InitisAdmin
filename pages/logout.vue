<template>
  <div />
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Logout',
  layout: 'centerOnly',
  mounted () {
    this.$cookies.remove('token')
    localStorage.removeItem('token')
    this.jumpTo({ name: 'login' })
  }
}
</script>
<style scoped>
</style>
