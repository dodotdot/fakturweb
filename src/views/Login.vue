<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md">
        <div class="mb-8 text-center">
          <router-link to="/" class="text-2xl font-bold text-primary">
            FAKTUR.web.id
          </router-link>
        </div>
        
        <div v-if="registered" class="mb-4 p-4 bg-green-50 text-green-700 rounded-md">
          Registration successful! Please check your email to confirm your account, then login below.
        </div>
        
        <h2 class="text-2xl font-bold mb-6">Welcome back to FAKTUR.web.id</h2>
        
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import LoginForm from '../components/auth/LoginForm.vue';

const route = useRoute();
const registered = computed(() => route.query.registered === 'true');
</script> 