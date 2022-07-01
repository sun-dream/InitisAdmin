<template>
  <reset-password-page :frame-title="'Forgot Password?'" />
</template>
<script>
import ResetPasswordPage from '@/components/Auth/ResetPassword'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'ResetPassword',
  components: {
    ResetPasswordPage
  },
  layout: 'centerOnly',
  mounted () {
  }
}
</script>
