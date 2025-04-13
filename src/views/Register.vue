<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md">
        <div class="mb-8 text-center">
          <router-link to="/" class="text-2xl font-bold text-primary">
            <img src="/images/faktur-logo.png" alt="faktur.web.id" class=" h-16 w-auto mx-auto">
          </router-link>
        </div>
        <hr class="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
        <RegisterForm />
      </div>
    </div>
  </div>
</template>

<script setup>
import RegisterForm from '../components/auth/RegisterForm.vue';
</script> 