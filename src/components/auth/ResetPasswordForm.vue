<template>
  <div class="w-full max-w-md mx-auto">
    <div class="space-y-6">
      <div class="space-y-2 text-center">
        <h1 class="text-3xl font-bold">Reset Password</h1>
        <p class="text-gray-500 dark:text-gray-400">
          Enter your email address and we'll send you a password reset link
        </p>
      </div>
      
      <div v-if="success" class="p-3 rounded-md bg-green-50 text-green-600 text-sm">
        Password reset link has been sent to your email address. Please check your inbox.
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
        <Button :loading="isLoading" type="submit" class="w-full">
          Send Reset Link
        </Button>
      </form>
      
      <div class="text-center text-sm">
        <router-link to="/login" class="font-medium text-primary hover:underline">
          Back to login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import Button from '../ui/Button.vue';
import Input from '../ui/Input.vue';
import Label from '../ui/Label.vue';

const authStore = useAuthStore();

const email = ref('');
const error = ref('');
const success = ref(false);
const isLoading = ref(false);

async function handleSubmit() {
  try {
    isLoading.value = true;
    error.value = '';
    success.value = false;
    
    await authStore.requestPasswordReset(email.value);
    success.value = true;
    email.value = '';
  } catch (err) {
    error.value = err.message || 'Failed to send reset link. Please try again.';
  } finally {
    isLoading.value = false;
  }
}
</script> 