<template>
  <nav class="bg-white shadow-md relative z-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <!-- Logo Section - Only visible when not authenticated -->
          <div v-if="!isAuthenticated" class="flex items-center">
            <router-link to="/" class="flex items-center">
              <img
                class="h-8 w-auto"
                src="/images/faktur-logo.svg"
                alt="FakturWeb"
              />
              <span class="ml-2 px-2 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-600 rounded-full">BETA</span>
            </router-link>
          </div>

          <!-- Mobile menu button -->

          <!-- Remove Logo Section -->
        </div>

        <!-- Right side navigation items -->
        <div class="flex items-center">
          <template v-if="isAuthenticated">
            <!-- Profile dropdown container -->
            <div class="ml-3 relative profile-dropdown-container" @click="toggleProfileDropdown">
              <!-- Avatar Button -->
              <div class="profile-avatar">
                <button type="button" class="flex rounded-full bg-gray-100 text-sm focus:outline-none">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" src="https://ui-avatars.com/api/?name=User" alt="Profile" />
                </button>
              </div>

              <!-- Profile dropdown menu -->
              <div 
                class="profile-dropdown-menu origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200"
                :class="{ 'dropdown-visible': showProfileDropdown, 'dropdown-hidden': !showProfileDropdown }"
              >
                <router-link
                  to="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
                  @click="showProfileDropdown = false"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </router-link>
                <router-link
                  to="/settings"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
                  @click="showProfileDropdown = false"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </router-link>
                <button
                  @click="logout"
                  class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </template>
          <template v-else>
            <router-link 
              to="/beta" 
              class="group relative text-gray-900 font-bold text-sm flex items-center px-3 py-1.5 bg-yellow-100 hover:bg-yellow-200 rounded-md transition-colors duration-200"
            >
              <span class="relative z-10">Daftar Beta</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transition-transform animate-slide-arrow relative z-10" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const isAuthenticated = computed(() => authStore.isAuthenticated);
const showProfileDropdown = ref(false);
const isMobile = ref(window.innerWidth < 768);

defineProps({
  isSidebarOpen: {
    type: Boolean,
    default: false
  }
});

defineEmits(['toggle-sidebar']);

function toggleProfileDropdown() {
  // Only toggle on mobile, always show on desktop when clicked
  if (isMobile.value) {
    showProfileDropdown.value = !showProfileDropdown.value;
  } else {
    showProfileDropdown.value = true;
  }
}

// Handle clicks outside to close the dropdown
function handleClickOutside(event) {
  const container = document.querySelector('.profile-dropdown-container');
  if (container && !container.contains(event.target) && showProfileDropdown.value) {
    showProfileDropdown.value = false;
  }
}

// Handle window resize to detect mobile/desktop
function handleResize() {
  isMobile.value = window.innerWidth < 768;
}

async function logout() {
  try {
    await authStore.logout();
    showProfileDropdown.value = false;
    router.push('/login');
  } catch (error) {
    console.error('Logout error:', error);
  }
}

// Add and remove global event handlers
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('resize', handleResize);
  handleResize(); // Initial check
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.profile-dropdown-container {
  position: relative;
  padding-bottom: 20px; /* Create padding space to prevent dropdown from closing */
  cursor: pointer;
}

.profile-dropdown-menu {
  top: 100%;
  z-index: 100;
  min-width: 200px;
  /* Add invisible padding above to prevent flickering */
  margin-top: -16px;
  padding-top: 20px;
}

.dropdown-visible {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
  visibility: visible;
}

.dropdown-hidden {
  opacity: 0;
  transform: scale(0.95);
  pointer-events: none;
  visibility: hidden;
}

@keyframes slide-arrow {
  0%, 100% {
    transform: translateX(0);
    opacity: 1;
  }
  50% {
    transform: translateX(4px);
    opacity: 0.7;
  }
}

.animate-slide-arrow {
  animation: slide-arrow 2s ease-in-out infinite;
}

/* Stop animation on hover */
.group:hover .animate-slide-arrow {
  animation: none;
  transform: translateX(4px);
}

/* Desktop hover behavior */
@media (min-width: 768px) {
  .profile-dropdown-container:hover .profile-dropdown-menu {
    opacity: 1;
    transform: scale(1);
    pointer-events: auto;
    visibility: visible;
  }
}

/* Mobile specific styles */
@media (max-width: 767px) {
  .profile-dropdown-menu {
    width: 100%;
    min-width: 240px;
    right: -75px;
  }
}
</style> 