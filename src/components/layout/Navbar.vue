<template>
  <nav class="bg-white shadow dark:bg-gray-800">
    <div class="container mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-xl font-bold text-primary">
              FakturWeb
            </router-link>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link 
              to="/" 
              class="inline-flex items-center px-1 pt-1 border-b-2"
              :class="[
                isActive('/') 
                  ? 'border-primary text-gray-900 dark:text-white' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
              ]"
            >
              Home
            </router-link>
            
            <router-link 
              v-if="isAuthenticated"
              to="/dashboard" 
              class="inline-flex items-center px-1 pt-1 border-b-2"
              :class="[
                isActive('/dashboard') 
                  ? 'border-primary text-gray-900 dark:text-white' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
              ]"
            >
              Dashboard
            </router-link>
            
            <router-link 
              v-if="isAuthenticated"
              to="/invoices" 
              class="inline-flex items-center px-1 pt-1 border-b-2"
              :class="[
                isActive('/invoices') 
                  ? 'border-primary text-gray-900 dark:text-white' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
              ]"
            >
              Invoices
            </router-link>
          </div>
        </div>
        
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <div v-if="isAuthenticated" class="ml-3 relative flex items-center space-x-4">
            <button
              @click="handleLogout"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
            >
              Logout
            </button>
          </div>
          
          <div v-else class="ml-3 relative flex items-center space-x-4">
            <router-link
              to="/login"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
            >
              Sign in
            </router-link>
            <router-link
              to="/register"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90"
            >
              Sign up
            </router-link>
          </div>
        </div>
        
        <div class="-mr-2 flex items-center sm:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              class="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                :class="{ 'hidden': mobileMenuOpen, 'inline-flex': !mobileMenuOpen }"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                :class="{ 'hidden': !mobileMenuOpen, 'inline-flex': mobileMenuOpen }"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div :class="{ 'block': mobileMenuOpen, 'hidden': !mobileMenuOpen }" class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <router-link
          to="/"
          class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          :class="[
            isActive('/') 
              ? 'border-primary text-primary bg-primary/5 dark:bg-primary/10' 
              : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
          ]"
          @click="mobileMenuOpen = false"
        >
          Home
        </router-link>
        
        <router-link
          v-if="isAuthenticated"
          to="/dashboard"
          class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          :class="[
            isActive('/dashboard') 
              ? 'border-primary text-primary bg-primary/5 dark:bg-primary/10' 
              : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
          ]"
          @click="mobileMenuOpen = false"
        >
          Dashboard
        </router-link>
        
        <router-link
          v-if="isAuthenticated"
          to="/invoices"
          class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          :class="[
            isActive('/invoices') 
              ? 'border-primary text-primary bg-primary/5 dark:bg-primary/10' 
              : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
          ]"
          @click="mobileMenuOpen = false"
        >
          Invoices
        </router-link>
      </div>
      
      <div class="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
        <div v-if="isAuthenticated" class="flex items-center px-4">
          <div class="flex-shrink-0">
            <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
              {{ userInitials }}
            </div>
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800 dark:text-white">{{ userName }}</div>
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ userEmail }}</div>
          </div>
        </div>
        <div class="mt-3 space-y-1">
          <div v-if="isAuthenticated">
            <button
              @click="handleLogout"
              class="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Sign out
            </button>
          </div>
          <div v-else class="space-y-1">
            <router-link
              to="/login"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
              @click="mobileMenuOpen = false"
            >
              Sign in
            </router-link>
            <router-link
              to="/register"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
              @click="mobileMenuOpen = false"
            >
              Sign up
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const mobileMenuOpen = ref(false);
const isAuthenticated = computed(() => authStore.isAuthenticated);
const userEmail = computed(() => authStore.user?.email || '');
const userName = computed(() => {
  const email = userEmail.value;
  return email ? email.split('@')[0] : 'User';
});
const userInitials = computed(() => {
  const name = userName.value;
  return name ? name.substring(0, 2).toUpperCase() : 'U';
});

function isActive(path) {
  if (path === '/') {
    return route.path === path;
  }
  return route.path.startsWith(path);
}

async function handleLogout() {
  try {
    await authStore.logout();
    router.push('/');
  } catch (error) {
    console.error('Logout error:', error);
  }
}
</script> 