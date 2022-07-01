<template>
  <reset-password-page :frame-title="'Forgot Password?'" />
</template>
<script>
import ResetPasswordPage from '@/components/Auth/ResetPassword'
export default {
  name: 'ResetPasswordPage',
  components: {
    ResetPasswordPage
  },
  layout: 'centerOnly',
  mounted () {
  }
}
</script>
