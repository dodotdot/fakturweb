<template>
  <div class="min-h-screen py-12">
    <div class="container mx-auto max-w-4xl">
      <div class="mb-6 flex justify-between items-center py-8">
        <div>
          <p class="text-gray-500">
            Buat dan unduh faktur sekali pakai tanpa perlu mendaftar
          </p>
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
                <span class="text-sm text-gray-500">Unggah Logo</span>
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
                <span class="text-gray-500 w-24">Tanggal:</span>
                <input 
                  type="date" 
                  v-model="invoice.date" 
                  class="border-none p-1 focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50 no-print"
                />
                <span class="print-only">{{ formatDate(invoice.date) }}</span>
              </div>
              <div class="flex items-center">
                <span class="text-gray-500 w-24">Jatuh Tempo:</span>
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
            <h3 class="text-gray-400 text-sm uppercase font-medium mb-2">Dari</h3>
            <input 
              v-model="invoice.from.name"
              placeholder="Nama Anda / Perusahaan"
              class="font-semibold text-lg mb-2 w-full border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
            />
            <textarea 
              v-model="invoice.from.address"
              placeholder="Alamat Anda"
              class="text-gray-600 w-full min-h-[60px] border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
            ></textarea>
            <div class="flex items-center mb-1">
              <span class="text-gray-400 w-16">Email:</span>
              <input 
                v-model="invoice.from.email"
                placeholder="email@anda.com"
                class="flex-1 border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
              />
            </div>
            <div class="flex items-center">
              <span class="text-gray-400 w-16">Telepon:</span>
              <input 
                v-model="invoice.from.phone"
                placeholder="(081) 234-5678"
                class="flex-1 border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
              />
            </div>
          </div>
          
          <div class="to-details">
            <h3 class="text-gray-400 text-sm uppercase font-medium mb-2">Tagih Kepada</h3>
            <input 
              v-model="invoice.to.name"
              placeholder="Nama Klien"
              class="font-semibold text-lg mb-2 w-full border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
            />
            <textarea 
              v-model="invoice.to.address"
              placeholder="Alamat Klien"
              class="text-gray-600 w-full min-h-[60px] border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
            ></textarea>
            <div class="flex items-center mb-1">
              <span class="text-gray-400 w-16">Email:</span>
              <input 
                v-model="invoice.to.email"
                placeholder="email@klien.com"
                class="flex-1 border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
              />
            </div>
            <div class="flex items-center">
              <span class="text-gray-400 w-16">Telepon:</span>
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
            <h3 class="text-gray-400 text-sm uppercase font-medium">Item</h3>
            <button 
              @click="addItem"
              class="text-primary hover:text-primary/80 text-sm font-medium no-print"
            >
              + Tambah Item
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="border-b">
                <tr>
                  <th class="text-left p-3 text-gray-500 font-medium">Deskripsi</th>
                  <th class="text-right p-3 text-gray-500 font-medium w-24">Jumlah</th>
                  <th class="text-right p-3 text-gray-500 font-medium w-32">Harga</th>
                  <th class="text-right p-3 text-gray-500 font-medium w-32">Total</th>
                  <th class="w-16 no-print"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in invoice.items" :key="index" class="border-b">
                  <td class="p-3">
                    <input 
                      v-model="item.description"
                      placeholder="Deskripsi item"
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
                <span class="text-gray-600">Subtotal:</span>
                <span>{{ formatCurrency(calculateSubtotal()) }}</span>
              </div>
              <div class="flex justify-between py-2 items-center">
                <span class="text-gray-600">Persentase Pajak:</span>
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
                <span class="text-gray-600">Jumlah Pajak:</span>
                <span>{{ formatCurrency(calculateTaxAmount()) }}</span>
              </div>
              <div class="flex justify-between py-3 border-t border-gray-200 font-bold text-lg">
                <span>Total:</span>
                <span>{{ formatCurrency(calculateTotal()) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Notes -->
        <div>
          <h3 class="text-gray-400 text-sm uppercase font-medium mb-2">Catatan</h3>
          <textarea 
            v-model="invoice.notes"
            placeholder="Tambahkan catatan atau syarat pembayaran..."
            class="w-full min-h-[100px] p-3 bg-gray-50 rounded-md border-none focus:outline-none focus:ring-1 focus:ring-green-500"
          ></textarea>
        </div>

        <!-- Download Button -->
        <div class="flex justify-end mt-8 space-x-4 no-print">
          <button 
            @click="previewInvoice"
            class="px-6 py-3 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 font-medium"
          >
            Preview
          </button>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import html2pdf from 'html2pdf.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const invoicePrintRef = ref(null);
const fileInput = ref(null);
const isGenerating = ref(false);

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

// Load saved data if available
onMounted(() => {
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
  // Save current invoice data to localStorage
  localStorage.setItem('currentInvoice', JSON.stringify(invoice.value));
  
  // Navigate to the preview page
  router.push('/invoice-preview');
}
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