<template>
  <div class="w-full max-w-md mx-auto">
    <div class="space-y-6">
      <div class="space-y-2 text-center">
        <h1 class="text-3xl font-bold">Login</h1>
        <p class="text-gray-500 dark:text-gray-400">
          Enter your email and password to access your account
        </p>
      </div>
      
      <div v-if="error" class="p-3 rounded-md bg-red-50 text-red-500 text-sm">
        {{ error }}
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input 
            id="email" 
            v-model="email" 
            type="email" 
            placeholder="your@email.com" 
            required 
          />
        </div>
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <Label for="password">Password</Label>
            <router-link 
              to="/reset-password" 
              class="text-sm text-primary hover:underline"
            >
              Forgot password?
            </router-link>
          </div>
          <Input 
            id="password" 
            v-model="password" 
            type="password" 
            placeholder="••••••••" 
            required 
          />
        </div>
        <Button :loading="isLoading" type="submit" class="w-full">
          Sign In
        </Button>
      </form>
      
      <div class="text-center text-sm">
        Don't have an account?
        <router-link to="/register" class="font-medium text-primary hover:underline">
          Sign up
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import Button from '../ui/Button.vue';
import Input from '../ui/Input.vue';
import Label from '../ui/Label.vue';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);

async function handleSubmit() {
  try {
    isLoading.value = true;
    error.value = '';
    await authStore.login(email.value, password.value);
    router.push('/dashboard');
  } catch (err) {
    error.value = err.message || 'Failed to log in. Please check your credentials.';
  } finally {
    isLoading.value = false;
  }
}
</script> 