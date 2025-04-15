<script setup>
import { ref, watch, computed } from 'vue';
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

// Close sidebar when route changes on mobile devices
watch(() => route.path, () => {
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false;
  }
});

// Toggle sidebar
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

// Close sidebar
function closeSidebar() {
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false;
  }
}

// Compute whether we can show the navbar based on the route
const canShowNavbar = computed(() => {
  return !route.meta.hideNavbar
})

// Add class to disable prints for the sidebar
const printStyles = document.createElement('style')
printStyles.textContent = `
  @media print {
    .app-container { display: block !important; }
    nav, aside, footer, .no-print { display: none !important; }
    main { margin-left: 0 !important; width: 100% !important; }
    body { background: white !important; }
  }
`
document.head.appendChild(printStyles)
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

  <div class="print:hidden flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar 
      v-if="authStore.isAuthenticated && !route.meta.noSidebar" 
      :is-expanded="isSidebarOpen" 
      @toggle="toggleSidebar"
      class="print:hidden" 
    />

    <!-- Main Content -->
    <div class="flex flex-1 relative print:block" 
      :class="{
        'md:ml-20': authStore.isAuthenticated && !isSidebarOpen && !route.meta.noSidebar,
        'md:ml-64': authStore.isAuthenticated && isSidebarOpen && !route.meta.noSidebar,
      }">
      <!-- Navbar -->
      <Navbar v-if="!route.meta.hideNavbar" 
        @toggle-sidebar="toggleSidebar"
        :is-sidebar-open="isSidebarOpen"
      />
      <!-- Page content -->
      <main class="flex-1 transition-all duration-300 p-4 md:p-6 overflow-x-hidden">
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
  @page {
    size: A4;
    margin: 0;
  }
  
  body {
    margin: 0;
    padding: 0;
  }
  
  .no-print {
    display: none !important;
    visibility: hidden !important;
    height: 0 !important;
    position: absolute !important;
    overflow: hidden !important;
  }
}
</style>
