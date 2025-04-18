<template>
  <div class="container mx-auto py-6 px-4">
    <!-- Breadcrumbs -->
    <nav class="flex mb-5" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <router-link to="/dashboard" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            Dashboard
          </router-link>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
            <router-link to="/clients" class="ml-1 text-sm font-medium text-gray-700 hover:text-primary md:ml-2">
              Clients
            </router-link>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">{{ isEditMode ? 'Edit Client' : 'Add New Client' }}</span>
          </div>
        </li>
      </ol>
    </nav>

    <div class="w-full">
      <div class="flex items-center mb-6">
        <button 
          @click="goBack" 
          class="mr-3 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 class="text-2xl font-bold text-gray-900">{{ isEditMode ? 'Edit Client' : 'Add New Client' }}</h1>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center my-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 text-red-500 p-4 rounded-md mb-6">
        {{ error }}
      </div>

      <!-- Client Form -->
      <form v-else @submit.prevent="saveClient" class="bg-white shadow-sm rounded-lg p-6 w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Name -->
          <div class="mb-4 md:mb-0">
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
              Client Name <span class="text-red-500">*</span>
            </label>
            <input
              id="name"
              v-model="client.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Enter client name"
            />
          </div>

          <!-- Email -->
          <div class="mb-4 md:mb-0">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              v-model="client.email"
              type="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="client@example.com"
            />
          </div>

          <!-- Phone -->
          <div class="mb-4 md:mb-0">
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              id="phone"
              v-model="client.phone"
              type="tel"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="(123) 456-7890"
            />
          </div>

          <!-- Address -->
          <div class="mb-4 md:mb-0 md:col-span-2">
            <label for="address" class="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              id="address"
              v-model="client.address"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Enter client address"
            ></textarea>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end mt-6">
          <button
            type="button"
            @click="goBack"
            class="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            :disabled="isSaving"
          >
            {{ isSaving ? 'Saving...' : 'Save Client' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useClientStore } from '../stores/client';

const route = useRoute();
const router = useRouter();
const clientStore = useClientStore();

const clientId = computed(() => route.params.id);
const isEditMode = computed(() => route.name === 'EditClient');

const client = ref({
  name: '',
  email: '',
  phone: '',
  address: ''
});

const isLoading = ref(false);
const isSaving = ref(false);
const error = ref(null);

// Fetch client data if in edit mode
async function fetchClient() {
  if (!isEditMode.value) return;
  
  try {
    isLoading.value = true;
    error.value = null;
    const clientData = await clientStore.getClient(clientId.value);
    client.value = { ...clientData };
  } catch (err) {
    error.value = 'Failed to load client details. Please try again.';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
}

// Save client data
async function saveClient() {
  try {
    isSaving.value = true;
    error.value = null;
    
    if (isEditMode.value) {
      await clientStore.updateClient(clientId.value, client.value);
    } else {
      await clientStore.createClient(client.value);
    }
    
    // Navigate back to clients list
    router.push('/clients');
  } catch (err) {
    error.value = `Failed to ${isEditMode.value ? 'update' : 'create'} client. Please try again.`;
    console.error(err);
  } finally {
    isSaving.value = false;
  }
}

function goBack() {
  router.push('/clients');
}

onMounted(() => {
  if (isEditMode.value) {
    fetchClient();
  } else {
    clientStore.resetClient();
    client.value = { ...clientStore.currentClient };
  }
});
</script> 