<template>
  <div class="container mx-auto py-8 max-w-4xl">
    <div class="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 py-8">
          {{ isEditMode ? 'Edit Faktur' : 'Buat Faktur Baru' }}
        </h1>
        <p class="text-gray-500">
          {{ isEditMode ? 'Edit detail faktur Anda' : 'Buat faktur baru untuk klien Anda' }}
        </p>
      </div>
    </div>
    
    <div v-if="error" class="my-4 p-4 bg-red-50 text-red-500 rounded-md">
      {{ error }}
    </div>
    
    <div v-if="isGuestMode" class="my-4 p-4 bg-yellow-200 text-gray-800 rounded-md flex items-start">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div>
        <p class="font-medium">Anda menggunakan FAKTUR.web.id tanpa akun</p>
        <p class="mt-1">Anda dapat membuat dan mengunduh faktur ini, tapi tidak akan tersimpan. <router-link to="/register" class="underline font-medium">Buat akun</router-link> untuk menyimpan faktur dan mengaksesnya kapan saja.</p>
      </div>
    </div>
    
    <div class="bg-white shadow-sm p-8">
      <!-- Invoice Header -->
      <div class="flex flex-col md:flex-row justify-between mb-10">
        <div class="invoice-branding mb-6 md:mb-0">
          <h2 
            class="text-3xl font-bold mb-2 focus:outline-none focus:border-b-2 focus:border-green-500 hover:bg-yellow-50 p-1 rounded" 
            contenteditable 
            @blur="invoice.title = $event.target.innerText"
            @focus="selectElementContents($event.target)"
          >{{ invoice.title }}</h2>
          <div class="flex flex-col space-y-1">
            <div class="flex items-center">
              <span class="text-gray-500 w-24">Tanggal:</span>
              <input 
                type="date" 
                v-model="invoice.date" 
                class="border-none p-1 focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
              />
            </div>
            <div class="flex items-center">
              <span class="text-gray-500 w-24">Jatuh Tempo:</span>
              <input 
                type="date" 
                v-model="invoice.dueDate" 
                class="border-none p-1 focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
              />
            </div>
          </div>
        </div>
        <div class="invoice-logo flex flex-col items-end">
          <div class="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
            <template v-if="invoice.logo">
              <img :src="invoice.logo" alt="Logo" class="w-full h-full object-contain" />
              <button 
                @click="removeLogo" 
                class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </template>
            <template v-else>
              <input
                type="file"
                ref="fileInput"
                @change="handleLogoUpload"
                accept=".png,.jpg,.jpeg"
                class="hidden"
              />
              <button 
                @click="$refs.fileInput.click()"
                class="text-gray-500 hover:text-gray-700 flex flex-col items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="text-sm">Upload Logo</span>
                <span class="text-xs text-gray-400 mt-1">PNG, JPG (max 2MB)</span>
              </button>
            </template>
          </div>
        </div>
      </div>
      
      <!-- Invoice From/To -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div class="from-details">
          <h3 class="text-gray-400 text-sm uppercase font-medium mb-2">Dari</h3>
          <div 
            class="font-semibold text-lg mb-2 focus:outline-none focus:border-b-2 focus:border-green-500 hover:bg-yellow-50 p-1 rounded" 
            contenteditable 
            @blur="invoice.from.name = $event.target.innerText"
            @focus="selectElementContents($event.target)"
          >{{ invoice.from.name }}</div>
          <div 
            class="text-gray-600 whitespace-pre-line mb-2 focus:outline-none focus:border-b-2 focus:border-green-500 hover:bg-yellow-50 p-1 rounded" 
            contenteditable 
            @blur="invoice.from.address = $event.target.innerText"
            @focus="selectElementContents($event.target)"
          >{{ invoice.from.address }}</div>
          <div class="flex items-center mb-1">
            <span class="text-gray-400 w-16">Email:</span>
            <div 
              class="focus:outline-none focus:border-b-2 focus:border-green-500 hover:bg-yellow-50 p-1 rounded" 
              contenteditable 
              @blur="invoice.from.email = $event.target.innerText"
              @focus="selectElementContents($event.target)"
            >{{ invoice.from.email }}</div>
          </div>
          <div class="flex items-center">
            <span class="text-gray-400 w-16">Telepon:</span>
            <div 
              class="focus:outline-none focus:border-b-2 focus:border-green-500 hover:bg-yellow-50 p-1 rounded" 
              contenteditable 
              @blur="invoice.from.phone = $event.target.innerText"
              @focus="selectElementContents($event.target)"
            >{{ invoice.from.phone }}</div>
          </div>
        </div>
        
        <div class="to-details">
          <h3 class="text-gray-400 text-sm uppercase font-medium mb-2">Tagihan Untuk</h3>
          <div 
            class="font-semibold text-lg mb-2 focus:outline-none focus:border-b-2 focus:border-green-500 hover:bg-yellow-50 p-1 rounded" 
            contenteditable 
            @blur="invoice.to.name = $event.target.innerText"
            @focus="selectElementContents($event.target)"
          >{{ invoice.to.name }}</div>
          <div 
            class="text-gray-600 whitespace-pre-line mb-2 focus:outline-none focus:border-b-2 focus:border-green-500 hover:bg-yellow-50 p-1 rounded" 
            contenteditable 
            @blur="invoice.to.address = $event.target.innerText"
            @focus="selectElementContents($event.target)"
          >{{ invoice.to.address }}</div>
          <div class="flex items-center mb-1">
            <span class="text-gray-400 w-16">Email:</span>
            <div 
              class="focus:outline-none focus:border-b-2 focus:border-green-500 hover:bg-yellow-50 p-1 rounded" 
              contenteditable 
              @blur="invoice.to.email = $event.target.innerText"
              @focus="selectElementContents($event.target)"
            >{{ invoice.to.email }}</div>
          </div>
          <div class="flex items-center">
            <span class="text-gray-400 w-16">Telepon:</span>
            <div 
              class="focus:outline-none focus:border-b-2 focus:border-green-500 hover:bg-yellow-50 p-1 rounded" 
              contenteditable 
              @blur="invoice.to.phone = $event.target.innerText"
              @focus="selectElementContents($event.target)"
            >{{ invoice.to.phone }}</div>
          </div>
        </div>
      </div>
      
      <!-- Invoice Items -->
      <div class="mb-10">
        <h3 class="text-gray-400 text-sm uppercase font-medium mb-4">Item</h3>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="border-b">
              <tr>
                <th class="text-left p-3 text-gray-500 font-medium">Deskripsi</th>
                <th class="text-right p-3 text-gray-500 font-medium">Jumlah</th>
                <th class="text-right p-3 text-gray-500 font-medium">Harga</th>
                <th class="text-right p-3 text-gray-500 font-medium">Total</th>
                <th class="p-3 w-10"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in invoice.items" :key="index" class="border-b hover:bg-yellow-50">
                <td class="p-3">
                  <div 
                    class="focus:outline-none focus:ring-1 focus:ring-green-500 p-1 rounded" 
                    contenteditable 
                    @blur="updateItemDescription(index, $event)"
                    @focus="selectElementContents($event.target)"
                  >{{ item.description }}</div>
                </td>
                <td class="p-3">
                  <div 
                    class="focus:outline-none focus:ring-1 focus:ring-green-500 p-1 rounded text-right" 
                    contenteditable 
                    @blur="updateItemQuantity(index, $event)"
                    @focus="selectElementContents($event.target)"
                  >{{ item.quantity }}</div>
                </td>
                <td class="p-3">
                  <div 
                    class="focus:outline-none focus:ring-1 focus:ring-green-500 p-1 rounded text-right" 
                    contenteditable 
                    @blur="updateItemPrice(index, $event)"
                    @focus="selectElementContents($event.target)"
                  >{{ formatNumber(item.unitPrice) }}</div>
                </td>
                <td class="p-3 text-right">{{ formatCurrency(item.total) }}</td>
                <td class="p-3">
                  <button @click="deleteItem(index)" class="text-red-500 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="mt-4">
          <button 
            @click="addItem" 
            class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium py-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Item
          </button>
        </div>
        
        <!-- Invoice Summary -->
        <div class="flex flex-col items-end mt-6">
          <div class="w-full max-w-xs">
            <div class="flex justify-between py-2">
              <span class="text-gray-600">Subtotal:</span>
              <span>{{ formatCurrency(calculateSubtotal()) }}</span>
            </div>
            <div class="flex justify-between py-2 items-center">
              <span class="text-gray-600">PPN:</span>
              <div class="flex items-center">
                <div 
                  class="focus:outline-none focus:ring-1 focus:ring-green-500 p-1 rounded w-16 text-right" 
                  contenteditable 
                  @blur="updateTaxRate($event)"
                  @focus="selectElementContents($event.target)"
                >{{ invoice.taxRate }}</div>
                <span class="ml-1">%</span>
              </div>
            </div>
            <div class="flex justify-between py-2">
              <span class="text-gray-600">Pajak:</span>
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
        <div 
          class="p-3 bg-gray-50 rounded-md min-h-[100px] focus:outline-none focus:ring-1 focus:ring-green-500" 
          contenteditable 
          @blur="invoice.notes = $event.target.innerText"
          @focus="selectElementContents($event.target)"
        >{{ invoice.notes }}</div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-8 flex justify-end gap-3">
        <Button 
          variant="outline" 
          @click="goBack"
        >
          Batal
        </Button>
        <Button 
          v-if="isGuestMode"
          @click="downloadPDF"
        >
          Unduh PDF
        </Button>
        <Button 
          v-else
          :loading="isLoading" 
          @click="saveInvoice"
        >
          {{ isEditMode ? 'Perbarui Faktur' : 'Simpan Faktur' }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useInvoiceStore } from '../stores/invoice';
