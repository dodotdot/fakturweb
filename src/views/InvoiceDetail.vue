<template>
  <div class="min-h-screen">
    <div class="container mx-auto max-w-4xl">
      <!-- Breadcrumb -->
      <Breadcrumb :breadcrumbItems="[
        { text: 'Dashboard', to: '/dashboard' },
        { text: 'Invoices', to: '/invoice' },
        { text: invoice?.title || 'Invoice Details' }
      ]" class="mb-4" />
      
      <div class="bg-white shadow-lg p-8 rounded-lg border border-gray-200 transform transition-all duration-300 hover:shadow-xl">
        <div class="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 py-8 no-print">
              Invoice Details
            </h1>
            <p class="text-gray-500 no-print">
              View and download your invoice
            </p>
          </div>
          <div class="flex gap-3 no-print">
            <router-link 
              :to="`/invoice/${invoiceId}/edit`" 
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Edit
            </router-link>
            <button 
              @click="shareInvoice" 
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              v-tooltip="'Share Invoice'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <button 
              @click="downloadPDF"
              class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-70"
              :disabled="isPrinting"
            >
              {{ isPrinting ? 'Generating PDF...' : 'Download PDF' }}
            </button>
          </div>
        </div>
        
        <!-- Share Invoice Modal -->
        <div v-if="showShareModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 no-print">
          <div class="bg-white rounded-lg p-6 w-full max-w-md">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium">Share Invoice</h3>
              <button @click="showShareModal = false" class="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div v-if="isGeneratingShareLink" class="flex justify-center my-8">
              <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
            
            <div v-else-if="shareError" class="text-red-500 mb-4">
              {{ shareError }}
            </div>
            
            <div v-else>
              <p class="mb-4 text-gray-600">Share this invoice with anyone using this link. No login required to view.</p>
              
              <div class="flex items-center border border-gray-300 rounded-md overflow-hidden mb-4">
                <input
                  ref="shareLinkInput"
                  type="text"
                  readonly
                  :value="shareLink"
                  class="w-full px-3 py-2 focus:outline-none text-sm"
                />
                <button
                  @click="copyShareLink"
                  class="bg-gray-100 text-gray-700 px-3 py-2 hover:bg-gray-200 border-l border-gray-300"
                >
                  <svg v-if="linkCopied" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="flex justify-end space-x-3 mt-6">
              <button
                @click="showShareModal = false"
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
        
        <!-- Theme Selector -->
        <div class="mb-6 no-print">
          <h3 class="text-lg font-semibold mb-3">Pilih Tema</h3>
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
        
        <div v-if="error" class="my-4 p-4 bg-red-50 text-red-500 rounded-md no-print">
          {{ error }}
        </div>
        
        <div v-if="isLoading" class="flex justify-center my-8 no-print">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
        
        <div 
          v-else 
          :class="[
            'rounded-lg shadow-sm p-8 border',
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
            <!-- Logo Display -->
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
                  'w-full h-full flex items-center justify-center border-2 border-dashed rounded-lg',
                  {
                    'border-gray-300': selectedTheme === 'classic',
                    'border-blue-300': selectedTheme === 'modern',
                    'border-gray-700': selectedTheme === 'elegant'
                  }
                ]"
              >
                <div class="text-center" :class="{
                  'text-gray-400': selectedTheme === 'classic',
                  'text-blue-400': selectedTheme === 'modern',
                  'text-gray-500': selectedTheme === 'elegant'
                }">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-sm">No Logo</span>
                </div>
              </div>
            </div>
            
            <div class="flex-1 md:ml-8">
              <h2 
                :class="[
                  'text-3xl font-bold mb-2 text-right',
                  {
                    'text-gray-800': selectedTheme === 'classic',
                    'text-blue-800': selectedTheme === 'modern',
                    'text-yellow-500': selectedTheme === 'elegant'
                  }
                ]"
              >{{ invoice.title }}</h2>
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
              }" class="text-sm uppercase font-medium mb-2">From</h3>
              <div :class="{
                'text-gray-900': selectedTheme === 'classic',
                'text-blue-900': selectedTheme === 'modern',
                'text-white': selectedTheme === 'elegant'
              }" class="font-semibold text-lg mb-2">{{ invoice.from?.name }}</div>
              <div :class="{
                'text-gray-600': selectedTheme === 'classic',
                'text-blue-700': selectedTheme === 'modern',
                'text-gray-300': selectedTheme === 'elegant'
              }" class="whitespace-pre-line mb-2">{{ invoice.from?.address }}</div>
              <div class="flex items-center mb-1">
                <span :class="{
                  'text-gray-400': selectedTheme === 'classic',
                  'text-blue-500': selectedTheme === 'modern',
                  'text-gray-400': selectedTheme === 'elegant'
                }" class="w-16">Email:</span>
                <div>{{ invoice.from?.email }}</div>
              </div>
              <div class="flex items-center">
                <span :class="{
                  'text-gray-400': selectedTheme === 'classic',
                  'text-blue-500': selectedTheme === 'modern',
                  'text-gray-400': selectedTheme === 'elegant'
                }" class="w-16">Phone:</span>
                <div>{{ invoice.from?.phone }}</div>
              </div>
            </div>
            
            <div class="to-details">
              <h3 :class="{
                'text-gray-400': selectedTheme === 'classic',
                'text-blue-500': selectedTheme === 'modern',
                'text-yellow-500': selectedTheme === 'elegant'
              }" class="text-sm uppercase font-medium mb-2">Bill To</h3>
              <div :class="{
                'text-gray-900': selectedTheme === 'classic',
                'text-blue-900': selectedTheme === 'modern',
                'text-white': selectedTheme === 'elegant'
              }" class="font-semibold text-lg mb-2">{{ invoice.to?.name }}</div>
              <div :class="{
                'text-gray-600': selectedTheme === 'classic',
                'text-blue-700': selectedTheme === 'modern',
                'text-gray-300': selectedTheme === 'elegant'
              }" class="whitespace-pre-line mb-2">{{ invoice.to?.address }}</div>
              <div class="flex items-center mb-1">
                <span :class="{
                  'text-gray-400': selectedTheme === 'classic',
                  'text-blue-500': selectedTheme === 'modern',
                  'text-gray-400': selectedTheme === 'elegant'
                }" class="w-16">Email:</span>
                <div>{{ invoice.to?.email }}</div>
              </div>
              <div class="flex items-center">
                <span :class="{
                  'text-gray-400': selectedTheme === 'classic',
                  'text-blue-500': selectedTheme === 'modern',
                  'text-gray-400': selectedTheme === 'elegant'
                }" class="w-16">Phone:</span>
                <div>{{ invoice.to?.phone }}</div>
              </div>
            </div>
          </div>
          
          <!-- Invoice Items -->
          <div class="mb-10">
            <h3 :class="{
              'text-gray-400': selectedTheme === 'classic',
              'text-blue-500': selectedTheme === 'modern',
              'text-yellow-500': selectedTheme === 'elegant'
            }" class="text-sm uppercase font-medium mb-4">Items</h3>
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
                    }" class="text-left p-3 font-medium">Description</th>
                    <th :class="{
                      'text-gray-500': selectedTheme === 'classic',
                      'text-blue-700': selectedTheme === 'modern',
                      'text-gray-300': selectedTheme === 'elegant'
                    }" class="text-right p-3 font-medium">Qty</th>
                    <th :class="{
                      'text-gray-500': selectedTheme === 'classic',
                      'text-blue-700': selectedTheme === 'modern',
                      'text-gray-300': selectedTheme === 'elegant'
                    }" class="text-right p-3 font-medium">Price</th>
                    <th :class="{
                      'text-gray-500': selectedTheme === 'classic',
                      'text-blue-700': selectedTheme === 'modern',
                      'text-gray-300': selectedTheme === 'elegant'
                    }" class="text-right p-3 font-medium">Amount</th>
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
                  }">Tax ({{ invoice.taxRate }}%):</span>
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
            }" class="text-sm uppercase font-medium mb-2">Notes</h3>
            <div :class="{
              'bg-gray-50': selectedTheme === 'classic',
              'bg-blue-100': selectedTheme === 'modern',
              'bg-gray-800': selectedTheme === 'elegant'
            }" class="p-3 rounded-md">
              {{ invoice.notes }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useInvoiceStore } from '../stores/invoice';
