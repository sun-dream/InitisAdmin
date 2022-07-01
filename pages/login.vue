<template>
  <user-login :frame-title="'Log in to  Initi'" />
</template>

<script>
import UserLogin from '@/components/Auth/Login'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    UserLogin
  },
  layout: 'centerOnly'
}
</script>