import { useAuthStore } from '../stores/auth';
import Button from '../components/ui/Button.vue';
import html2pdf from 'html2pdf.js';
import { uploadLogo, deleteLogo } from '../lib/supabase';

const router = useRouter();
const route = useRoute();
const invoiceStore = useInvoiceStore();
const authStore = useAuthStore();
const invoicePrintRef = ref(null);
const fileInput = ref(null);
const isUploading = ref(false);

const isLoading = computed(() => invoiceStore.isLoading);
const error = computed(() => invoiceStore.error);
const invoiceId = computed(() => route.params.id);
const isEditMode = computed(() => !!invoiceId.value);
const invoice = computed(() => invoiceStore.currentInvoice);
const isGuestMode = computed(() => route.params.guestMode || false);

onMounted(async () => {
  if (isEditMode.value) {
    try {
      await invoiceStore.getInvoice(invoiceId.value);
    } catch (err) {
      router.push('/invoices');
    }
  } else {
    invoiceStore.resetInvoice();
    
    // Set guest mode if accessing from route with guestMode param
    if (route.params.guestMode) {
      invoiceStore.setGuestMode(true);
    }
  }
});

// Helper functions for contenteditable fields
function selectElementContents(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

function updateItemDescription(index, event) {
  invoice.value.items[index].description = event.target.innerText;
}

function updateItemQuantity(index, event) {
  const qty = parseInt(event.target.innerText) || 0;
  invoice.value.items[index].quantity = qty;
  calculateItemTotal(index);
}

function updateItemPrice(index, event) {
  const price = parseFloat(event.target.innerText.replace(/[^0-9.-]+/g, '')) || 0;
  invoice.value.items[index].unitPrice = price;
  calculateItemTotal(index);
}

function updateTaxRate(event) {
  invoice.value.taxRate = parseFloat(event.target.innerText) || 0;
}

function calculateItemTotal(index) {
  const item = invoice.value.items[index];
  item.total = item.quantity * item.unitPrice;
}

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

function formatNumber(value) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

function addItem() {
  invoice.value.items.push({
    description: 'Item baru',
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

// Add download function
function downloadPDF() {
  // Create a temporary wrapper div
  const printWrapper = document.createElement('div');
  printWrapper.className = 'print-wrapper';
  printWrapper.appendChild(document.querySelector('.bg-white.rounded-lg').cloneNode(true));
  document.body.appendChild(printWrapper);
  
  // Configure html2pdf
  const options = {
    margin: 10,
    filename: `faktur-${invoice.value.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  // Generate PDF
  html2pdf().from(printWrapper).set(options).save().then(() => {
    // Remove the temporary element after PDF generation
    document.body.removeChild(printWrapper);
  });
}

async function saveInvoice() {
  try {
    if (isGuestMode.value) {
      // In guest mode, just download the PDF
      downloadPDF();
      return;
    }
    
    if (isEditMode.value) {
      await invoiceStore.updateInvoice(invoiceId.value);
      router.push(`/invoices/${invoiceId.value}`);
    } else {
      const newInvoiceId = await invoiceStore.saveInvoice();
      if (newInvoiceId === 'guest-mode') {
        // If in guest mode, don't redirect
        alert('Faktur telah dibuat. Anda dapat mengunduhnya sebagai PDF.');
      } else {
        router.push(`/invoices/${newInvoiceId}`);
      }
    }
  } catch (err) {
    console.error('Error menyimpan faktur:', err);
  }
}

function goBack() {
  if (isEditMode.value) {
    router.push(`/invoices/${invoiceId.value}`);
  } else {
    router.push('/invoices');
  }
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
    isUploading.value = true;
    const userId = authStore.user?.id;
    
    if (!userId && !isGuestMode.value) {
      throw new Error('User not authenticated');
    }

    if (isGuestMode.value) {
      // Handle guest mode - just show preview
      const reader = new FileReader();
      reader.onload = (e) => {
        invoice.value.logo = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      // Upload to Supabase and get public URL
      const publicUrl = await uploadLogo(file, userId);
      invoice.value.logo = publicUrl;
    }
  } catch (error) {
    console.error('Error uploading logo:', error);
    alert('Failed to upload logo. Please try again.');
  } finally {
    isUploading.value = false;
    if (fileInput.value) {
      fileInput.value.value = ''; // Reset file input
    }
  }
}

async function removeLogo() {
  try {
    if (!isGuestMode.value && invoice.value.logo) {
      const userId = authStore.user?.id;
      // Extract file path from URL
      const url = new URL(invoice.value.logo);
      const filePath = url.pathname.split('/').pop();
      await deleteLogo(filePath, userId);
    }
    invoice.value.logo = null;
  } catch (error) {
    console.error('Error removing logo:', error);
    alert('Failed to remove logo. Please try again.');
  }
}
</script>

<style scoped>
[contenteditable] {
  -webkit-user-select: text;
  user-select: text;
}

[contenteditable]:focus {
  cursor: text;
}

[contenteditable]:empty:before {
  content: attr(placeholder);
  color: #aaa;
  cursor: text;
}
</style> 