import { useAuthStore } from '../stores/auth';
import { uploadLogo, deleteLogo } from '../lib/supabase';
import html2pdf from 'html2pdf.js';
import Breadcrumb from '../components/ui/Breadcrumb.vue';

const router = useRouter();
const route = useRoute();
const invoiceStore = useInvoiceStore();
const authStore = useAuthStore();
const invoicePrintRef = ref(null);
const fileInput = ref(null);
const isLoading = ref(true);
const error = ref('');
const isPrinting = ref(false);
const selectedTheme = ref('classic'); // Default theme
const invoiceId = computed(() => route.params.id);
const invoice = computed(() => invoiceStore.currentInvoice);
const showShareModal = ref(false);
const isGeneratingShareLink = ref(false);
const shareError = ref('');
const shareLink = ref('');
const linkCopied = ref(false);
const shareLinkInput = ref(null);

onMounted(async () => {
  try {
    await invoiceStore.getInvoice(invoiceId.value);
    
    // Check if there's a saved theme preference
    if (invoice.value && invoice.value._theme) {
      selectedTheme.value = invoice.value._theme;
    }
  } catch (err) {
    error.value = "Failed to load invoice. Please try again.";
    console.error('Error fetching invoice:', err);
  } finally {
    isLoading.value = false;
  }
});

