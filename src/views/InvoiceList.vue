<template>
  <div class="container mx-auto py-8 px-4">
    <!-- Breadcrumb -->
    <Breadcrumb :breadcrumbItems="[
      { text: 'Dashboard', to: '/dashboard' },
      { text: 'Invoices' }
    ]" />
    
    <div class="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 py-8">All Invoices</h1>
        <p class="text-gray-500">Manage your invoices</p>
      </div>
      <Button 
        tag="router-link" 
        to="/invoice/new" 
        variant="primary"
        class="inline-flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Create New Invoice
      </Button>
    </div>
    
    <!-- Filter and Sort Controls -->
    <div class="mb-4 bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
      <div class="w-full md:w-auto flex flex-col sm:flex-row gap-2">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search invoices..." 
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        />
        <select 
          v-model="clientFilter" 
          class="px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        >
          <option value="">All Clients</option>
          <option v-for="client in uniqueClients" :key="client" :value="client">{{ client }}</option>
        </select>
      </div>
      
      <div class="w-full md:w-auto flex flex-col sm:flex-row gap-2">
        <select 
          v-model="sortBy" 
          class="px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
          <option value="title">Invoice Number</option>
          <option value="client">Client Name</option>
        </select>
        
        <select 
          v-model="sortOrder" 
          class="px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div v-if="isLoading" class="p-8 text-center">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p class="mt-2 text-gray-500">Loading invoices...</p>
      </div>
      
      <table v-else class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="updateSort('title')">
              Invoice
              <span v-if="sortBy === 'title'" class="ml-1">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="updateSort('client')">
              Client
              <span v-if="sortBy === 'client'" class="ml-1">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="updateSort('amount')">
              Amount
              <span v-if="sortBy === 'amount'" class="ml-1">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="updateSort('date')">
              Date
              <span v-if="sortBy === 'date'" class="ml-1">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody v-if="paginatedInvoices.length > 0" class="bg-white divide-y divide-gray-200">
          <tr 
            v-for="invoice in paginatedInvoices" 
            :key="invoice.id"
            class="hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <td 
              class="px-6 py-4 whitespace-nowrap"
              @click="viewInvoice(invoice.id)"
            >
              <div class="text-sm font-medium text-gray-900">{{ invoice.title }}</div>
            </td>
            <td 
              class="px-6 py-4 whitespace-nowrap"
              @click="viewInvoice(invoice.id)"
            >
              <div class="text-sm text-gray-900">{{ invoice.to.name }}</div>
              <div class="text-sm text-gray-500">{{ invoice.to.email }}</div>
            </td>
            <td 
              class="px-6 py-4 whitespace-nowrap"
              @click="viewInvoice(invoice.id)"
            >
              <div class="text-sm text-gray-900">{{ formatCurrency(invoice.totalAmount) }}</div>
            </td>
            <td 
              class="px-6 py-4 whitespace-nowrap"
              @click="viewInvoice(invoice.id)"
            >
              <div class="text-sm text-gray-900">{{ formatDate(invoice.date) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <DropdownMenu>
                <template #trigger>
                  <div class="flex items-center">
                    <span class="sr-only">Actions</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </div>
                </template>
                
                <DropdownMenuItem 
                  as="router-link" 
                  :to="`/invoice/${invoice.id}/edit`"
                >
                  <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </span>
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  destructive
                  @click="confirmDelete(invoice)"
                >
                  <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </span>
                </DropdownMenuItem>
              </DropdownMenu>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="5" class="px-6 py-10 text-center text-gray-500">
              <p class="mb-4">{{ invoices.length === 0 ? 'No invoices found' : 'No invoices match your search criteria' }}</p>
              <router-link 
                v-if="invoices.length === 0"
                to="/invoice/new" 
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90"
              >
                Create Your First Invoice
              </router-link>
              <button 
                v-else
                @click="resetFilters" 
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                Reset Filters
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Pagination Controls -->
    <div v-if="filteredInvoices.length > 0" class="mt-4 flex justify-between items-center">
      <div class="text-sm text-gray-500">
        Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, filteredInvoices.length) }} of {{ filteredInvoices.length }} invoices
      </div>
      <div class="flex gap-2">
        <button 
          @click="currentPage = 1"
          :disabled="currentPage === 1"
          :class="[
            'px-3 py-1 border rounded-md text-sm',
            currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-600 hover:bg-gray-50'
          ]"
        >
          First
        </button>
        <button 
          @click="currentPage--"
          :disabled="currentPage === 1"
          :class="[
            'px-3 py-1 border rounded-md text-sm',
            currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-600 hover:bg-gray-50'
          ]"
        >
          Previous
        </button>
        <div class="flex gap-1">
          <button 
            v-for="page in displayedPages" 
            :key="page" 
            @click="currentPage = page"
            :class="[
              'px-3 py-1 border rounded-md text-sm',
              currentPage === page ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            ]"
          >
            {{ page }}
          </button>
        </div>
        <button 
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          :class="[
            'px-3 py-1 border rounded-md text-sm',
            currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-600 hover:bg-gray-50'
          ]"
        >
          Next
        </button>
        <button 
          @click="currentPage = totalPages"
          :disabled="currentPage === totalPages"
          :class="[
            'px-3 py-1 border rounded-md text-sm',
            currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-600 hover:bg-gray-50'
          ]"
        >
          Last
        </button>
      </div>
      <div class="flex items-center gap-2">
        <label for="per-page" class="text-sm text-gray-500">Per page:</label>
        <select 
          id="per-page"
          v-model="itemsPerPage" 
          class="px-2 py-1 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Delete Invoice
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Are you sure you want to delete this invoice? This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              @click="deleteInvoice"
              :disabled="isDeleting"
            >
              {{ isDeleting ? 'Deleting...' : 'Delete' }}
            </button>
            <button 
              type="button" 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              @click="showDeleteModal = false"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useInvoiceStore } from '../stores/invoice';
