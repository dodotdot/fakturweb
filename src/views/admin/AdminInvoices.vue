<template>
  <div class="container mx-auto py-8 px-4">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 pb-2">Invoice Analytics</h1>
      <p class="text-gray-500">Monitor system-wide invoice data and trends</p>
    </div>
    
    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Total Invoices</p>
            <h2 class="text-3xl font-semibold text-gray-900">{{ invoices.length }}</h2>
            <p class="text-sm text-gray-500 mt-1">
              <span :class="invoiceGrowth >= 0 ? 'text-green-600' : 'text-red-600'">
                {{ invoiceGrowth >= 0 ? '+' : '' }}{{ invoiceGrowth }}%
              </span>
              vs last month
            </p>
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
              {{ formatCurrency(totalRevenue) }}
            </h2>
            <p class="text-sm text-gray-500 mt-1">
              <span :class="revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'">
                {{ revenueGrowth >= 0 ? '+' : '' }}{{ revenueGrowth }}%
              </span>
              vs last month
            </p>
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
            <p class="text-sm font-medium text-gray-500">Average Value</p>
            <h2 class="text-3xl font-semibold text-gray-900">
              {{ formatCurrency(averageInvoiceValue) }}
            </h2>
            <p class="text-sm text-gray-500 mt-1">Per invoice</p>
          </div>
          <div class="h-12 w-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Pending Payments</p>
            <h2 class="text-3xl font-semibold text-gray-900">
              {{ formatCurrency(pendingPaymentsTotal) }}
            </h2>
            <p class="text-sm text-gray-500 mt-1">Across {{ pendingInvoicesCount }} invoices</p>
          </div>
          <div class="h-12 w-12 bg-yellow-100 text-yellow-600 flex items-center justify-center rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Monthly Revenue Chart -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-10">
      <h2 class="text-lg font-medium mb-4">Revenue Trends (Last 12 Months)</h2>
      <div class="chart-container" style="height: 300px; position: relative;">
        <!-- Simple chart representation (in production, you'd use Chart.js or similar) -->
        <div class="flex h-full items-end justify-between gap-1">
          <div v-for="(month, index) in monthlyRevenueData" :key="index" class="flex flex-col items-center">
            <div 
              class="bg-primary/80 w-16 rounded-t-md" 
              :style="{ height: `${(month.revenue / monthlyRevenueMax) * 250}px` }"
            ></div>
            <div class="text-xs mt-2 text-gray-600">{{ month.label }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Invoice Status Distribution -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 class="text-lg font-medium mb-4">Invoice Status Distribution</h2>
        <div class="flex flex-col gap-4">
          <div v-for="(status, index) in invoiceStatusData" :key="index">
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium text-gray-700">{{ status.label }}</span>
              <span class="text-sm text-gray-500">{{ status.count }} ({{ status.percentage }}%)</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                class="h-2.5 rounded-full" 
                :style="{ width: `${status.percentage}%`, backgroundColor: status.color }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 class="text-lg font-medium mb-4">Top Users by Invoice Volume</h2>
        <div class="space-y-4">
          <div v-for="(user, index) in topUsers" :key="index" class="flex items-center">
            <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold mr-4">
              {{ getUserInitials(user.email) }}
            </div>
            <div class="flex-1">
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-900">{{ user.name || user.email }}</span>
                <span class="text-sm font-medium text-gray-700">{{ user.invoiceCount }} invoices</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  class="bg-primary h-2.5 rounded-full" 
                  :style="{ width: `${(user.invoiceCount / topUserMaxCount) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Recent Invoices -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-10">
      <div class="p-4 border-b border-gray-100 flex justify-between items-center">
        <h2 class="text-lg font-medium">Recent Invoices</h2>
        <button @click="refreshData" class="text-primary hover:underline">Refresh</button>
      </div>
      
      <div class="overflow-x-auto">
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
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
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
                <span 
                  :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    getStatusClass(invoice.status)
                  ]"
                >
                  {{ formatStatus(invoice.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ calculateInvoiceTotal(invoice) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(invoice.date) }}</div>
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
import { useAuthStore } from '../../stores/auth';
import { trackPageView } from '../../utils/analytics';

const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref(true);
const users = ref([]);
const invoices = ref([]);

// Make sure only superadmin can access this page
onMounted(async () => {
  try {
    if (!authStore.isSuperAdmin) {
      router.push('/dashboard');
      return;
    }
    
    // Track page view
    trackPageView('/admin/invoices', 'Invoice Analytics - Admin Console');
    
    isLoading.value = true;
    await refreshData();
  } catch (error) {
    console.error('Error fetching admin data:', error);
  } finally {
    isLoading.value = false;
  }
});

async function refreshData() {
  await Promise.all([
    fetchAllUsers(),
    fetchAllInvoices()
  ]);
}

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

// Computed properties for metrics
const totalRevenue = computed(() => {
  return invoices.value.reduce((total, invoice) => {
    return total + calculateInvoiceAmount(invoice);
  }, 0);
});

const averageInvoiceValue = computed(() => {
  if (invoices.value.length === 0) return 0;
  return totalRevenue.value / invoices.value.length;
});

const invoiceGrowth = computed(() => {
  const thisMonth = getInvoicesInPeriod(0, 1);
  const lastMonth = getInvoicesInPeriod(1, 2);
  
  if (lastMonth === 0) return 0;
  return Math.round(((thisMonth - lastMonth) / lastMonth) * 100);
});

const revenueGrowth = computed(() => {
  const thisMonthRevenue = getRevenueInPeriod(0, 1);
  const lastMonthRevenue = getRevenueInPeriod(1, 2);
  
  if (lastMonthRevenue === 0) return 0;
  return Math.round(((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100);
});

const pendingInvoicesCount = computed(() => {
  return invoices.value.filter(invoice => 
    invoice.status === 'draft' || invoice.status === 'sent' || invoice.status === 'overdue'
  ).length;
});

const pendingPaymentsTotal = computed(() => {
  return invoices.value
    .filter(invoice => 
      invoice.status === 'draft' || invoice.status === 'sent' || invoice.status === 'overdue'
    )
    .reduce((total, invoice) => total + calculateInvoiceAmount(invoice), 0);
});

const monthlyRevenueData = computed(() => {
  const data = [];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Get last 12 months
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  for (let i = 11; i >= 0; i--) {
    let month = currentMonth - i;
    let year = currentYear;
    
    // Handle year boundary
    if (month < 0) {
      month += 12;
      year -= 1;
    }
    
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);
    
    // Filter invoices for this month
    const monthlyInvoices = invoices.value.filter(invoice => {
      const invoiceDate = new Date(invoice.date);
      return invoiceDate >= monthStart && invoiceDate <= monthEnd;
    });
    
    // Calculate total revenue for this month
    const revenue = monthlyInvoices.reduce((total, invoice) => 
      total + calculateInvoiceAmount(invoice), 0);
    
    data.push({
      label: monthNames[month],
      revenue: revenue
    });
  }
  
  return data;
});

const monthlyRevenueMax = computed(() => {
  if (monthlyRevenueData.value.length === 0) return 0;
  return Math.max(...monthlyRevenueData.value.map(m => m.revenue));
});

const invoiceStatusData = computed(() => {
  const statuses = {
    draft: { label: 'Draft', count: 0, color: '#9CA3AF' },
    sent: { label: 'Sent', count: 0, color: '#3B82F6' },
    paid: { label: 'Paid', count: 0, color: '#10B981' },
    overdue: { label: 'Overdue', count: 0, color: '#EF4444' },
    cancelled: { label: 'Cancelled', count: 0, color: '#6B7280' }
  };
  
  // Count invoices by status
  invoices.value.forEach(invoice => {
    if (statuses[invoice.status]) {
      statuses[invoice.status].count++;
    }
  });
  
  // Calculate percentages
  const total = invoices.value.length;
  Object.keys(statuses).forEach(status => {
    statuses[status].percentage = total > 0 
      ? Math.round((statuses[status].count / total) * 100) 
      : 0;
  });
  
  return Object.values(statuses);
});

const topUsers = computed(() => {
  const userCounts = {};
  
  // Count invoices by user
  invoices.value.forEach(invoice => {
    if (!userCounts[invoice.user_id]) {
      const user = users.value.find(u => u.id === invoice.user_id);
      userCounts[invoice.user_id] = {
        id: invoice.user_id,
        email: user?.email || 'Unknown',
        name: user?.full_name || '',
        invoiceCount: 0
      };
    }
    userCounts[invoice.user_id].invoiceCount++;
  });
  
  // Convert to array and sort by invoice count
  const sortedUsers = Object.values(userCounts)
    .sort((a, b) => b.invoiceCount - a.invoiceCount)
    .slice(0, 5); // Get top 5 users
  
  return sortedUsers;
});

const topUserMaxCount = computed(() => {
  if (topUsers.value.length === 0) return 0;
  return Math.max(...topUsers.value.map(user => user.invoiceCount));
});

const recentInvoices = computed(() => {
  return invoices.value.slice(0, 10);
});

// Helper functions
function getInvoicesInPeriod(monthsAgoStart, monthsAgoEnd) {
  const today = new Date();
  const periodStart = new Date(today.getFullYear(), today.getMonth() - monthsAgoStart, 1);
  const periodEnd = new Date(today.getFullYear(), today.getMonth() - monthsAgoEnd + 1, 0);
  
  return invoices.value.filter(invoice => {
    const invoiceDate = new Date(invoice.date);
    return invoiceDate >= periodStart && invoiceDate <= periodEnd;
  }).length;
}

function getRevenueInPeriod(monthsAgoStart, monthsAgoEnd) {
  const today = new Date();
  const periodStart = new Date(today.getFullYear(), today.getMonth() - monthsAgoStart, 1);
  const periodEnd = new Date(today.getFullYear(), today.getMonth() - monthsAgoEnd + 1, 0);
  
  return invoices.value
    .filter(invoice => {
      const invoiceDate = new Date(invoice.date);
      return invoiceDate >= periodStart && invoiceDate <= periodEnd;
    })
    .reduce((total, invoice) => total + calculateInvoiceAmount(invoice), 0);
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

function getUserEmail(userId) {
  const user = users.value.find(u => u.id === userId);
  return user ? user.email : 'Unknown';
}

function getUserInitials(email) {
  if (!email) return 'N/A';
  
  const parts = email.split('@')[0].split(/[._-]/);
  if (parts.length > 1) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }
  
  return email.substring(0, 2).toUpperCase();
}

function getStatusClass(status) {
  switch (status) {
    case 'draft': return 'bg-gray-100 text-gray-800';
    case 'sent': return 'bg-blue-100 text-blue-800';
    case 'paid': return 'bg-green-100 text-green-800';
    case 'overdue': return 'bg-red-100 text-red-800';
    case 'cancelled': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function formatStatus(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}
</script> 