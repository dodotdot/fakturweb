<template>
  <div class="container mx-auto py-8 px-4">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 py-8">Dashboard</h1>
      <p class="text-gray-500">Welcome back, {{ userName }}</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
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
            <p class="text-sm font-medium text-gray-500">Total Amount</p>
            <h2 class="text-3xl font-semibold text-gray-900">
              {{ totalAmount > 0 ? formatCurrency(totalAmount) : 'Rp0' }}
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
            <p class="text-sm font-medium text-gray-500">This Month</p>
            <h2 class="text-3xl font-semibold text-gray-900">{{ currentMonthInvoices }} invoices</h2>
          </div>
          <div class="h-12 w-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    <div class="mb-6 flex justify-between items-center">
      <h2 class="text-xl font-semibold text-gray-900">Recent Invoices</h2>
      <router-link 
        to="/invoices" 
        class="text-primary hover:underline flex items-center"
      >
        View All 
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </router-link>
    </div>
    
    <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Invoice
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
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody v-if="invoices.length > 0" class="bg-white divide-y divide-gray-200">
          <tr v-for="invoice in recentInvoices" :key="invoice.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ invoice.title }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ invoice.to.name }}</div>
              <div class="text-sm text-gray-500">{{ invoice.to.email }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ calculateInvoiceTotal(invoice) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ formatDate(invoice.date) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <router-link :to="`/invoices/${invoice.id}`" class="text-primary hover:text-primary/80">
                View
              </router-link>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="5" class="px-6 py-10 text-center text-gray-500">
              <p class="mb-4">No invoices found</p>
              <router-link 
                to="/invoices/new" 
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90"
              >
                Create Your First Invoice
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useInvoiceStore } from '../stores/invoice';

const authStore = useAuthStore();
const invoiceStore = useInvoiceStore();

const isLoading = ref(true);

const userName = computed(() => {
  const email = authStore.user?.email || '';
  return email ? email.split('@')[0] : 'User';
});

const invoices = computed(() => invoiceStore.invoices);
const recentInvoices = computed(() => invoices.value.slice(0, 5));

const totalAmount = computed(() => {
  return invoices.value.reduce((sum, invoice) => {
    return sum + calculateInvoiceAmount(invoice);
  }, 0);
});

const currentMonthInvoices = computed(() => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  return invoices.value.filter(invoice => {
    const invoiceDate = new Date(invoice.date);
    return invoiceDate.getMonth() === currentMonth && invoiceDate.getFullYear() === currentYear;
  }).length;
});

function calculateInvoiceAmount(invoice) {
  const subtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const taxAmount = subtotal * (invoice.taxRate / 100);
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