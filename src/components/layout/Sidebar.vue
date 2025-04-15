<template>
  <aside class="bg-white border-r border-gray-200 h-full flex flex-col">
    <!-- User Profile Section with Toggle Button -->
    <div class="p-4 border-b border-gray-200 flex justify-between items-center">
      <div class="flex items-center">
        <div v-if="isExpanded" class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
          {{ userInitials }}
        </div>
      </div>
      
      <!-- Sidebar Toggle Button -->
      <button 
        @click="$emit('toggle')" 
        class="p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
      >
        <span class="sr-only">{{ isExpanded ? 'Collapse sidebar' : 'Expand sidebar' }}</span>
        <svg 
          v-if="isExpanded"
          class="h-5 w-5" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
        <svg 
          v-else
          class="h-5 w-5" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Navigation Links -->
    <nav class="flex-1 py-4">
      <ul class="space-y-1">
        <li>
          <router-link 
            to="/dashboard" 
            class="flex items-center px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
            :class="{ 'bg-gray-100 font-medium': $route.path === '/dashboard' }"
            @click="$emit('close')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span v-if="isExpanded">Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/invoices" 
            class="flex items-center px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
            :class="{ 'bg-gray-100 font-medium': $route.path === '/invoices' }"
            @click="$emit('close')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span v-if="isExpanded">Invoices</span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/settings" 
            class="flex items-center px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
            :class="{ 'bg-gray-100 font-medium': $route.path === '/settings' }"
            @click="$emit('close')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span v-if="isExpanded">Settings</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Logout Button -->
    <div class="p-4 border-t border-gray-200">
      <button 
        @click="handleLogout" 
        class="w-full flex items-center justify-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span v-if="isExpanded">Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);

const userInitials = computed(() => {
  if (!user.value?.email) return '?';
  return user.value.email.charAt(0).toUpperCase();
});

async function handleLogout() {
  try {
    await authStore.logout();
    router.push('/login');
  } catch (error) {
    console.error('Logout error:', error);
  }
}

const emit = defineEmits(['close', 'toggle']);

defineProps({
  isExpanded: {
    type: Boolean,
    default: true
  }
});
</script>

<style scoped>
aside {
  height: calc(100vh - 64px);
  overflow-y: auto;
  width: 250px;
  transition: all 0.3s ease;
}

aside.collapsed {
  width: 64px;
}

aside.collapsed .mr-3 {
  margin-right: 0;
}

aside.collapsed .px-4 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

@media (max-width: 767px) {
  aside {
    position: fixed;
    top: 64px;
    left: 0;
    bottom: 0;
    z-index: 10;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  aside.open {
    transform: translateX(0);
  }
}
</style> 