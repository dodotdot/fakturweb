<template>
  <div class="container mx-auto py-8 px-4">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 pb-2">User Management</h1>
      <p class="text-gray-500">Manage users and their permissions</p>
    </div>
    
    <!-- Search and filter controls -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100 mb-6 p-4">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Search Users</label>
          <div class="relative">
            <input 
              id="search"
              type="text" 
              v-model="search" 
              placeholder="Search by name or email..." 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div>
          <label for="role-filter" class="block text-sm font-medium text-gray-700 mb-1">Filter by Role</label>
          <select 
            id="role-filter"
            v-model="roleFilter" 
            class="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">All Roles</option>
            <option value="user">Regular Users</option>
            <option value="superadmin">Admins</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <select 
            v-model="sortBy" 
            class="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="email">Email (A-Z)</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- User List -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-4 border-b border-gray-100 flex justify-between items-center">
        <h2 class="text-lg font-medium">Users ({{ filteredUsers.length }})</h2>
      </div>
      
      <!-- User table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoices
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Registered
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody v-if="filteredUsers.length > 0" class="bg-white divide-y divide-gray-200">
            <tr v-for="user in paginatedUsers" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {{ getUserInitials(user.email) }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.full_name || 'N/A' }}</div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    user.role === 'superadmin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                  ]"
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ getUserInvoiceCount(user.id) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(user.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(user.last_login) || 'Never' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button 
                  v-if="user.role !== 'superadmin'"
                  @click="promoteToAdmin(user)"
                  class="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  Make Admin
                </button>
                <button 
                  v-if="user.role === 'superadmin'"
                  @click="demoteToUser(user)"
                  class="text-yellow-600 hover:text-yellow-900 mr-4"
                >
                  Revoke Admin
                </button>
                <button
                  @click="viewUserDetails(user)"
                  class="text-gray-600 hover:text-gray-900"
                >
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="6" class="px-6 py-10 text-center text-gray-500">
                No users found matching your criteria
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination controls -->
      <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            :class="[
              'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md',
              currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            ]"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage >= totalPages"
            :class="[
              'ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md',
              currentPage >= totalPages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            ]"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing
              <span class="font-medium">{{ paginationStart }}</span>
              to
              <span class="font-medium">{{ paginationEnd }}</span>
              of
              <span class="font-medium">{{ filteredUsers.length }}</span>
              results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                :class="{ 'cursor-not-allowed': currentPage === 1 }"
              >
                <span class="sr-only">Previous</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <span
                v-for="page in visiblePageNumbers"
                :key="page"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  page === currentPage
                    ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                ]"
                @click="goToPage(page)"
              >
                {{ page }}
              </span>
              <button
                @click="nextPage"
                :disabled="currentPage >= totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                :class="{ 'cursor-not-allowed': currentPage >= totalPages }"
              >
                <span class="sr-only">Next</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { trackPageView } from '../../utils/analytics';

const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref(true);
const users = ref([]);
const invoices = ref([]);

// Filtering and sorting
const search = ref('');
const roleFilter = ref('all');
const sortBy = ref('newest');

// Pagination
const currentPage = ref(1);
const itemsPerPage = 10;

// Make sure only superadmin can access this page
onMounted(async () => {
  try {
    if (!authStore.isSuperAdmin) {
      router.push('/dashboard');
      return;
    }
    
    // Track page view
    trackPageView('/admin/users', 'User Management - Admin Console');
    
    isLoading.value = true;
    await fetchAllUsers();
    await fetchAllInvoices();
  } catch (error) {
    console.error('Error fetching admin data:', error);
  } finally {
    isLoading.value = false;
  }
});

async function fetchAllUsers() {
  try {
    const { data, error } = await authStore.supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    users.value = data || [];
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

async function fetchAllInvoices() {
  try {
    const { data, error } = await authStore.supabase
      .from('invoices')
      .select('id, user_id')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    invoices.value = data || [];
  } catch (error) {
    console.error('Error fetching invoices:', error);
  }
}

// Sort and filter functions
const filteredUsers = computed(() => {
  let result = [...users.value];
  
  // Filter by search term
  if (search.value) {
    const searchTerm = search.value.toLowerCase();
    result = result.filter(user => 
      (user.email && user.email.toLowerCase().includes(searchTerm)) ||
      (user.full_name && user.full_name.toLowerCase().includes(searchTerm))
    );
  }
  
  // Filter by role
  if (roleFilter.value !== 'all') {
    result = result.filter(user => user.role === roleFilter.value);
  }
  
  // Sort results
  switch (sortBy.value) {
    case 'newest':
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      break;
    case 'oldest':
      result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      break;
    case 'email':
      result.sort((a, b) => a.email?.localeCompare(b.email));
      break;
    case 'name':
      result.sort((a, b) => {
        const aName = a.full_name || '';
        const bName = b.full_name || '';
        return aName.localeCompare(bName);
      });
      break;
  }
  
  return result;
});

// Pagination computed properties
const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage));

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredUsers.value.slice(start, end);
});

const paginationStart = computed(() => {
  if (filteredUsers.value.length === 0) return 0;
  return (currentPage.value - 1) * itemsPerPage + 1;
});

const paginationEnd = computed(() => {
  const end = currentPage.value * itemsPerPage;
  return end > filteredUsers.value.length ? filteredUsers.value.length : end;
});

const visiblePageNumbers = computed(() => {
  const pages = [];
  
  if (totalPages.value <= 7) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage.value <= 3) {
      // Show first 5 pages, ellipsis, last page
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages.value);
    } else if (currentPage.value >= totalPages.value - 2) {
      // Show first page, ellipsis, last 5 pages
      pages.push(1);
      pages.push('...');
      for (let i = totalPages.value - 4; i <= totalPages.value; i++) pages.push(i);
    } else {
      // Show first page, ellipsis, current-1, current, current+1, ellipsis, last page
      pages.push(1);
      pages.push('...');
      for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages.value);
    }
  }
  
  return pages;
});

// Pagination methods
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function goToPage(page) {
  if (typeof page === 'number') {
    currentPage.value = page;
  }
}

// Helper functions
function getUserInvoiceCount(userId) {
  return invoices.value.filter(invoice => invoice.user_id === userId).length;
}

function getUserInitials(email) {
  if (!email) return 'N/A';
  
  const parts = email.split('@')[0].split(/[._-]/);
  if (parts.length > 1) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }
  
  return email.substring(0, 2).toUpperCase();
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

async function promoteToAdmin(user) {
  try {
    const { error } = await authStore.supabase
      .from('users')
      .update({ role: 'superadmin' })
      .eq('id', user.id);
    
    if (error) throw error;
    
    // Refresh user list
    await fetchAllUsers();
  } catch (error) {
    console.error('Error promoting user:', error);
  }
}

async function demoteToUser(user) {
  try {
    const { error } = await authStore.supabase
      .from('users')
      .update({ role: 'user' })
      .eq('id', user.id);
    
    if (error) throw error;
    
    // Refresh user list
    await fetchAllUsers();
  } catch (error) {
    console.error('Error demoting user:', error);
  }
}

function viewUserDetails(user) {
  // You could implement a user details view or modal here
  console.log('View details for user:', user);
}
</script> 