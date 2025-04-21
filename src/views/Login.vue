<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md">        
        <div v-if="registered" class="mb-4 p-4 bg-green-50 text-green-700 rounded-md">
          Registration successful! Please check your email to confirm your account, then login below.
        </div>
        
        <div v-if="betaRegistered" class="mb-4 p-4 bg-purple-50 border border-purple-100 text-purple-700 rounded-md">
          <div class="flex">
            <svg class="h-5 w-5 text-purple-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <div>
              <p class="font-medium">Pendaftaran Beta Tester Berhasil!</p>
              <p class="mt-1">Silakan cek email Anda untuk konfirmasi akun, lalu masuk di bawah ini untuk mulai menikmati fitur premium gratis.</p>
            </div>
          </div>
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
const betaRegistered = computed(() => route.query.beta_registered === 'true');

onMounted(() => {
  // Track login page view
  trackPageView('/login', 'Login - Akses Akun Faktur Online Anda');
});
</script> 