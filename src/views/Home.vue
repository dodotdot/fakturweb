<template>
  <div>
    <header class="bg-gradient-to-r from-primary to-primary/80 text-white">
      <div class="container mx-auto py-12 px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          Create Professional Invoices in Seconds
        </h1>
        <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          FakturWeb is a simple and powerful invoice generator that helps you create, manage, and send beautiful invoices to your clients.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <router-link 
            v-if="isAuthenticated" 
            to="/invoices/new" 
            class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-secondary/90 md:text-lg"
          >
            Create Invoice
          </router-link>
          <router-link 
            v-if="isAuthenticated" 
            to="/dashboard" 
            class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-100 md:text-lg"
          >
            Dashboard
          </router-link>
          <router-link 
            v-if="!isAuthenticated" 
            to="/login" 
            class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-secondary/90 md:text-lg"
          >
            Sign In
          </router-link>
          <router-link 
            v-if="!isAuthenticated" 
            to="/register" 
            class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-100 md:text-lg"
          >
            Create Free Account
          </router-link>
          <router-link 
            v-if="!isAuthenticated" 
            to="/invoices/new" 
            class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-secondary/90 md:text-lg"
          >
            Try It Now
          </router-link>
        </div>
      </div>
    </header>

    <main>
      <!-- Features Section -->
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-12">
            Everything You Need to Create Professional Invoices
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <div class="h-12 w-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">Beautiful Templates</h3>
              <p class="text-gray-600">
                Choose from a variety of professionally designed invoice templates that match your brand.
              </p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <div class="h-12 w-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">Save Time</h3>
              <p class="text-gray-600">
                Create and send invoices in seconds, not hours. Save client information for future use.
              </p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <div class="h-12 w-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">Cloud Storage</h3>
              <p class="text-gray-600">
                All your invoices are safely stored in the cloud, accessible from anywhere, anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p class="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of freelancers and businesses who use FakturWeb to create professional invoices.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <router-link 
              to="/register" 
              class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-primary hover:bg-primary/90"
            >
              Create Your Free Account
            </router-link>
            <router-link 
              to="/invoices/new" 
              class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-lg font-medium rounded-md text-primary bg-white border-primary hover:bg-gray-50"
            >
              Try Without Account
            </router-link>
          </div>
        </div>
      </section>
    </main>

    <footer class="bg-gray-800 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <div class="text-2xl font-bold mb-4">FakturWeb</div>
          <p class="mb-6">The simple and powerful invoice generator</p>
          <div class="flex justify-center space-x-6">
            <a href="#" class="text-gray-400 hover:text-white">Terms of Service</a>
            <a href="#" class="text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="#" class="text-gray-400 hover:text-white">Contact</a>
          </div>
          <p class="mt-8 text-gray-400">
            &copy; {{ new Date().getFullYear() }} FakturWeb. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
</script> 