import { useRouter } from 'vue-router';
import Breadcrumb from '../components/ui/Breadcrumb.vue';
import Button from '../components/ui/Button.vue';
import DropdownMenu from '../components/ui/DropdownMenu.vue';
import DropdownMenuItem from '../components/ui/DropdownMenuItem.vue';

const router = useRouter();
const invoiceStore = useInvoiceStore();
const isLoading = ref(true);
const isDeleting = ref(false);
const showDeleteModal = ref(false);
const invoiceToDelete = ref(null);

// Pagination state
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Filter and sort state
const searchQuery = ref('');
const clientFilter = ref('');
const sortBy = ref('date');
const sortOrder = ref('desc');

// Get all invoices from store
const invoices = computed(() => {
  return invoiceStore.invoices.map(invoice => ({
    ...invoice,
    totalAmount: calculateInvoiceAmount(invoice)
  }));
});

// Get unique client names for filter dropdown
const uniqueClients = computed(() => {
  const clients = invoices.value.map(invoice => invoice.to.name);
  return [...new Set(clients)].sort();
});

// Filter invoices based on search query and client filter
const filteredInvoices = computed(() => {
  let result = invoices.value;
  
  // Apply search query filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(invoice => 
      invoice.title.toLowerCase().includes(query) ||
      invoice.to.name.toLowerCase().includes(query) ||
      invoice.to.email.toLowerCase().includes(query)
    );
  }
  
  // Apply client filter
  if (clientFilter.value) {
    result = result.filter(invoice => invoice.to.name === clientFilter.value);
  }
  
  // Apply sorting
  result = [...result].sort((a, b) => {
    let valA, valB;
    
    if (sortBy.value === 'date') {
      valA = new Date(a.date);
      valB = new Date(b.date);
    } else if (sortBy.value === 'amount') {
      valA = a.totalAmount;
      valB = b.totalAmount;
    } else if (sortBy.value === 'title') {
      valA = a.title;
      valB = b.title;
    } else if (sortBy.value === 'client') {
      valA = a.to.name;
      valB = b.to.name;
    }
    
    if (sortOrder.value === 'asc') {
      return valA > valB ? 1 : -1;
    } else {
      return valA < valB ? 1 : -1;
    }
  });
  
  return result;
});

// Pagination calculations
const totalPages = computed(() => Math.ceil(filteredInvoices.value.length / itemsPerPage.value));
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const endIndex = computed(() => startIndex.value + itemsPerPage.value);

// Get paginated invoices
const paginatedInvoices = computed(() => {
  return filteredInvoices.value.slice(startIndex.value, endIndex.value);
});

// Calculate which pages to show in pagination
const displayedPages = computed(() => {
  const pages = [];
  let startPage = Math.max(1, currentPage.value - 2);
  let endPage = Math.min(totalPages.value, startPage + 4);
  
  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  return pages;
});

// Helper function to calculate invoice amount
function calculateInvoiceAmount(invoice) {
  const subtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const taxAmount = subtotal * (invoice.taxRate / 100);
  return subtotal + taxAmount;
}

// Update sort when clicking table header
function updateSort(column) {
  if (sortBy.value === column) {
    // Toggle sort order if clicking the same column
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    // Set new sort column with default desc order
    sortBy.value = column;
    sortOrder.value = 'desc';
  }
}

// Reset all filters
function resetFilters() {
  searchQuery.value = '';
  clientFilter.value = '';
  sortBy.value = 'date';
  sortOrder.value = 'desc';
  currentPage.value = 1;
}

function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

function confirmDelete(invoice) {
  invoiceToDelete.value = invoice;
  showDeleteModal.value = true;
}

async function deleteInvoice() {
  if (!invoiceToDelete.value) return;
  
  try {
    isDeleting.value = true;
    await invoiceStore.deleteInvoice(invoiceToDelete.value.id);
    showDeleteModal.value = false;
    
    // If deleting the last item on the page, go to previous page
    if (paginatedInvoices.value.length === 1 && currentPage.value > 1) {
      currentPage.value--;
    }
  } catch (error) {
    console.error('Error deleting invoice:', error);
  } finally {
    isDeleting.value = false;
  }
}

// Reset to page 1 when filters change
watch([searchQuery, clientFilter, itemsPerPage], () => {
  currentPage.value = 1;
});

// Ensure we don't stay on an invalid page
watch([totalPages], () => {
  if (currentPage.value > totalPages.value && totalPages.value > 0) {
    currentPage.value = totalPages.value;
  }
});

function viewInvoice(id) {
  router.push(`/invoice/${id}`);
}

onMounted(async () => {
  try {
    isLoading.value = true;
    await invoiceStore.fetchUserInvoices();
  } catch (error) {
    console.error('Error fetching invoices:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
@media (max-width: 768px) {
  .flex-col-reverse {
    flex-direction: column-reverse;
  }
}

.hover\:bg-gray-50:hover {
  background-color: rgba(249, 250, 251, 0.8);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
}

tr.hover\:bg-gray-50 {
  transition: all 0.2s ease;
}

tr.hover\:bg-gray-50:hover td {
  color: var(--color-primary);
}

tr.hover\:bg-gray-50:hover td:last-child {
  color: initial;
}
</style> 