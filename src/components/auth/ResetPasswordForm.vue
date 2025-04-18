<template>
  <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white text-center">Set New Password</h2>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center">
        Create a new secure password for your account
      </p>
    </div>
    
    <div v-if="success" class="bg-green-50 dark:bg-green-900 p-4 rounded-md">
      <p class="text-green-800 dark:text-green-200">
        Your password has been updated successfully!
      </p>
      <div class="mt-4 text-center">
        <router-link to="/login" class="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
          Go to Login
        </router-link>
      </div>
    </div>
    
    <form v-else @submit.prevent="handleSubmit" class="space-y-4">
      <div v-if="error" class="bg-red-50 dark:bg-red-900 p-4 rounded-md">
        <p class="text-red-800 dark:text-red-200">{{ error }}</p>
      </div>
      
      <div>
        <Label for="password">New Password</Label>
        <Input
          id="password"
          type="password"
          v-model="password"
          required
          placeholder="••••••••"
          class="w-full mt-1"
        />
        <p class="text-xs text-gray-500 mt-1">
          Password must be at least 8 characters long
        </p>
      </div>
      
      <div>
        <Label for="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          v-model="confirmPassword"
          required
          placeholder="••••••••"
          class="w-full mt-1"
        />
      </div>
      
      <div>
        <Button
          type="submit"
          :loading="isLoading"
          class="w-full"
        >
          Update Password
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
import { ref, onMounted } from 'vue';
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
const isLoading = ref(false);
const success = ref(false);

onMounted(async () => {
  // When this component loads, user should already have a valid recovery session
  // This happens automatically when they click the link from their email
  try {
    // Check if the user has a valid session
    const { data } = await authStore.supabase.auth.getSession();
    if (!data.session) {
      error.value = 'Invalid or expired reset link. Please request a new password reset.';
    }
  } catch (err) {
    error.value = 'Could not verify reset token. Please try again.';
    console.error('Error checking reset session:', err);
  }
});

async function handleSubmit() {
  try {
    isLoading.value = true;
    error.value = '';
    
    // Validate form
    if (!password.value) {
      error.value = 'Password is required';
      return;
    }
    
    if (password.value.length < 8) {
      error.value = 'Password must be at least 8 characters long';
      return;
    }
    
    if (password.value !== confirmPassword.value) {
      error.value = 'Passwords do not match';
      return;
    }
    
    await authStore.updatePassword(password.value);
    success.value = true;
  } catch (err) {
    error.value = err.message || 'Failed to update password. Please try again.';
  } finally {
    isLoading.value = false;
  }
}
</script> 