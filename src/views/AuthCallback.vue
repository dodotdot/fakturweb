<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="text-center">
      <div class="mb-4">
        <svg class="animate-spin h-10 w-10 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <h2 class="text-xl font-semibold mb-2">Completing sign in...</h2>
      <p class="text-gray-500">Please wait while we redirect you.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  try {
    // Get the session from the URL hash
    const { data: { session }, error } = await authStore.supabase.auth.getSession();
    
    if (error) throw error;
    
    if (session) {
      // Update the user in the auth store
      authStore.user = session.user;
      
      // Redirect to dashboard
      router.push('/dashboard');
    } else {
      // If no session, redirect to login
      router.push('/login');
    }
  } catch (error) {
    console.error('Auth callback error:', error);
    router.push('/login');
  }
});
</script> 