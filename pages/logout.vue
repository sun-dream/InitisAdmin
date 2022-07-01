<template>
  <div />
</template>
<script>
export default {
  name: 'LogoutPage',
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
