<template>
  <aside 
    class="bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out shadow-sm"
    :class="{ 'w-64': isExpanded, 'w-20': !isExpanded }"
  >
    <!-- User Profile Section -->
    <div class="h-16 flex items-center justify-center px-4 border-b border-gray-200">
      <div 
        class="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold"
        :class="{ 'mx-auto': !isExpanded }"
      >
        {{ userInitials }}
      </div>
    </div>

    <!-- Toggle Button for Desktop -->
    <div class="px-2 py-3 border-b border-gray-100 flex justify-center">
      <button 
        @click="$emit('toggle')" 
        class="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 w-full flex items-center transition-colors"
        :class="isExpanded ? 'justify-between bg-gray-50 text-gray-700' : 'justify-center bg-gray-50 text-gray-700'"
        :title="isExpanded ? 'Collapse menu' : 'Expand menu'"
      >
        <span v-if="isExpanded" class="text-sm font-medium">Collapse Menu</span>
        <span v-else class="sr-only">Expand Menu</span>
        <svg 
          v-if="isExpanded"
          class="h-5 w-5 text-gray-500" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
        <svg 
          v-else
          class="h-5 w-5 text-gray-500" 
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
    <nav class="flex-1 py-4 overflow-y-auto">
      <ul class="space-y-1 px-2">
        <li>
          <router-link 
            to="/dashboard" 
            class="flex items-center py-2 rounded-md hover:bg-gray-100 transition-colors"
            :class="[
              $route.path === '/dashboard' ? 'bg-gray-100 text-primary-600 font-medium' : 'text-gray-700',
              isExpanded ? 'px-4 justify-start' : 'px-2 justify-center'
            ]"
            @click="$emit('close')"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5" 
              :class="{ 'mr-3': isExpanded }" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span v-if="isExpanded">Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/invoice" 
            class="flex items-center py-2 rounded-md hover:bg-gray-100 transition-colors"
            :class="[
              $route.path.includes('/invoice') ? 'bg-gray-100 text-primary-600 font-medium' : 'text-gray-700',
              isExpanded ? 'px-4 justify-start' : 'px-2 justify-center'
            ]"
            @click="$emit('close')"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5" 
              :class="{ 'mr-3': isExpanded }" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span v-if="isExpanded">Invoices</span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/profile" 
            class="flex items-center py-2 rounded-md hover:bg-gray-100 transition-colors"
            :class="[
              $route.path === '/profile' ? 'bg-gray-100 text-primary-600 font-medium' : 'text-gray-700',
              isExpanded ? 'px-4 justify-start' : 'px-2 justify-center'
            ]"
            @click="$emit('close')"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5" 
              :class="{ 'mr-3': isExpanded }" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span v-if="isExpanded">Profile</span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/settings" 
            class="flex items-center py-2 rounded-md hover:bg-gray-100 transition-colors"
            :class="[
              $route.path === '/settings' ? 'bg-gray-100 text-primary-600 font-medium' : 'text-gray-700',
              isExpanded ? 'px-4 justify-start' : 'px-2 justify-center'
            ]"
            @click="$emit('close')"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5" 
              :class="{ 'mr-3': isExpanded }" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span v-if="isExpanded">Settings</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Logout Button -->
    <div class="px-2 py-4 border-t border-gray-200">
      <button 
        @click="handleLogout" 
        class="flex items-center py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors w-full"
        :class="isExpanded ? 'px-4 justify-start' : 'px-2 justify-center'"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-5 w-5" 
          :class="{ 'mr-3': isExpanded }" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
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

defineEmits(['close', 'toggle']);

defineProps({
  isExpanded: {
    type: Boolean,
    default: true
  }
});
</script>

<style scoped>
aside {
  height: 100vh;
  overflow-y: auto;
  z-index: 20;
}

/* Hide scrollbar for Chrome, Safari and Opera */
aside::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
aside {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

@media (max-width: 767px) {
  aside {
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 30;
  }
}
</style> 