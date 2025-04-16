<template>
  <div class="min-h-screen py-12">
    <div class="container mx-auto max-w-4xl">
      <div class="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center py-8 gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Preview Faktur</h1>
          <p class="text-gray-500">
            Faktur anda telah dibuat. Anda dapat mengunduh atau melihat tampilan di bawah.
          </p>
        </div>
        <div class="flex space-x-4">
          <button
            @click="backToEdit"
            class="px-6 py-3 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 font-medium flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Kembali Edit
          </button>
          <button 
            @click="downloadPDF"
            class="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 font-medium flex items-center"
            :disabled="isGenerating"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            {{ isGenerating ? 'Membuat PDF...' : 'Unduh PDF' }}
          </button>
        </div>
      </div>
      
      <!-- Theme Selector -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-3">Pilih Tema Invoice</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            class="border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md"
            :class="{ 'ring-2 ring-primary': selectedTheme === 'classic' }"
            @click="selectedTheme = 'classic'"
          >
            <div class="bg-white p-3 rounded">
              <div class="h-10 border-b border-gray-200 mb-2"></div>
              <div class="flex space-x-2 mb-2">
                <div class="w-10 h-10 bg-gray-100 rounded"></div>
                <div class="flex-1 h-10 bg-gray-100 rounded"></div>
              </div>
              <div class="h-4 bg-gray-100 w-1/2 rounded mb-2"></div>
            </div>
            <p class="mt-2 text-center font-medium">Klasik</p>
          </div>
          
          <div 
            class="border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md"
            :class="{ 'ring-2 ring-primary': selectedTheme === 'modern' }"
            @click="selectedTheme = 'modern'"
          >
            <div class="bg-blue-50 p-3 rounded">
              <div class="h-10 border-b border-blue-200 mb-2"></div>
              <div class="flex space-x-2 mb-2">
                <div class="w-10 h-10 bg-blue-100 rounded-full"></div>
                <div class="flex-1 h-10 bg-blue-100 rounded"></div>
              </div>
              <div class="h-4 bg-blue-100 w-1/2 rounded mb-2"></div>
            </div>
            <p class="mt-2 text-center font-medium">Modern</p>
          </div>
          
          <div 
            class="border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md"
            :class="{ 'ring-2 ring-primary': selectedTheme === 'elegant' }"
            @click="selectedTheme = 'elegant'"
          >
            <div class="bg-gray-900 p-3 rounded">
              <div class="h-10 border-b border-gray-700 mb-2"></div>
              <div class="flex space-x-2 mb-2">
                <div class="w-10 h-10 bg-yellow-500 rounded-lg"></div>
                <div class="flex-1 h-10 bg-gray-800 rounded"></div>
              </div>
              <div class="h-4 bg-gray-800 w-1/2 rounded mb-2"></div>
            </div>
            <p class="mt-2 text-center font-medium">Elegan</p>
          </div>
        </div>
      </div>
    </div>  
    
    <div class="container mx-auto max-w-4xl">
      <div 
        :class="[
          'shadow-lg p-8 rounded-lg border',
          {
            'bg-white border-gray-200': selectedTheme === 'classic',
            'bg-blue-50 border-blue-200': selectedTheme === 'modern',
            'bg-gray-900 text-white border-gray-700': selectedTheme === 'elegant'
          }
        ]" 
        ref="invoicePrintRef"
      >
        <!-- Invoice Header -->
        <div class="flex flex-col md:flex-row justify-between items-start mb-10">
          <!-- Logo -->
          <div class="w-40 h-40 flex items-center justify-center mb-4 md:mb-0">
            <div v-if="invoice.logo" class="relative w-full h-full">
              <img 
                :src="invoice.logo" 
                alt="Invoice Logo" 
                class="max-w-full max-h-full object-contain"
              />
            </div>
            <div 
              v-else 
              :class="[
                'w-full h-full flex items-center justify-center border-2 rounded-lg',
                {
                  'border-gray-300': selectedTheme === 'classic',
                  'border-blue-300': selectedTheme === 'modern',
                  'border-gray-700': selectedTheme === 'elegant'
                }
              ]"
            >
              <span :class="{
                'text-gray-400': selectedTheme === 'classic',
                'text-blue-400': selectedTheme === 'modern',
                'text-gray-500': selectedTheme === 'elegant'
              }">No Logo</span>
            </div>
          </div>
          
          <div class="flex-1 md:ml-8">
            <div 
              :class="[
                'text-3xl font-bold mb-2 text-right',
                {
                  'text-gray-800': selectedTheme === 'classic',
                  'text-blue-800': selectedTheme === 'modern',
                  'text-yellow-500': selectedTheme === 'elegant'
                }
              ]"
            >{{ invoice.title }}</div>
            <div class="flex flex-col space-y-1 items-end">
              <div class="flex items-center">
                <span :class="{
                  'text-gray-500': selectedTheme === 'classic',
                  'text-blue-500': selectedTheme === 'modern',
                  'text-gray-400': selectedTheme === 'elegant'
                }" class="w-24">Tanggal:</span>
                <span>{{ formatDate(invoice.date) }}</span>
              </div>
              <div class="flex items-center">
                <span :class="{
                  'text-gray-500': selectedTheme === 'classic',
                  'text-blue-500': selectedTheme === 'modern',
                  'text-gray-400': selectedTheme === 'elegant'
                }" class="w-24">Jatuh Tempo:</span>
                <span>{{ formatDate(invoice.dueDate) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Invoice From/To -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div class="from-details">
            <h3 :class="{
              'text-gray-400': selectedTheme === 'classic',
              'text-blue-500': selectedTheme === 'modern',
              'text-yellow-500': selectedTheme === 'elegant'
            }" class="text-sm uppercase font-medium mb-2">Dari</h3>
            <div :class="{
              'text-gray-900': selectedTheme === 'classic',
              'text-blue-900': selectedTheme === 'modern',
              'text-white': selectedTheme === 'elegant'
            }" class="font-semibold text-lg mb-2">{{ invoice.from.name }}</div>
            <div :class="{
              'text-gray-600': selectedTheme === 'classic',
              'text-blue-700': selectedTheme === 'modern',
              'text-gray-300': selectedTheme === 'elegant'
            }" class="mb-2">{{ invoice.from.address }}</div>
            <div class="flex items-center mb-1">
              <span :class="{
                'text-gray-400': selectedTheme === 'classic',
                'text-blue-500': selectedTheme === 'modern',
                'text-gray-400': selectedTheme === 'elegant'
              }" class="w-16">Email:</span>
              <span>{{ invoice.from.email }}</span>
            </div>
            <div class="flex items-center">
              <span :class="{
                'text-gray-400': selectedTheme === 'classic',
                'text-blue-500': selectedTheme === 'modern',
                'text-gray-400': selectedTheme === 'elegant'
              }" class="w-16">Telepon:</span>
              <span>{{ invoice.from.phone }}</span>
            </div>
          </div>
          
          <div class="to-details">
            <h3 :class="{
              'text-gray-400': selectedTheme === 'classic',
              'text-blue-500': selectedTheme === 'modern',
              'text-yellow-500': selectedTheme === 'elegant'
            }" class="text-sm uppercase font-medium mb-2">Tagih Kepada</h3>
            <div :class="{
              'text-gray-900': selectedTheme === 'classic',
              'text-blue-900': selectedTheme === 'modern',
              'text-white': selectedTheme === 'elegant'
            }" class="font-semibold text-lg mb-2">{{ invoice.to.name }}</div>
            <div :class="{
              'text-gray-600': selectedTheme === 'classic',
              'text-blue-700': selectedTheme === 'modern',
              'text-gray-300': selectedTheme === 'elegant'
            }" class="mb-2">{{ invoice.to.address }}</div>
            <div class="flex items-center mb-1">
              <span :class="{
                'text-gray-400': selectedTheme === 'classic',
                'text-blue-500': selectedTheme === 'modern',
                'text-gray-400': selectedTheme === 'elegant'
              }" class="w-16">Email:</span>
              <span>{{ invoice.to.email }}</span>
            </div>
            <div class="flex items-center">
              <span :class="{
                'text-gray-400': selectedTheme === 'classic',
                'text-blue-500': selectedTheme === 'modern',
                'text-gray-400': selectedTheme === 'elegant'
              }" class="w-16">Telepon:</span>
              <span>{{ invoice.to.phone }}</span>
            </div>
          </div>
        </div>

        <!-- Invoice Items -->
        <div class="mb-10">
          <h3 :class="{
            'text-gray-400': selectedTheme === 'classic',
            'text-blue-500': selectedTheme === 'modern',
            'text-yellow-500': selectedTheme === 'elegant'
          }" class="text-sm uppercase font-medium mb-4">Item</h3>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead :class="{
                'border-b border-gray-200': selectedTheme === 'classic',
                'border-b border-blue-300': selectedTheme === 'modern',
                'border-b border-gray-700': selectedTheme === 'elegant'
              }">
                <tr>
                  <th :class="{
                    'text-gray-500': selectedTheme === 'classic',
                    'text-blue-700': selectedTheme === 'modern',
                    'text-gray-300': selectedTheme === 'elegant'
                  }" class="text-left p-3 font-medium">Deskripsi</th>
                  <th :class="{
                    'text-gray-500': selectedTheme === 'classic',
                    'text-blue-700': selectedTheme === 'modern',
                    'text-gray-300': selectedTheme === 'elegant'
                  }" class="text-right p-3 font-medium w-24">Jumlah</th>
                  <th :class="{
                    'text-gray-500': selectedTheme === 'classic',
                    'text-blue-700': selectedTheme === 'modern',
                    'text-gray-300': selectedTheme === 'elegant'
                  }" class="text-right p-3 font-medium w-32">Harga</th>
                  <th :class="{
                    'text-gray-500': selectedTheme === 'classic',
                    'text-blue-700': selectedTheme === 'modern',
                    'text-gray-300': selectedTheme === 'elegant'
                  }" class="text-right p-3 font-medium w-32">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in invoice.items" :key="index" :class="{
                  'border-b border-gray-200': selectedTheme === 'classic',
                  'border-b border-blue-300': selectedTheme === 'modern',
                  'border-b border-gray-700': selectedTheme === 'elegant'
                }">
                  <td class="p-3">{{ item.description }}</td>
                  <td class="p-3 text-right">{{ item.quantity }}</td>
                  <td class="p-3 text-right">{{ formatCurrency(item.unitPrice) }}</td>
                  <td class="p-3 text-right">{{ formatCurrency(item.total) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Invoice Summary -->
          <div class="flex flex-col items-end mt-6">
            <div class="w-full max-w-xs">
              <div class="flex justify-between py-2">
                <span :class="{
                  'text-gray-600': selectedTheme === 'classic',
                  'text-blue-700': selectedTheme === 'modern',
                  'text-gray-300': selectedTheme === 'elegant'
                }">Subtotal:</span>
                <span>{{ formatCurrency(calculateSubtotal()) }}</span>
              </div>
              <div class="flex justify-between py-2">
                <span :class="{
                  'text-gray-600': selectedTheme === 'classic',
                  'text-blue-700': selectedTheme === 'modern',
                  'text-gray-300': selectedTheme === 'elegant'
                }">Pajak ({{ invoice.taxRate }}%):</span>
                <span>{{ formatCurrency(calculateTaxAmount()) }}</span>
              </div>
              <div :class="{
                'border-t border-gray-200': selectedTheme === 'classic',
                'border-t border-blue-300': selectedTheme === 'modern',
                'border-t border-gray-700': selectedTheme === 'elegant'
              }" class="flex justify-between py-3 font-bold text-lg">
                <span>Total:</span>
                <span :class="{
                  'text-gray-900': selectedTheme === 'classic',
                  'text-blue-900': selectedTheme === 'modern',
                  'text-yellow-500': selectedTheme === 'elegant'
                }">{{ formatCurrency(calculateTotal()) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Notes -->
        <div v-if="invoice.notes">
          <h3 :class="{
            'text-gray-400': selectedTheme === 'classic',
            'text-blue-500': selectedTheme === 'modern',
            'text-yellow-500': selectedTheme === 'elegant'
          }" class="text-sm uppercase font-medium mb-2">Catatan</h3>
          <div :class="{
            'bg-gray-50': selectedTheme === 'classic',
            'bg-blue-100': selectedTheme === 'modern',
            'bg-gray-800': selectedTheme === 'elegant'
          }" class="p-3 rounded-md">{{ invoice.notes }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import html2pdf from 'html2pdf.js';