// Save selectedTheme to invoice when it changes
watch(selectedTheme, async (newTheme) => {
  if (invoice.value && !isLoading.value) {
    try {
      await invoiceStore.updateInvoice({
        ...invoice.value,
        _theme: newTheme
      });
    } catch (err) {
      console.error('Error saving theme preference:', err);
    }
  }
});

function calculateSubtotal() {
  return invoice.value.items.reduce((sum, item) => sum + item.total, 0);
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
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

async function handleLogoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file type
  if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
    alert('Please upload only PNG or JPG images');
    return;
  }

  // Validate file size (2MB)
  if (file.size > 2 * 1024 * 1024) {
    alert('File size should not exceed 2MB');
    return;
  }

  try {
    const userId = authStore.user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }

    isLoading.value = true;
    const publicUrl = await uploadLogo(file, userId);
    
    // Update invoice with new logo
    const updatedInvoice = {
      ...invoice.value,
      logo: publicUrl
    };
    await invoiceStore.updateInvoice(updatedInvoice);

  } catch (error) {
    console.error('Error uploading logo:', error);
    alert('Failed to upload logo. Please try again.');
  } finally {
    isLoading.value = false;
    if (fileInput.value) {
      fileInput.value.value = ''; // Reset file input
    }
  }
}

async function removeLogo() {
  try {
    const userId = authStore.user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }

    isLoading.value = true;
    
    if (invoice.value.logo) {
      // Extract file path from URL
      const url = new URL(invoice.value.logo);
      const filePath = url.pathname.split('/').pop();
      await deleteLogo(filePath, userId);
    }

    // Update invoice without logo
    await invoiceStore.updateInvoice({
      ...invoice.value,
      logo: null
    });

  } catch (error) {
    console.error('Error removing logo:', error);
    alert('Failed to remove logo. Please try again.');
  } finally {
    isLoading.value = false;
  }
}

const downloadPDF = async () => {
  if (!invoice.value || !invoicePrintRef.value) {
    alert('Invoice content is not ready. Please try again.');
    return;
  }

  isPrinting.value = true;

  try {
    // Create a temporary wrapper
    const printWrapper = document.createElement('div');
    printWrapper.className = 'pdf-content-wrapper';
    document.body.appendChild(printWrapper);
    
    // Clone the invoice content
    const contentClone = invoicePrintRef.value.cloneNode(true);
    
    // Remove any no-print elements from the clone
    const noPrintElements = contentClone.querySelectorAll('.no-print');
    noPrintElements.forEach(el => el.remove());
    
    // Add the cloned content to the wrapper
    printWrapper.appendChild(contentClone);
    
    // Configure html2pdf options
    const options = {
      margin: 10,
      filename: `invoice-${invoice.value.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`,
      image: { 
        type: 'jpeg', 
        quality: 0.98 
      },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: true, // Enable logging for debugging
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait'
      }
    };

    // Generate PDF from the clone
    await html2pdf()
      .from(printWrapper)
      .set(options)
      .save();
    
    // Clean up
    document.body.removeChild(printWrapper);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  } finally {
    isPrinting.value = false;
  }
};

const shareInvoice = async () => {
  if (!invoice.value) {
    alert('Invoice is not loaded');
    return;
  }

  showShareModal.value = true;
  isGeneratingShareLink.value = true;
  shareError.value = '';
  linkCopied.value = false;

  try {
    // Generate share link
    const url = await invoiceStore.generateShareLink(invoiceId.value);
    shareLink.value = url;
  } catch (err) {
    console.error('Error generating share link:', err);
    shareError.value = 'Failed to generate share link. Please try again.';
  } finally {
    isGeneratingShareLink.value = false;
  }
};

const copyShareLink = () => {
  if (shareLinkInput.value) {
    shareLinkInput.value.select();
    document.execCommand('copy');
    linkCopied.value = true;
    
    // Reset copied status after 3 seconds
    setTimeout(() => {
      linkCopied.value = false;
    }, 3000);
  }
};
</script>

<style scoped>
@media print {
  .no-print {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    position: absolute !important;
    pointer-events: none !important;
  }
  
  /* Ensure proper page breaks and background colors */
  @page {
    size: A4;
    margin: 0;
  }
  
  body {
    margin: 0;
    padding: 0;
    background-color: white !important;
  }
  
  /* Force background colors to show in PDF */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}

/* Class added to the PDF wrapper element */
:global(.pdf-content-wrapper) {
  background-color: white !important;
  color: black !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
}

/* Ensure SVG and images are properly rendered */
img, svg {
  max-width: 100%;
  height: auto;
}

/* Make sure table cells have consistent widths in PDF */
table {
  table-layout: fixed;
  width: 100%;
}
</style> 