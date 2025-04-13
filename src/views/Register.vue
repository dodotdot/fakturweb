<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md">
        <div class="mb-8 text-center">
          <router-link to="/" class="text-2xl font-bold text-primary">
            FakturWeb
          </router-link>
        </div>
        
        <RegisterForm />
      </div>
    </div>
  </div>
</template>

<script setup>
import RegisterForm from '../components/auth/RegisterForm.vue';
</script> 