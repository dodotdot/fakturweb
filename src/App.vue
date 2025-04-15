<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from './stores/auth';
import Navbar from './components/layout/Navbar.vue';
import Sidebar from './components/layout/Sidebar.vue';
import './assets/landing.css'; // Import landing page styles

const route = useRoute();
const authStore = useAuthStore();
const isSidebarOpen = ref(true);

const isAuthenticated = computed(() => authStore.isAuthenticated);

// Show navbar only for authenticated pages
const showNavbar = computed(() => {
  return isAuthenticated.value;
});

// Show sidebar only when user is authenticated
const showSidebar = computed(() => {
  return isAuthenticated.value;
});

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

// Close sidebar when route changes on mobile
watch(() => route.path, () => {
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <div class="flex h-screen" :class="{ 'pt-16': showNavbar }">
      <Sidebar 
        v-if="showSidebar" 
        :is-expanded="isSidebarOpen" 
        @toggle="toggleSidebar"
        class="sidebar"
        :class="{ 'collapsed': !isSidebarOpen }"
      />
      <main 
        :class="{ 'ml-64': showSidebar && isSidebarOpen, 'ml-0': !isSidebarOpen }" 
        class="flex-1 overflow-auto transition-all duration-300"
      >
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <div>
              <component :is="Component" />
            </div>
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<style>
/* Global styles */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #333;
  line-height: 1.6;
  background-color: white;
  margin: 0;
  padding: 0;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .container {
    padding: 0 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 2rem;
  }
}

/* App layout */
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Sidebar styles */
.sidebar {
  width: 250px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: fixed;
  top: 64px; /* Height of navbar */
  left: 0;
  bottom: 0;
  z-index: 10;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.sidebar.collapsed {
  width: 64px;
}

/* Main content area */
main {
  flex: 1;
  padding: 1rem;
  transition: margin-left 0.3s ease;
  min-height: calc(100vh - 64px);
  width: 100%;
}

/* When sidebar is closed on mobile */
@media (max-width: 767px) {
  .sidebar:not(.open) {
    width: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media print {
  .no-print {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    position: absolute !important;
    pointer-events: none !important;
  }
  
  @media print {
    button.no-print {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      position: absolute !important;
      pointer-events: none !important;
    }
  }
}
</style>
