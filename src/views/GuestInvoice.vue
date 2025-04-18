<template>
  <div class="min-h-screen py-12">
    <div class="container mx-auto max-w-4xl">
      <!-- Step Timeline -->
      <div class="mb-8 flex justify-center">
        <div class="relative px-4 max-w-md w-full">
          <!-- Step Line -->
          <div class="absolute left-8 right-8 top-4 h-0.5 bg-gray-200 z-0"></div>
          
          <!-- Step Items -->
          <div class="relative z-10 flex justify-between w-full">
            <!-- Step 1: Create -->
            <div class="flex flex-col items-center">
              <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mb-2 ring-4 ring-primary/20 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div class="text-center mt-1">
                <div class="text-xs font-medium text-primary">{{ translations.fillData }}</div>
              </div>
            </div>
            
            <!-- Step 2: Preview -->
            <div class="flex flex-col items-center">
              <div class="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div class="text-center mt-1">
                <div class="text-xs font-medium text-gray-500">{{ translations.chooseTheme }}</div>
              </div>
            </div>
            
            <!-- Step 3: Download -->
            <div class="flex flex-col items-center">
              <div class="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <div class="text-center mt-1">
                <div class="text-xs font-medium text-gray-500">{{ translations.downloadPDF }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mb-2 flex justify-between items-center py-4">
        <div>
          <p class="text-gray-500">
            {{ translations.createInvoiceMessage }}
          </p>
        </div>
        
        <!-- Language Toggle -->
        <div class="inline-flex items-center rounded-md border border-gray-300 overflow-hidden">
          <button
            @click="setLanguage('id')"
            :class="[
              'px-3 py-1.5 text-sm',
              locale === 'id' 
                ? 'bg-primary text-white font-medium' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            ]"
          >
            ID
          </button>
          <button
            @click="setLanguage('en')"
            :class="[
              'px-3 py-1.5 text-sm',
              locale === 'en' 
                ? 'bg-primary text-white font-medium' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            ]"
          >
            EN
          </button>
        </div>
      </div>
    </div>  
    <div class="container mx-auto max-w-4xl">
      <div class="bg-white shadow-lg p-8 rounded-lg border border-gray-200 transform transition-all duration-300 hover:shadow-xl" ref="invoicePrintRef">
        <!-- Invoice Header -->
        <div class="flex flex-col md:flex-row justify-between items-start mb-10">
          <!-- Logo Upload -->
          <div class="w-40 h-40 flex items-center justify-center mb-4 md:mb-0">
            <div v-if="invoice.logo" class="relative w-full h-full">
              <img 
                :src="invoice.logo" 
                alt="Invoice Logo" 
                class="max-w-full max-h-full object-contain"
                @load="handleImageLoad"
              />
              <button 
                @click="removeLogo"
                class="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 no-print"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            <div v-else class="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <label class="cursor-pointer w-full h-full flex flex-col items-center justify-center no-print">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="text-sm text-gray-500">{{ translations.uploadLogo }}</span>
                <input type="file" class="hidden" accept="image/png,image/jpeg" @change="handleLogoUpload" />
              </label>
            </div>
          </div>
          
          <div class="flex-1 md:ml-8">
            <div 
              class="text-3xl font-bold mb-2 focus:outline-none focus:border-b-2 focus:border-green-500 hover:bg-yellow-50 p-1 rounded text-right w-1/4 ml-auto" 
              contenteditable 
              @blur="invoice.title = $event.target.innerText"
            >{{ invoice.title }}</div>
            <div class="flex flex-col space-y-1 items-end">
              <div class="flex items-center">
                <span class="text-gray-500 w-24">{{ translations.date }}:</span>
                <input 
                  type="date" 
                  v-model="invoice.date" 
                  class="border-none p-1 focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50 no-print"
                />
                <span class="print-only">{{ formatDate(invoice.date) }}</span>
              </div>
              <div class="flex items-center">
                <span class="text-gray-500 w-24">{{ translations.dueDate }}:</span>
                <input 
                  type="date" 
                  v-model="invoice.dueDate" 
                  class="border-none p-1 focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50 no-print"
                />
                <span class="print-only">{{ formatDate(invoice.dueDate) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Invoice From/To -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div class="from-details">
            <h3 class="text-gray-400 text-sm uppercase font-medium mb-2">{{ translations.from }}</h3>
            <input 
              v-model="invoice.from.name"
              :placeholder="translations.nameCompanyPlaceholder"
              class="font-semibold text-lg mb-2 w-full border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
            />
            <textarea 
              v-model="invoice.from.address"
              :placeholder="translations.addressPlaceholder"
              class="text-gray-600 w-full min-h-[60px] border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
            ></textarea>
            <div class="flex items-center mb-1">
              <span class="text-gray-400 w-16">{{ translations.email }}:</span>
              <input 
                v-model="invoice.from.email"
                placeholder="email@anda.com"
                class="flex-1 border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
              />
            </div>
            <div class="flex items-center">
              <span class="text-gray-400 w-16">{{ translations.phone }}:</span>
              <input 
                v-model="invoice.from.phone"
                placeholder="(081) 234-5678"
                class="flex-1 border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
              />
            </div>
          </div>
          
          <div class="to-details">
            <h3 class="text-gray-400 text-sm uppercase font-medium mb-2">{{ translations.billTo }}</h3>
            <input 
              v-model="invoice.to.name"
              :placeholder="translations.clientNamePlaceholder"
              class="font-semibold text-lg mb-2 w-full border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
            />
            <textarea 
              v-model="invoice.to.address"
              :placeholder="translations.clientAddressPlaceholder"
              class="text-gray-600 w-full min-h-[60px] border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
            ></textarea>
            <div class="flex items-center mb-1">
              <span class="text-gray-400 w-16">{{ translations.email }}:</span>
              <input 
                v-model="invoice.to.email"
                placeholder="email@klien.com"
                class="flex-1 border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
              />
            </div>
            <div class="flex items-center">
              <span class="text-gray-400 w-16">{{ translations.phone }}:</span>
              <input 
                v-model="invoice.to.phone"
                placeholder="(089) 876-5432"
                class="flex-1 border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
              />
            </div>
          </div>
        </div>

        <!-- Invoice Items -->
        <div class="mb-10">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-gray-400 text-sm uppercase font-medium">{{ translations.items }}</h3>
            <button 
              @click="addItem"
              class="text-primary hover:text-primary/80 text-sm font-medium no-print"
            >
              + {{ translations.addItem }}
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="border-b">
                <tr>
                  <th class="text-left p-3 text-gray-500 font-medium">{{ translations.description }}</th>
                  <th class="text-right p-3 text-gray-500 font-medium w-24">{{ translations.quantity }}</th>
                  <th class="text-right p-3 text-gray-500 font-medium w-32">{{ translations.price }}</th>
                  <th class="text-right p-3 text-gray-500 font-medium w-32">{{ translations.total }}</th>
                  <th class="w-16 no-print"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in invoice.items" :key="index" class="border-b">
                  <td class="p-3">
                    <input 
                      v-model="item.description"
                      :placeholder="translations.itemDescriptionPlaceholder"
                      class="w-full border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
                    />
                  </td>
                  <td class="p-3">
                    <input 
                      type="number" 
                      v-model="item.quantity"
                      min="1"
                      @input="calculateItemTotal(index)"
                      class="w-full text-right border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
                    />
                  </td>
                  <td class="p-3">
                    <input 
                      type="number" 
                      v-model="item.unitPrice"
                      min="0"
                      @input="calculateItemTotal(index)"
                      class="w-full text-right border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
                    />
                  </td>
                  <td class="p-3 text-right">{{ formatCurrency(item.total) }}</td>
                  <td class="p-3 text-center no-print">
                    <button 
                      @click="deleteItem(index)"
                      class="text-red-500 hover:text-red-700"
                      v-if="invoice.items.length > 1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Invoice Summary -->
          <div class="flex flex-col items-end mt-6">
            <div class="w-full max-w-xs">
              <div class="flex justify-between py-2">
                <span class="text-gray-600">{{ translations.subtotal }}:</span>
                <span>{{ formatCurrency(calculateSubtotal()) }}</span>
              </div>
              <div class="flex justify-between py-2 items-center">
                <span class="text-gray-600">{{ translations.taxRate }}:</span>
                <input 
                  type="number" 
                  v-model="invoice.taxRate"
                  min="0"
                  max="100"
                  class="w-20 text-right border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50 no-print"
                />
                <span class="text-gray-600 ml-1 print-only">{{ invoice.taxRate }}%</span>
              </div>
              <div class="flex justify-between py-2">
                <span class="text-gray-600">{{ translations.taxAmount }}:</span>
                <span>{{ formatCurrency(calculateTaxAmount()) }}</span>
              </div>
              <div class="flex justify-between py-3 border-t border-gray-200 font-bold text-lg">
                <span>{{ translations.total }}:</span>
                <span>{{ formatCurrency(calculateTotal()) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Notes -->
        <div>
          <h3 class="text-gray-400 text-sm uppercase font-medium mb-2">{{ translations.notes }}</h3>
          <textarea 
            v-model="invoice.notes"
            :placeholder="translations.notesPlaceholder"
            class="w-full min-h-[100px] p-3 bg-gray-50 rounded-md border-none focus:outline-none focus:ring-1 focus:ring-green-500"
          ></textarea>
        </div>

        <!-- Download Button -->
        <div class="flex justify-end mt-8 space-x-4 no-print">
          <button 
            @click="previewInvoice"
            class="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/80 font-medium"
          >
            {{ translations.preview }}
          </button>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import html2pdf from 'html2pdf.js';
import { useRouter } from 'vue-router';
import { invoiceEvents, trackPageView } from '../utils/analytics';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const invoicePrintRef = ref(null);
const fileInput = ref(null);
const isGenerating = ref(false);

// Setup i18n
const { t, locale } = useI18n();

// Function to switch language
function setLanguage(lang) {
  locale.value = lang;
  localStorage.setItem('preferred_language', lang);
}

// Computed translations that preserve the format we used before
const translations = computed(() => ({
  // UI elements are always in Indonesian
  fillData: t('ui.fillData'),
  chooseTheme: t('ui.chooseTheme'),
  downloadPDF: t('ui.downloadPDF'),
  createInvoiceMessage: t('ui.createInvoiceMessage'),
  preview: t('ui.preview'),
  
  // Invoice content is translated based on selected language
  uploadLogo: t('invoice.uploadLogo'),
  date: t('invoice.date'),
  dueDate: t('invoice.dueDate'),
  from: t('invoice.from'),
  billTo: t('invoice.billTo'),
  items: t('invoice.items'),
  addItem: t('invoice.addItem'),
  description: t('invoice.description'),
  quantity: t('invoice.quantity'),
  price: t('invoice.price'),
  total: t('invoice.total'),
  subtotal: t('invoice.subtotal'),
  taxRate: t('invoice.taxRate'),
  taxAmount: t('invoice.taxAmount'),
  notes: t('invoice.notes'),
  nameCompanyPlaceholder: t('invoice.nameCompanyPlaceholder'),
  addressPlaceholder: t('invoice.addressPlaceholder'),
  email: t('invoice.email'),
  phone: t('invoice.phone'),
  clientNamePlaceholder: t('invoice.clientNamePlaceholder'),
  clientAddressPlaceholder: t('invoice.clientAddressPlaceholder'),
  itemDescriptionPlaceholder: t('invoice.itemDescriptionPlaceholder'),
  notesPlaceholder: t('invoice.notesPlaceholder')
}));

// Default invoice template
const defaultInvoice = {
  title: 'FAKTUR #001',
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
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
  items: [
    {
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    }
  ],
  taxRate: 10,
  notes: '',
  logo: null
};

// Initialize with default values
const invoice = ref({...defaultInvoice});

// Load saved language preference
onMounted(() => {
  // Check for saved language preference
  const savedLanguage = localStorage.getItem('preferred_language');
  if (savedLanguage && ['id', 'en'].includes(savedLanguage)) {
    locale.value = savedLanguage;
  }
  
  // Track guest invoice page view
  trackPageView('/invoice/guest', 'Buat Faktur Tanpa Daftar - Faktur.web.id');
  
  const savedInvoice = localStorage.getItem('currentInvoice');
  if (savedInvoice) {
    try {
      const parsedInvoice = JSON.parse(savedInvoice);
      // Copy saved values to invoice
      invoice.value = parsedInvoice;
      
      // Recalculate item totals to ensure they're correct
      invoice.value.items.forEach((item, index) => {
        calculateItemTotal(index);
      });
    } catch (error) {
      console.error('Error loading saved invoice:', error);
      // If error loading, use defaults
    }
  }
});

function calculateItemTotal(index) {
  const item = invoice.value.items[index];
  item.total = item.quantity * item.unitPrice;
}

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

function addItem() {
  invoice.value.items.push({
    description: '',
    quantity: 1,
    unitPrice: 0,
    total: 0
  });
}

function deleteItem(index) {
  if (invoice.value.items.length > 1) {
    invoice.value.items.splice(index, 1);
  }
}

function handleLogoUpload(event) {
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

  const reader = new FileReader();
  reader.onload = (e) => {
    invoice.value.logo = e.target.result;
  };
  reader.readAsDataURL(file);
}

function removeLogo() {
  invoice.value.logo = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
}

function previewInvoice() {
  // Make sure we're saving the language preference in localStorage
  invoice.value._language = locale.value;
  
  // Save current invoice data to localStorage
  localStorage.setItem('currentInvoice', JSON.stringify(invoice.value));
  
  // Navigate to the preview page
  router.push('/invoice/preview');
}

function downloadPDF() {
  if (!invoicePrintRef.value) return;
  
  isGenerating.value = true;

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
        
        // Track PDF download event using our utility
        invoiceEvents.download(invoice.value.title, calculateTotal());
      })
      .catch(error => {
        console.error('Error generating PDF:', error);
        isGenerating.value = false;
        alert('Error generating PDF. Please try again.');
      });
  }, 500);
}

// Basic validation for navigation
const isFormIncomplete = computed(() => {
  return (
    !invoice.value.title ||
    !invoice.value.from.name ||
    !invoice.value.to.name ||
    invoice.value.items.some(item => !item.description || !item.quantity || !item.unitPrice)
  );
});
</script>

<style scoped>
.no-print {
  @media print {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    position: absolute !important;
    pointer-events: none !important;
  }
}

.print-only {
  display: none;
}

@media print {
  .print-only {
    display: inline !important;
  }
  
  button.no-print {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    position: absolute !important;
    pointer-events: none !important;
  }
}
</style> 