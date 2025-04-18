<template>
  <div class="container mx-auto py-8 px-4">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 pb-2">Admin Dashboard</h1>
      <p class="text-gray-500">Monitor and manage system-wide data</p>
    </div>
    
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Total Users</p>
            <h2 class="text-3xl font-semibold text-gray-900">{{ users.length }}</h2>
          </div>
          <div class="h-12 w-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Total Invoices</p>
            <h2 class="text-3xl font-semibold text-gray-900">{{ invoices.length }}</h2>
          </div>
          <div class="h-12 w-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Total Revenue</p>
            <h2 class="text-3xl font-semibold text-gray-900">
              {{ totalRevenue > 0 ? formatCurrency(totalRevenue) : 'Rp0' }}
            </h2>
          </div>
          <div class="h-12 w-12 bg-green-100 text-green-600 flex items-center justify-center rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">New Users (30d)</p>
            <h2 class="text-3xl font-semibold text-gray-900">{{ newUsersCount }}</h2>
          </div>
          <div class="h-12 w-12 bg-purple-100 text-purple-600 flex items-center justify-center rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Guest PDF Generation Stats -->
    <div class="mb-10">
      <div class="mb-6 flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-900">Guest PDF Generation</h2>
        <button 
          @click="refreshGuestStats" 
          class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Total PDFs</p>
              <h2 class="text-3xl font-semibold text-gray-900">{{ guestPdfStats.total }}</h2>
            </div>
            <div class="h-12 w-12 bg-amber-100 text-amber-600 flex items-center justify-center rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Today</p>
              <h2 class="text-3xl font-semibold text-gray-900">{{ guestPdfStats.todayCount }}</h2>
            </div>
            <div class="h-12 w-12 bg-red-100 text-red-600 flex items-center justify-center rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Last 7 Days</p>
              <h2 class="text-3xl font-semibold text-gray-900">{{ guestPdfStats.weeklyCount }}</h2>
            </div>
            <div class="h-12 w-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Last 30 Days</p>
              <h2 class="text-3xl font-semibold text-gray-900">{{ guestPdfStats.monthlyCount }}</h2>
            </div>
            <div class="h-12 w-12 bg-green-100 text-green-600 flex items-center justify-center rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Recent Guest PDF Generations -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-4 border-b border-gray-100">
          <h3 class="text-base font-medium text-gray-900">Recent Guest PDFs</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Title</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated</th>
              </tr>
            </thead>
            <tbody v-if="guestPdfStats.recentGenerations.length > 0" class="bg-white divide-y divide-gray-200">
              <tr v-for="gen in guestPdfStats.recentGenerations" :key="gen.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ gen.title }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatCurrency(gen.amount) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(gen.generated_at) }}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="3" class="px-6 py-10 text-center text-gray-500">
                  No guest PDFs have been generated yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- Users Section -->
    <div class="mb-10">
      <div class="mb-6 flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-900">Users</h2>
      </div>
      
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-4 border-b border-gray-100 flex justify-between items-center">
          <div class="relative w-64">
            <input 
              type="text" 
              v-model="userSearch" 
              placeholder="Search users..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
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
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody v-if="filteredUsers.length > 0" class="bg-white divide-y divide-gray-200">
            <tr v-for="user in filteredUsers" :key="user.id">
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
                  class="text-yellow-600 hover:text-yellow-900"
                >
                  Revoke Admin
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="5" class="px-6 py-10 text-center text-gray-500">
                No users found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Recent Invoices Section -->
    <div class="mb-10">
      <div class="mb-6 flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-900">Recent Invoices</h2>
      </div>
      
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody v-if="invoices.length > 0" class="bg-white divide-y divide-gray-200">
            <tr v-for="invoice in recentInvoices" :key="invoice.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ invoice.title }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ getUserEmail(invoice.user_id) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ invoice.to?.name || 'N/A' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ calculateInvoiceTotal(invoice) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(invoice.date) }}</div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="5" class="px-6 py-10 text-center text-gray-500">
                No invoices found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { trackPageView } from '../utils/analytics';
import { getGuestPdfStats } from '../utils/guest-tracker';

const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref(true);
const authInitialized = ref(false);
const users = ref([]);
const invoices = ref([]);
const userSearch = ref('');
const guestPdfStats = ref({
  total: 0,
  todayCount: 0,
  weeklyCount: 0,
  monthlyCount: 0,
  recentGenerations: []
});

// Make sure only superadmin can access this page
onMounted(async () => {
  try {
    isLoading.value = true;
    
    // Make sure auth is initialized before checking permissions
    if (!authStore.isAuthenticated) {
      await authStore.initialize();
    }
    
    authInitialized.value = true;
    
    // Check if user is superadmin after auth is initialized
    if (!authStore.isSuperAdmin) {
      router.push('/dashboard');
      return;
    }
    
    // Track admin dashboard page view
    trackPageView('/admin', 'Admin Dashboard - System Monitoring');
    
    await Promise.all([
      fetchAllUsers(),
      fetchAllInvoices(),
      fetchGuestPdfStats()
    ]);
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
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    invoices.value = data || [];
  } catch (error) {
    console.error('Error fetching invoices:', error);
  }
}

async function fetchGuestPdfStats() {
  try {
    const stats = await getGuestPdfStats();
    guestPdfStats.value = stats;
  } catch (error) {
    console.error('Error fetching guest PDF stats:', error);
  }
}

async function refreshGuestStats() {
  await fetchGuestPdfStats();
}

// Computed data
const filteredUsers = computed(() => {
  if (!userSearch.value) return users.value;
  
  const search = userSearch.value.toLowerCase();
  return users.value.filter(user => 
    user.email?.toLowerCase().includes(search) || 
    user.full_name?.toLowerCase().includes(search)
  );
});

const totalRevenue = computed(() => {
  return invoices.value.reduce((sum, invoice) => {
    return sum + calculateInvoiceAmount(invoice);
  }, 0);
});

const newUsersCount = computed(() => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return users.value.filter(user => {
    const createdAt = new Date(user.created_at);
    return createdAt >= thirtyDaysAgo;
  }).length;
});

const recentInvoices = computed(() => {
  return invoices.value.slice(0, 10);
});

// Helper functions
function getUserInvoiceCount(userId) {
  return invoices.value.filter(invoice => invoice.user_id === userId).length;
}

function getUserEmail(userId) {
  const user = users.value.find(u => u.id === userId);
  return user ? user.email : 'Unknown';
}

function getUserInitials(email) {
  if (!email) return 'NA';
  return email.substring(0, 2).toUpperCase();
}

function calculateInvoiceAmount(invoice) {
  if (!invoice.items) return 0;
  
  const subtotal = invoice.items.reduce((sum, item) => {
    return sum + (item.quantity * item.unitPrice);
  }, 0);
  
  const taxAmount = subtotal * (invoice.tax_rate / 100);
  return subtotal + taxAmount;
}

function calculateInvoiceTotal(invoice) {
  return formatCurrency(calculateInvoiceAmount(invoice));
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
</script> 