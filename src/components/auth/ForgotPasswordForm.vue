<template>
  <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white text-center">Reset Password</h2>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center">
        Enter your email address and we'll send you a link to reset your password.
      </p>
    </div>
    
    <div v-if="emailSent" class="bg-green-50 dark:bg-green-900 p-4 rounded-md">
      <p class="text-green-800 dark:text-green-200">
        Password reset link has been sent to your email. Please check your inbox and follow the instructions.
      </p>
    </div>
    
    <form v-else @submit.prevent="handleSubmit" class="space-y-4">
      <div v-if="error" class="bg-red-50 dark:bg-red-900 p-4 rounded-md">
        <p class="text-red-800 dark:text-red-200">{{ error }}</p>
      </div>
      
      <div>
        <Label for="email">Email address</Label>
        <Input
          id="email"
          type="email"
          v-model="email"
          required
          placeholder="your@email.com"
          class="w-full mt-1"
        />
      </div>
      
      <div>
        <Button
          type="submit"
          :loading="isLoading"
          class="w-full"
        >
          Send Reset Link
        </Button>
      </div>
      
      <div class="text-center text-sm">
        <router-link to="/login" class="font-medium text-primary hover:underline">
          Back to login
        </router-link>
      </div>
    </form>
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
const isLoading = ref(false);
const emailSent = ref(false);

async function handleSubmit() {
  try {
    isLoading.value = true;
    error.value = '';
    
    // Validate form
    if (!email.value) {
      error.value = 'Email is required';
      return;
    }
    
    await authStore.resetPassword(email.value);
    emailSent.value = true;
  } catch (err) {
    error.value = err.message || 'Failed to send reset password link. Please try again.';
  } finally {
    isLoading.value = false;
  }
}
</script> 