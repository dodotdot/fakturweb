<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md">        
        <div v-if="registered" class="mb-4 p-4 bg-green-50 text-green-700 rounded-md">
          Registration successful! Please check your email to confirm your account, then login below.
        </div>
        
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import LoginForm from '../components/auth/LoginForm.vue';
import { trackPageView } from '../utils/analytics';

const route = useRoute();
const registered = computed(() => route.query.registered === 'true');

onMounted(() => {
  // Track login page view
  trackPageView('/login', 'Login - Akses Akun Faktur Online Anda');
});
</script> 