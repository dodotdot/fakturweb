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
  <div class="app min-h-screen">
    <Navbar v-if="showNavbar" />
    <router-view />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background-color: white;
  color: #333;
}

.header {
  background-color: #4a6cf7;
  color: white;
  padding: 2rem 0;
  text-align: center;
  margin-bottom: 2.5rem;
}

.header h1 {
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.footer {
  margin-top: 4rem;
  padding: 1.25rem 0;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
  text-align: center;
}
</style>
