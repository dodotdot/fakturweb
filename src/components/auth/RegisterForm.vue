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
          <Label for="password">Password</Label>
          <Input 
            id="password" 
            v-model="password" 
            type="password" 
            placeholder="••••••••" 
            required 
          />
          <p class="text-xs text-gray-500">
            Password must be at least 8 characters long
          </p>
        </div>
        <div class="space-y-2">
          <Label for="confirmPassword">Confirm Password</Label>
          <Input 
            id="confirmPassword" 
            v-model="confirmPassword" 
            type="password" 
            placeholder="••••••••" 
            required 
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
        
        <Button :loading="isLoading" type="submit" class="w-full">
          Create Account
        </Button>
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
import Button from '../ui/Button.vue';
import Input from '../ui/Input.vue';
import Label from '../ui/Label.vue';

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
    isLoading.value = true;
    error.value = '';
    
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
    
    await authStore.register(email.value, password.value);
    router.push('/login?registered=true');
  } catch (err) {
    error.value = err.message || 'Failed to create account. Please try again.';
  } finally {
    isLoading.value = false;
  }
}
</script> 