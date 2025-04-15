<template>
  <nav class="bg-white shadow-sm fixed w-full z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center">
            <img class="h-8 w-auto" src="/images/faktur-logo.svg" alt="faktur.web.id">
          </RouterLink>
        </div>
        <div class="flex items-center">
          <!-- Show login/signup links for unauthenticated users -->
          <template v-if="!isAuthenticated">
            <RouterLink 
              to="/login" 
              class="text-sm font-medium text-gray-700 hover:text-primary px-3 py-2 rounded-md"
            >
              Login
            </RouterLink>
            <RouterLink 
              to="/register" 
              class="text-sm font-medium text-white bg-primary hover:bg-primary-dark px-4 py-2 rounded-md ml-2"
            >
              Sign Up
            </RouterLink>
          </template>
          
          <!-- Show user email and logout for authenticated users -->
          <template v-else>
            <RouterLink to="/profile" class="text-sm text-gray-500 mr-4">
              <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                {{ user?.email?.substring(0, 2).toUpperCase() }}
              </div>
            </RouterLink>
            <button 
              @click="handleLogout" 
              class="text-sm text-gray-500 hover:text-gray-700"
            >
              Logout
            </button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const isAuthenticated = computed(() => authStore.isAuthenticated);

async function handleLogout() {
  try {
    await authStore.logout();
    router.push('/login');
  } catch (error) {
    console.error('Logout error:', error);
  }
}
</script>

<style scoped>
nav {
  height: 64px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
</style> 