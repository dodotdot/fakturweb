<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/layout/Navbar.vue';

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
    <footer v-if="showNavbar" class="bg-gray-800 text-white py-6">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <div class="text-xl font-bold mb-2">FakturWeb</div>
          <p class="mb-4">The simple and powerful invoice generator</p>
          <div class="flex justify-center space-x-6">
            <a href="#" class="text-gray-400 hover:text-white">Terms of Service</a>
            <a href="#" class="text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="#" class="text-gray-400 hover:text-white">Contact</a>
          </div>
          <p class="mt-4 text-gray-400">
            &copy; {{ new Date().getFullYear() }} FakturWeb. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Global styles */
body {
  font-family: 'Roboto', sans-serif;
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
