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
            <a href="#" class="text-primary hover:underline">Terms of Service</a>
            and
            <a href="#" class="text-primary hover:underline">Privacy Policy</a>
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
</script> 