import { invoiceEvents, trackPageView } from '../utils/analytics';

const route = useRoute();
const router = useRouter();
const invoicePrintRef = ref(null);
const isGenerating = ref(false);
const selectedTheme = ref('classic'); // Default theme

// Initialize with empty invoice
const invoice = ref({
  title: '',
  date: '',
  dueDate: '',
  from: {
    name: '',
    address: '',
    email: '',
    phone: ''
  },
  to: {
    name: '',
    address: '',
    email: '',
    phone: ''
  },
  items: [],
  taxRate: 0,
  notes: '',
  logo: null
});

onMounted(() => {
  // Track invoice preview page view
  trackPageView('/invoice/preview', 'Preview Faktur Online - Faktur.web.id');
  
  // Get invoice data from local storage
  const storedInvoice = localStorage.getItem('currentInvoice');
  if (storedInvoice) {
    invoice.value = JSON.parse(storedInvoice);
    
    // Check if there's a saved theme preference
    if (invoice.value._theme) {
      selectedTheme.value = invoice.value._theme;
    }
  } else {
    // Redirect back if no invoice data
    router.push('/invoice/guest');
  }
});

function calculateSubtotal() {
  return invoice.value.items.reduce((sum, item) => sum + (item.total || 0), 0);
}

function calculateTaxAmount() {
  return calculateSubtotal() * (invoice.value.taxRate / 100);
}

