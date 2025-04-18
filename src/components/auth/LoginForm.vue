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
              to="/forgot-password" 
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
      
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
        </div>
      </div>
      
      <div>
        <Button 
          @click="handleGoogleSignIn" 
          :loading="isGoogleLoading" 
          type="button" 
          class="w-full flex items-center justify-center gap-2 bg-white border text-black border-gray-300 dark:border-gray-600  hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Sign in with Google
        </Button>
      </div>
      
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
const isGoogleLoading = ref(false);

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

async function handleGoogleSignIn() {
  try {
    isGoogleLoading.value = true;
    error.value = '';
    await authStore.signInWithGoogle();
    // The redirect will be handled by Supabase
  } catch (err) {
    error.value = err.message || 'Failed to sign in with Google. Please try again.';
    isGoogleLoading.value = false;
  }
}
</script> 