<template>
  <user-login :frame-title="'Log in to  Initi'" />
</template>

<script>
import UserLogin from '@/components/Auth/Login'
export default {
  name: 'LoginPage',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    UserLogin
  },
  layout: 'centerOnly'
}
</script>
