<template>
  <all-user />
</template>
<script>
import AllUser from '@/components/AllUser'
import breadcrumbMixins from '@/mixins/breadcrumb'
import userMixins from '@/mixins/user'
export default {
  name: 'AllUserPage',
  components: {
    AllUser
  },
  mixins: [userMixins, breadcrumbMixins],
  mounted () {
    this.breadcrumbs = [{ text: '用户列表', cpnName: 'all-user' }]
    this.getUserData()
  }
}
</script>
