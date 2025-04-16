<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import RegisterForm from '../components/auth/RegisterForm.vue';
import { trackPageView } from '../utils/analytics';

onMounted(() => {
  // Track register page view
  trackPageView('/register', 'Register - Buat Akun Faktur Online Baru');
});
</script> 