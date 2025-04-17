<template>
  <nav class="bg-white shadow-sm border-b border-gray-200 h-16 w-full">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
      <div class="flex justify-between items-center h-full">
        <div class="flex items-center">
          <!-- Toggle sidebar button (only for mobile devices) -->
          <button 
            v-if="isAuthenticated" 
            @click="$emit('toggle-sidebar')" 
            class="p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 mr-3 -ml-1.5 md:hidden"
          >
            <span class="sr-only">Toggle sidebar</span>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <!-- Logo -->
          <RouterLink to="/" class="flex items-center">
            <img class="h-8 w-auto" src="/images/faktur-logo.svg" alt="faktur.web.id">
          </RouterLink>
        </div>
        <div class="flex items-center">
          <!-- Show login/signup links for unauthenticated users -->
          <template v-if="!isAuthenticated">
            <RouterLink 
              to="/login" 
              class="text-sm font-medium text-gray-700 hover:text-primary-500 px-3 py-2 rounded-md transition-colors"
            >
              Login
            </RouterLink>
            <RouterLink 
              to="/register" 
              class="text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded-md ml-2 transition-colors"
            >
              Sign Up
            </RouterLink>
          </template>
          
          <!-- Show user profile for authenticated users -->
          <template v-else>
            <!-- Create invoice button -->
            <RouterLink 
              to="/invoice/new" 
              class="mr-4 hidden md:flex items-center text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 px-3 py-2 rounded-md transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              New Invoice
            </RouterLink>
            
            <!-- User profile dropdown (simplified for now) -->
            <RouterLink to="/profile" class="text-sm text-gray-500 mr-2">
              <div class="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 font-semibold border border-primary-100">
                {{ user?.email?.substring(0, 2).toUpperCase() }}
              </div>
            </RouterLink>
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

defineProps({
  isSidebarOpen: {
    type: Boolean,
    default: false
  }
});

defineEmits(['toggle-sidebar']);
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
}
</style> 