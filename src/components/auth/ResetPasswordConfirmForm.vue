<template>
  <div class="w-full max-w-md mx-auto">
    <div class="space-y-6">
      <div class="space-y-2 text-center">
        <h1 class="text-3xl font-bold">Create New Password</h1>
        <p class="text-gray-500 dark:text-gray-400">
          Enter your new password below
        </p>
      </div>
      
      <div v-if="success" class="p-3 rounded-md bg-green-50 text-green-600 text-sm">
        Your password has been updated successfully. You can now login with your new password.
      </div>
      
      <div v-if="error" class="p-3 rounded-md bg-red-50 text-red-500 text-sm">
        {{ error }}
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <Label for="password">New Password</Label>
          <Input 
            id="password" 
            v-model="password" 
            type="password" 
            placeholder="••••••••" 
            required 
          />
          <p class="text-xs text-gray-500">Password must be at least 8 characters long</p>
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
        
        <Button :loading="isLoading" type="submit" class="w-full">
          Update Password
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
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import Button from '../ui/Button.vue';
import Input from '../ui/Input.vue';
import Label from '../ui/Label.vue';

const router = useRouter();
const authStore = useAuthStore();

const password = ref('');
const confirmPassword = ref('');
const error = ref('');
const success = ref(false);
const isLoading = ref(false);

async function handleSubmit() {
  try {
    isLoading.value = true;
    error.value = '';
    success.value = false;
    
    // Validate password
    if (password.value.length < 8) {
      error.value = 'Password must be at least 8 characters long';
      return;
    }
    
    // Check if passwords match
    if (password.value !== confirmPassword.value) {
      error.value = 'Passwords do not match';
      return;
    }
    
    await authStore.updatePassword(password.value);
    success.value = true;
    
    // Clear the form
    password.value = '';
    confirmPassword.value = '';
    
    // Redirect to login after 3 seconds
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  } catch (err) {
    error.value = err.message || 'Failed to update password. Please try again.';
  } finally {
    isLoading.value = false;
  }
}
</script> 