<template>
  <div class="container mx-auto max-w-4xl ">
    <div class="mb-6 flex justify-between items-center py-8 ">
      <div>
        <p class="text-gray-500">
          Create and download a one-time invoice without signing up
        </p>
      </div>
      <div class="flex gap-3">
        <button 
          @click="downloadPDF"
          class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          :disabled="isGenerating"
        >
          {{ isGenerating ? 'Generating...' : 'Download PDF' }}
        </button>
      </div>
    </div>
  </div>  
  <div class="container mx-auto max-w-4xl bg-gray-50">
  
    <div class="bg-white shadow-sm p-8 border border-gray-100" ref="invoicePrintRef">
      <!-- Invoice Header -->
      <div class="flex flex-col md:flex-row justify-between items-start mb-10">
        <div class="flex-1">
          <div 
            class="text-3xl font-bold mb-2 focus:outline-none focus:border-b-2 focus:border-green-500 hover:bg-yellow-50 p-1 rounded" 
            contenteditable 
            @blur="invoice.title = $event.target.innerText"
          >{{ invoice.title }}</div>
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
        
        <!-- Logo Upload -->
        <div class="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center relative overflow-hidden" :class="{ 'border-none': isGenerating }">
          <template v-if="invoice.logo">
            <img 
              :src="invoice.logo" 
              alt="Logo" 
              class="w-full h-full object-contain"
            />
            <button 
              v-if="!isGenerating"
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
              v-if="!isGenerating"
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

      <!-- Invoice From/To -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div class="from-details">
          <h3 class="text-gray-400 text-sm uppercase font-medium mb-2">From</h3>
          <input 
            v-model="invoice.from.name"
            placeholder="Your Name / Company"
            class="font-semibold text-lg mb-2 w-full border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
          />
          <textarea 
            v-model="invoice.from.address"
            placeholder="Your Address"
            class="text-gray-600 w-full min-h-[60px] border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
          ></textarea>
          <div class="flex items-center mb-1">
            <span class="text-gray-400 w-16">Email:</span>
            <input 
              v-model="invoice.from.email"
              placeholder="your@email.com"
              class="flex-1 border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
            />
          </div>
          <div class="flex items-center">
            <span class="text-gray-400 w-16">Phone:</span>
            <input 
              v-model="invoice.from.phone"
              placeholder="(123) 456-7890"
              class="flex-1 border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
            />
          </div>
        </div>
        
        <div class="to-details">
          <h3 class="text-gray-400 text-sm uppercase font-medium mb-2">Bill To</h3>
          <input 
            v-model="invoice.to.name"
            placeholder="Client Name"
            class="font-semibold text-lg mb-2 w-full border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
          />
          <textarea 
            v-model="invoice.to.address"
            placeholder="Client Address"
            class="text-gray-600 w-full min-h-[60px] border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
          ></textarea>
          <div class="flex items-center mb-1">
            <span class="text-gray-400 w-16">Email:</span>
            <input 
              v-model="invoice.to.email"
              placeholder="client@email.com"
              class="flex-1 border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
            />
          </div>
          <div class="flex items-center">
            <span class="text-gray-400 w-16">Phone:</span>
            <input 
              v-model="invoice.to.phone"
              placeholder="(098) 765-4321"
              class="flex-1 border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
            />
          </div>
        </div>
      </div>

      <!-- Invoice Items -->
      <div class="mb-10">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-gray-400 text-sm uppercase font-medium">Items</h3>
          <button 
            @click="addItem"
            class="text-primary hover:text-primary/80 text-sm font-medium"
          >
            + Add Item
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="border-b">
              <tr>
                <th class="text-left p-3 text-gray-500 font-medium">Description</th>
                <th class="text-right p-3 text-gray-500 font-medium w-24">Qty</th>
                <th class="text-right p-3 text-gray-500 font-medium w-32">Price</th>
                <th class="text-right p-3 text-gray-500 font-medium w-32">Amount</th>
                <th class="w-16"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in invoice.items" :key="index" class="border-b">
                <td class="p-3">
                  <input 
                    v-model="item.description"
                    placeholder="Item description"
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
                <td class="p-3 text-center">
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
              <span class="text-gray-600">Tax Rate:</span>
              <input 
                type="number" 
                v-model="invoice.taxRate"
                min="0"
                max="100"
                class="w-20 text-right border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded hover:bg-yellow-50"
              />
              <span class="text-gray-600 ml-1">%</span>
            </div>
            <div class="flex justify-between py-2">
              <span class="text-gray-600">Tax Amount:</span>
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
        <h3 class="text-gray-400 text-sm uppercase font-medium mb-2">Notes</h3>
        <textarea 
          v-model="invoice.notes"
          placeholder="Add any notes or payment terms..."
          class="w-full min-h-[100px] p-3 bg-gray-50 rounded-md border-none focus:outline-none focus:ring-1 focus:ring-green-500"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import html2pdf from 'html2pdf.js';

const invoicePrintRef = ref(null);
const fileInput = ref(null);
const isGenerating = ref(false);

const invoice = ref({
  title: 'INVOICE #001',
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

function downloadPDF() {
  if (!invoicePrintRef.value) return;
  
  isGenerating.value = true;

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
      })
      .catch(error => {
        console.error('Error generating PDF:', error);
        isGenerating.value = false;
        alert('Error generating PDF. Please try again.');
      });
  }, 500);
}
</script> 