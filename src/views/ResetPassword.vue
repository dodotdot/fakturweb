<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md">
        <ResetPasswordForm />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import ResetPasswordForm from '../components/auth/ResetPasswordForm.vue';
import { trackPageView } from '../utils/analytics';

onMounted(() => {
  // Track reset password page view
  trackPageView('/reset-password', 'Reset Password - Faktur.web.id');
});
</script> 