function calculateTotal() {
  return calculateSubtotal() + calculateTaxAmount();
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
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

function downloadPDF() {
  if (!invoicePrintRef.value) return;
  
  isGenerating.value = true;

  // Track the download event using the utility
  invoiceEvents.download(invoice.value.title, calculateTotal());

  const options = {
    margin: 10,
    filename: `faktur-${invoice.value.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`,
    image: { 
      type: 'jpeg', 
      quality: 0.98 
    },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: true
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait'
    }
  };

  setTimeout(() => {
    html2pdf()
      .from(invoicePrintRef.value)
      .set(options)
      .save()
      .then(() => {
        isGenerating.value = false;
        
        // Remove the currentInvoice data from localStorage after successful download
        localStorage.removeItem('currentInvoice');
        console.log('Invoice data cleared from localStorage after PDF download');
        
        // Show success message
        alert('PDF berhasil diunduh. Data invoice telah dihapus dari penyimpanan sementara.');
      })
      .catch(error => {
        console.error('Error generating PDF:', error);
        isGenerating.value = false;
        alert('Error generating PDF. Please try again.');
      });
  }, 500);
}

function backToEdit() {
  // Check if the currentInvoice data exists in localStorage
  const storedInvoice = localStorage.getItem('currentInvoice');
  
  if (storedInvoice) {
    try {
      // Parse the current data and update the timestamp
      const currentData = JSON.parse(storedInvoice);
      currentData._lastEdited = new Date().getTime();
      
      // Save the selected theme preference
      currentData._theme = selectedTheme.value;
      
      // Save it back to localStorage
      localStorage.setItem('currentInvoice', JSON.stringify(currentData));
      
      // Track edit event
      invoiceEvents.update(currentData.title || 'Untitled Invoice');
      
      // Navigate back to edit form
      router.push('/invoice/guest');
    } catch (error) {
      console.error('Error processing invoice data:', error);
      alert('Terjadi kesalahan saat kembali ke halaman edit. Mencoba kembali...');
      router.push('/invoice/guest');
    }
  } else {
    // If no invoice data exists, just navigate back
    console.warn('No invoice data found in localStorage, redirecting to empty form');
    router.push('/invoice/guest');
  }
}
</script>

<style scoped>
/* Theme transition effects */
.container, .bg-white, .border, .text-gray-500, .text-gray-400, .text-gray-600, .border-gray-200, .bg-gray-50 {
  transition: all 0.3s ease-in-out;
}
</style> 