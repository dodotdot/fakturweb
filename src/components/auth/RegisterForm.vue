<template>
  <div class="w-full max-w-md mx-auto">
    <div class="space-y-6">
      <div class="space-y-2 text-center">
        <h1 class="text-3xl font-bold">Create an Account</h1>
        <p class="text-gray-500 dark:text-gray-400">
          Enter your details to create a new account
        </p>
      </div>
      
      <div v-if="error" class="p-3 rounded-md bg-red-50 text-red-500 text-sm">
        {{ error }}
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input 
            id="email" 
            v-model="email" 
            type="email" 
            placeholder="your@email.com" 
            required
            class="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div class="space-y-2">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input 
            id="password" 
            v-model="password" 
            type="password" 
            placeholder="••••••••" 
            required
            class="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p class="text-xs text-gray-500">
            Password must be at least 8 characters long
          </p>
        </div>
        
        <div class="space-y-2">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input 
            id="confirmPassword" 
            v-model="confirmPassword" 
            type="password" 
            placeholder="••••••••" 
            required
            class="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div class="flex items-center space-x-2">
          <input 
            id="terms" 
            type="checkbox" 
            v-model="acceptTerms"
            class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            required
          />
          <label for="terms" class="text-sm text-gray-500">
            I agree to the
            <router-link to="/terms-of-service" class="text-primary hover:underline">Terms of Service</router-link>
            and
            <router-link to="/privacy-policy" class="text-primary hover:underline">Privacy Policy</router-link>
          </label>
        </div>
        
        <button 
          type="submit"
          :disabled="isLoading"
          class="w-full inline-flex justify-center items-center h-10 px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <span v-if="isLoading" class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
          Create Account
        </button>
      </form>
      
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
        </div>
      </div>
      
      <!-- Comment out Google Sign Up Section -->
      <!--
      <div>
        <button 
          @click="handleGoogleSignIn" 
          :disabled="isGoogleLoading"
          type="button" 
          class="w-full flex items-center justify-center gap-2 h-10 px-4 py-2 bg-white border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md font-medium hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <span v-if="isGoogleLoading" class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
          <svg v-else class="w-5 h-5" viewBox="0 0 24 24">
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
          Sign up with Google
        </button>
      </div>
      -->
      
      <div class="text-center text-sm">
        Already have an account?
        <router-link to="/login" class="font-medium text-primary hover:underline">
          Sign in
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const acceptTerms = ref(false);
const error = ref('');
const isLoading = ref(false);
const isGoogleLoading = ref(false);

async function handleSubmit() {
  try {
    console.log('Form submitted', { email: email.value, password: password.value });
    
    // Clear previous errors
    error.value = '';
    
    // Validate form
    if (!email.value) {
      error.value = 'Email is required';
      return;
    }
    
    if (!password.value) {
      error.value = 'Password is required';
      return;
    }
    
    if (password.value !== confirmPassword.value) {
      error.value = 'Passwords do not match';
      return;
    }
    
    if (password.value.length < 8) {
      error.value = 'Password must be at least 8 characters long';
      return;
    }
    
    if (!acceptTerms.value) {
      error.value = 'You must accept the terms and conditions';
      return;
    }
    
    // Start loading
    isLoading.value = true;
    
    // Register user
    await authStore.register(email.value, password.value);
    
    // Redirect on success
    router.push('/login?registered=true');
  } catch (err) {
    console.error('Registration error:', err);
    error.value = err.message || 'Failed to create account. Please try again.';
  } finally {
    isLoading.value = false;
  }
}

// Comment out Google Sign In related code in script section
/*
async function handleGoogleSignIn() {
  try {
    isGoogleLoading.value = true;
    error.value = '';
    await authStore.signInWithGoogle();
    // The redirect will be handled by Supabase
  } catch (err) {
    error.value = err.message || 'Failed to sign up with Google. Please try again.';
    isGoogleLoading.value = false;
  }
}
*/
</script> 