<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from './stores/auth';
import SeoHead from './components/SeoHead.vue';
import Navbar from './components/layout/Navbar.vue';
import Sidebar from './components/layout/Sidebar.vue';
import './assets/landing.css'; // Import landing page styles

const route = useRoute();
const authStore = useAuthStore();
const isSidebarOpen = ref(false);

// Computed SEO properties
const pageTitle = computed(() => route.meta.title || 'Faktur.web.id - Solusi Faktur Online');
const pageDescription = computed(() => route.meta.description || 'Platform faktur online terbaik untuk UMKM Indonesia');
const pageKeywords = computed(() => route.meta.keywords || 'faktur online, invoice generator, buat faktur, faktur gratis');
const pageImage = computed(() => route.meta.image || '/images/og-image.png');
const pageType = computed(() => route.meta.type || 'website');

// Determine if the current route requires authentication
const isAuthPage = computed(() => route.meta.requiresAuth);

// Initialize sidebar state from localStorage on component mount
onMounted(() => {
  const savedState = localStorage.getItem('sidebarOpen');
  if (savedState !== null) {
    isSidebarOpen.value = savedState === 'true';
  } else {
    // Default to open on desktop, closed on mobile
    isSidebarOpen.value = window.innerWidth >= 768;
  }
});

// Close sidebar when route changes on mobile devices
watch(() => route.path, () => {
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false;
  }
});

// Toggle sidebar
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  // Save preference to localStorage
  localStorage.setItem('sidebarOpen', isSidebarOpen.value);
}

// Close sidebar
function closeSidebar() {
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false;
  }
}

// Compute whether we can show the navbar based on the route
const canShowNavbar = computed(() => {
  return !route.meta.hideNavbar;
});

// Compute whether we should show the sidebar
const showSidebar = computed(() => {
  return authStore.isAuthenticated && !route.meta.noSidebar;
});

// Add class to disable prints for the sidebar
const printStyles = document.createElement('style');
printStyles.textContent = `
  @media print {
    .app-container { display: block !important; }
    nav, aside, footer, .no-print { display: none !important; }
    main { margin-left: 0 !important; width: 100% !important; padding: 0 !important; }
    body { background: white !important; }
  }
`;
document.head.appendChild(printStyles);
</script>

<template>
  <!-- SEO meta tags -->
  <SeoHead
    :title="pageTitle"
    :description="pageDescription"
    :keywords="pageKeywords"
    :image="pageImage"
    :type="pageType"
  />

  <!-- App Layout Container -->
  <div class="app-container min-h-screen bg-gray-50 print:bg-white">
    <!-- Authenticated Layout with Sidebar -->
    <div v-if="showSidebar" class="flex h-screen print:hidden">
      <!-- Sidebar -->
      <Sidebar 
        :is-expanded="isSidebarOpen" 
        @toggle="toggleSidebar"
        class="fixed inset-y-0 left-0 print:hidden z-20"
        :class="{
          'w-64': isSidebarOpen,
          'w-20': !isSidebarOpen,
          'transform -translate-x-full md:translate-x-0': !isSidebarOpen,
          'transform translate-x-0': isSidebarOpen
        }"
      />
      
      <!-- Mobile overlay -->
      <div 
        v-if="isSidebarOpen" 
        class="md:hidden fixed inset-0 bg-gray-600 bg-opacity-50 z-10 transition-opacity duration-300"
        @click="closeSidebar"
      ></div>

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col transition-all duration-300 ease-in-out"
        :class="{
          'md:ml-64': isSidebarOpen,
          'md:ml-20': !isSidebarOpen,
        }">
        <!-- Navbar -->
        <Navbar 
          v-if="canShowNavbar" 
          class="sticky top-0 z-10 print:hidden"
          @toggle-sidebar="toggleSidebar"
          :is-sidebar-open="isSidebarOpen"
        />
        
        <!-- Main Content -->
        <main class="flex-1 p-4 md:p-6 mt-16 overflow-auto">
          <router-view></router-view>
        </main>
      </div>
    </div>

    <!-- Non-Authenticated Layout or NoSidebar Layout -->
    <div v-else class="flex flex-col min-h-screen">
      <!-- Navbar (if not hidden) -->
      <Navbar v-if="canShowNavbar" class="sticky top-0 z-10 print:hidden" />
      
      <!-- Content -->
      <main class="flex-1">
        <router-view></router-view>
      </main>
    </div>
  </div>

  <!-- Print-only view -->
  <div class="hidden print:block">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<style>
/* Global styles */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #333;
  line-height: 1.6;
  background-color: #f9fafb; /* gray-50 */
  margin: 0;
  padding: 0;
  overflow-x: hidden;
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
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Sidebar styles */
aside {
  height: 100%;
  transition: all 0.3s ease-in-out;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

/* Main content area */
main {
  flex: 1;
  transition: margin-left 0.3s ease-in-out;
  width: 100%;
}

/* Adding a mobile overlay when sidebar is open */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 15;
  transition: opacity 0.3s ease;
}

/* Animation for transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media print {
  @page {
    size: A4;
    margin: 0;
  }
  
  body {
    margin: 0;
    padding: 0;
  }
  
  .print\:hidden,
  .no-print {
    display: none !important;
    visibility: hidden !important;
    height: 0 !important;
    position: absolute !important;
    overflow: hidden !important;
  }
}
</style>
