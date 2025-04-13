<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/layout/Navbar.vue';
import './assets/landing.css'; // Import landing page styles

const route = useRoute();

// Hide navbar on login and register pages
const showNavbar = computed(() => {
  return !['Login', 'Register'].includes(route.name);
});
</script>

<template>
  <div class="app bg-white min-h-screen flex flex-col">
    <Navbar v-if="showNavbar" />
    <main class="flex-grow">
      <router-view />
    </main>
    <footer v-if="showNavbar" class="text-black py-6">
      <div class="container mx-auto px-4 text-xs">
        <div class="text-center">
          <div class="flex justify-center mb-4">
            <img src="/images/faktur-logo.png" alt="FAKTUR.web.id" class="h-8 w-auto brightness-0 invert">
          </div>
          <div class="flex justify-center space-x-6">
            <a href="#" class="text-black/80 hover:text-black transition-colors">Terms of Service</a>
            <a href="#" class="text-black/80 hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" class="text-black/80 hover:text-black transition-colors">Contact</a>
          </div>
          <p class="mt-4 text-black/60">
            &copy; {{ new Date().getFullYear() }} faktur.web.id. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Global styles */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #333;
  line-height: 1.6;
  background-color: white;
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
</style>
