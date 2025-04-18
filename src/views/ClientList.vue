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
            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">Clients</span>
          </div>
        </li>
      </ol>
    </nav>

    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Clients</h1>
      <router-link 
        to="/clients/new" 
        class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
      >
        + Add Client
      </router-link>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center my-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 text-red-500 p-4 rounded-md mb-6">
      {{ error }}
      <button @click="fetchClients" class="ml-2 text-primary underline">Try Again</button>
    </div>

    <!-- Empty State -->
    <div v-else-if="clients.length === 0" class="bg-gray-50 rounded-lg p-8 text-center">
      <div class="flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h2 class="text-xl font-medium text-gray-900 mb-2">No clients yet</h2>
        <p class="text-gray-500 mb-4">Start by adding your first client</p>
        <router-link 
          to="/clients/new" 
          class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Add Client
        </router-link>
      </div>
    </div>

    <!-- Client List -->
    <div v-else class="bg-white shadow rounded-md overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="client in clients" :key="client.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ client.name }}</div>
              <div class="text-sm text-gray-500 truncate max-w-xs">{{ client.address }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ client.email || '—' }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ client.phone || '—' }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex justify-end space-x-3">
                <button 
                  @click="editClient(client.id)" 
                  class="text-primary hover:text-primary-dark"
                >
                  Edit
                </button>
                <button 
                  @click="confirmDelete(client)" 
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Delete Client</h3>
        <p class="text-gray-500 mb-6">Are you sure you want to delete <span class="font-medium">{{ clientToDelete?.name }}</span>? This action cannot be undone.</p>
        <div class="flex justify-end space-x-3">
          <button 
            @click="showDeleteModal = false" 
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            @click="deleteClientConfirmed" 
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            :disabled="isDeleting"
          >
            {{ isDeleting ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useClientStore } from '../stores/client';

const router = useRouter();
const clientStore = useClientStore();

const clients = ref([]);
const isLoading = ref(true);
const error = ref(null);
const showDeleteModal = ref(false);
const clientToDelete = ref(null);
const isDeleting = ref(false);

async function fetchClients() {
  try {
    isLoading.value = true;
    error.value = null;
    clients.value = await clientStore.fetchClients();
  } catch (err) {
    error.value = 'Failed to load clients. Please try again.';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
}

function editClient(id) {
  router.push(`/clients/${id}/edit`);
}

function confirmDelete(client) {
  clientToDelete.value = client;
  showDeleteModal.value = true;
}

async function deleteClientConfirmed() {
  if (!clientToDelete.value) return;
  
  try {
    isDeleting.value = true;
    await clientStore.deleteClient(clientToDelete.value.id);
    showDeleteModal.value = false;
    clientToDelete.value = null;
  } catch (err) {
    error.value = 'Failed to delete client. Please try again.';
    console.error(err);
  } finally {
    isDeleting.value = false;
  }
}

onMounted(() => {
  fetchClients();
});
</script> 