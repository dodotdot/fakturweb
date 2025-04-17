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
        class="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 w-full flex items-center transition-colors"
        :class="isExpanded ? 'justify-between text-gray-700' : 'justify-center text-gray-700'"
        :title="isExpanded ? 'Collapse menu' : 'Expand menu'"
      >
        <span v-if="isExpanded" class="text-sm font-medium">Menu</span>
        <span v-else class="sr-only">Expand Menu</span>
        <span class="text-xl" v-if="isExpanded"> <svg class="h-5 w-5 text-gray-500" width="64px" height="64px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M31.8839 8.36612C32.372 8.85427 32.372 9.64573 31.8839 10.1339L18.0178 24L31.8839 37.8661C32.372 38.3543 32.372 39.1457 31.8839 39.6339C31.3957 40.122 30.6043 40.122 30.1161 39.6339L15.3661 24.8839C14.878 24.3957 14.878 23.6043 15.3661 23.1161L30.1161 8.36612C30.6043 7.87796 31.3957 7.87796 31.8839 8.36612Z" fill="#212121"></path> </g></svg> </span>
        <span class="text-xl" v-else><svg class="h-5 w-5 text-gray-500" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 6L15 12L9 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></span>
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
            <span class="text-xl" :class="{ 'mr-3': isExpanded }">🏠</span>
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
            <span class="text-xl" :class="{ 'mr-3': isExpanded }">📄</span>
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
            <span class="text-xl" :class="{ 'mr-3': isExpanded }">👤</span>
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
            <span class="text-xl" :class="{ 'mr-3': isExpanded }">⚙️</span>
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
        <span class="text-xl" :class="{ 'mr-3': isExpanded }">🚪</span>
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