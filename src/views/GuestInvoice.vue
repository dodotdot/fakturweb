<template>
  <div class="min-h-screen py-12 bg-gray-50">
    <div class="container mx-auto max-w-7xl">
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
      
      <div class="mb-6 flex justify-between items-center py-4">
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
              currentLocale === 'id' 
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
              currentLocale === 'en' 
                ? 'bg-primary text-white font-medium' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            ]"
          >
            EN
          </button>
        </div>
      </div>
      
      <!-- Two Column Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Left Column: Invoice Form (1/4 width) -->
        <div class="lg:col-span-1 bg-white shadow-lg p-6 rounded-lg border border-gray-200">
          <h2 class="text-lg font-semibold mb-4">{{ translations.fillData }}</h2>
          
          <!-- Invoice Header -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ translations.title }}</label>
            <input 
              v-model="invoice.title"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ translations.date }}</label>
              <input 
                type="date" 
                v-model="invoice.date" 
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ translations.dueDate }}</label>
              <input 
                type="date" 
                v-model="invoice.dueDate" 
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
      </div>
    </div>  
          
          <!-- Logo Upload -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ translations.uploadLogo }}</label>
            <div class="w-40 h-40 mb-2">
            <div v-if="invoice.logo" class="relative w-full h-full">
              <img 
                :src="invoice.logo" 
                alt="Invoice Logo" 
                  class="max-w-full max-h-full object-contain border rounded-md"
                @load="handleImageLoad"
              />
              <button 
                @click="removeLogo"
                  class="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
              <div v-else class="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4">
                <label class="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="text-sm text-gray-500">{{ translations.uploadLogo }}</span>
                  <input type="file" class="hidden" accept="image/png,image/jpeg" @change="handleLogoUpload" ref="fileInput" />
              </label>
              </div>
            </div>
          </div>
          
          <!-- From Details -->
          <div class="mb-6">
            <h3 class="text-gray-700 text-sm uppercase font-medium mb-2">{{ translations.from }}</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-sm text-gray-500 mb-1">{{ translations.nameCompanyPlaceholder }}</label>
                <input 
                  v-model="invoice.from.name"
                  :placeholder="translations.nameCompanyPlaceholder"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-500 mb-1">{{ translations.addressPlaceholder }}</label>
            <textarea 
              v-model="invoice.from.address"
              :placeholder="translations.addressPlaceholder"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary min-h-[60px]"
            ></textarea>
              </div>
              <div>
                <label class="block text-sm text-gray-500 mb-1">{{ translations.email }}</label>
              <input 
                v-model="invoice.from.email"
                placeholder="email@anda.com"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
              <div>
                <label class="block text-sm text-gray-500 mb-1">{{ translations.phone }}</label>
              <input 
                v-model="invoice.from.phone"
                placeholder="(081) 234-5678"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              </div>
            </div>
          </div>
          
          <!-- To Details -->
          <div class="mb-6">
            <h3 class="text-gray-700 text-sm uppercase font-medium mb-2">{{ translations.billTo }}</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-sm text-gray-500 mb-1">{{ translations.clientNamePlaceholder }}</label>
            <input 
              v-model="invoice.to.name"
              :placeholder="translations.clientNamePlaceholder"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
              </div>
              <div>
                <label class="block text-sm text-gray-500 mb-1">{{ translations.clientAddressPlaceholder }}</label>
            <textarea 
              v-model="invoice.to.address"
              :placeholder="translations.clientAddressPlaceholder"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary min-h-[60px]"
            ></textarea>
              </div>
              <div>
                <label class="block text-sm text-gray-500 mb-1">{{ translations.email }}</label>
              <input 
                v-model="invoice.to.email"
                placeholder="email@klien.com"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
              <div>
                <label class="block text-sm text-gray-500 mb-1">{{ translations.phone }}</label>
              <input 
                v-model="invoice.to.phone"
                placeholder="(089) 876-5432"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <!-- Invoice Items -->
          <div class="mb-6">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-gray-700 text-sm uppercase font-medium">{{ translations.items }}</h3>
            <button 
              @click="addItem"
                class="text-primary hover:text-primary/80 text-sm font-medium flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {{ translations.addItem }}
              </button>
            </div>
            
            <div class="space-y-4">
              <div v-for="(item, index) in invoice.items" :key="index" class="border border-gray-200 rounded-md p-4">
                <div class="flex justify-between mb-2">
                  <label class="block text-sm text-gray-500">{{ translations.description }}</label>
                  <button 
                    @click="deleteItem(index)"
                    class="text-red-500 hover:text-red-700"
                    v-if="invoice.items.length > 1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
            </button>
          </div>
                    <input 
                      v-model="item.description"
                      :placeholder="translations.itemDescriptionPlaceholder"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2"
                />
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm text-gray-500 mb-1">{{ translations.quantity }}</label>
                    <input 
                      type="number" 
                      v-model="item.quantity"
                      min="1"
                      @input="calculateItemTotal(index)"
                      class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label class="block text-sm text-gray-500 mb-1">{{ translations.price }}</label>
                    <input 
                      type="number" 
                      v-model="item.unitPrice"
                      min="0"
                      @input="calculateItemTotal(index)"
                      class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div class="mt-2 text-right">
                  <span class="text-sm text-gray-500">{{ translations.total }}: </span>
                  <span class="font-semibold">{{ formatCurrency(item.total) }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Tax Rate -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ translations.taxRate }} (%)</label>
            <input 
              type="number" 
              v-model="invoice.taxRate"
              min="0"
              max="100"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <!-- Notes -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ translations.notes }}</label>
            <textarea 
              v-model="invoice.notes"
              :placeholder="translations.notesPlaceholder"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
            ></textarea>
          </div>
        </div>
        
        <!-- Right Column: Invoice Preview (3/4 width) -->
        <div class="lg:col-span-3 bg-white shadow-lg p-8 rounded-lg border border-gray-200 transform transition-all duration-300 hover:shadow-xl h-fit sticky top-4" ref="invoicePrintRef">
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
              <div v-else class="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div class="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-sm text-gray-500">{{ translations.uploadLogo }}</span>
                </div>
              </div>
            </div>
            
            <div class="flex-1 md:ml-8">
              <div class="text-3xl font-bold mb-2 text-right">{{ invoice.title }}</div>
              <div class="flex flex-col space-y-1 items-end">
                <div class="flex items-center">
                  <span class="text-gray-500 w-24">{{ translations.date }}:</span>
                  <span>{{ formatDate(invoice.date) }}</span>
                </div>
                <div class="flex items-center">
                  <span class="text-gray-500 w-24">{{ translations.dueDate }}:</span>
                  <span>{{ formatDate(invoice.dueDate) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Invoice From/To -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div class="from-details">
              <h3 class="text-gray-400 text-sm uppercase font-medium mb-2">{{ translations.from }}</h3>
              <div class="font-semibold text-lg mb-2">{{ invoice.from.name || translations.nameCompanyPlaceholder }}</div>
              <div class="text-gray-600 mb-2">{{ invoice.from.address || translations.addressPlaceholder }}</div>
              <div class="flex items-center mb-1">
                <span class="text-gray-400 w-16">{{ translations.email }}:</span>
                <span>{{ invoice.from.email || 'email@anda.com' }}</span>
              </div>
              <div class="flex items-center">
                <span class="text-gray-400 w-16">{{ translations.phone }}:</span>
                <span>{{ invoice.from.phone || '(081) 234-5678' }}</span>
              </div>
            </div>
            
            <div class="to-details">
              <h3 class="text-gray-400 text-sm uppercase font-medium mb-2">{{ translations.billTo }}</h3>
              <div class="font-semibold text-lg mb-2">{{ invoice.to.name || translations.clientNamePlaceholder }}</div>
              <div class="text-gray-600 mb-2">{{ invoice.to.address || translations.clientAddressPlaceholder }}</div>
              <div class="flex items-center mb-1">
                <span class="text-gray-400 w-16">{{ translations.email }}:</span>
                <span>{{ invoice.to.email || 'email@klien.com' }}</span>
              </div>
              <div class="flex items-center">
                <span class="text-gray-400 w-16">{{ translations.phone }}:</span>
                <span>{{ invoice.to.phone || '(089) 876-5432' }}</span>
              </div>
            </div>
          </div>

          <!-- Invoice Items -->
          <div class="mb-10">
            <h3 class="text-gray-400 text-sm uppercase font-medium mb-4">{{ translations.items }}</h3>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="border-b">
                  <tr>
                    <th class="text-left p-3 text-gray-500 font-medium">{{ translations.description }}</th>
                    <th class="text-right p-3 text-gray-500 font-medium w-24">{{ translations.quantity }}</th>
                    <th class="text-right p-3 text-gray-500 font-medium w-32">{{ translations.price }}</th>
                    <th class="text-right p-3 text-gray-500 font-medium w-32">{{ translations.total }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in invoice.items" :key="index" class="border-b">
                    <td class="p-3">{{ item.description || translations.itemDescriptionPlaceholder }}</td>
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
                <span class="text-gray-600">{{ translations.subtotal }}:</span>
                <span>{{ formatCurrency(calculateSubtotal()) }}</span>
              </div>
                <div class="flex justify-between py-2">
                <span class="text-gray-600">{{ translations.taxRate }}:</span>
                  <span>{{ invoice.taxRate }}%</span>
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
            <div class="p-3 bg-gray-50 rounded-md min-h-[60px]">
              {{ invoice.notes || translations.notesPlaceholder }}
            </div>
          </div>
        </div>
        </div>

      <!-- Bottom Actions -->
      <div class="mt-8 flex justify-center space-x-4">
          <button 
            @click="previewInvoice"
            class="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/80 font-medium"
          :disabled="isFormIncomplete"
          >
            {{ translations.preview }}
          </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import html2pdf from 'html2pdf.js';
import { useRouter } from 'vue-router';
import { invoiceEvents, trackPageView } from '../utils/analytics';
import { trackGuestPdfGeneration } from '../utils/guest-tracker';
import { getTranslation, getPreferredLanguage } from '../i18n/direct-translations';

const router = useRouter();
const invoicePrintRef = ref(null);
const fileInput = ref(null);
const isGenerating = ref(false);

// Use direct language management instead of Vue i18n
const currentLocale = ref(getPreferredLanguage());

// Check if localStorage is available
function isLocalStorageAvailable() {
  try {
    const testKey = '__test_key__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.warn('localStorage is not available:', e);
    return false;
  }
}

// This function sets the locale directly
function setLanguage(lang) {
  // Only accept valid languages
  if (['id', 'en'].includes(lang)) {
    currentLocale.value = lang;
    console.log('Language set directly to:', lang);
    
    // Try to save to localStorage if available
    if (isLocalStorageAvailable()) {
      try {
        localStorage.setItem('preferred_language', lang);
      } catch (e) {
        console.warn('Failed to save language to localStorage:', e);
      }
    }
  }
}

// Computed translations using our direct method
const translations = computed(() => {
  // Get current language
  const lang = currentLocale.value;
  console.log('Computing translations for language:', lang);
  
  return {
    // UI elements
    fillData: getTranslation(lang, 'ui', 'fillData'),
    chooseTheme: getTranslation(lang, 'ui', 'chooseTheme'),
    downloadPDF: getTranslation(lang, 'ui', 'downloadPDF'),
    createInvoiceMessage: getTranslation(lang, 'ui', 'createInvoiceMessage'),
    preview: getTranslation(lang, 'ui', 'preview'),
    
    // Invoice content
    uploadLogo: getTranslation(lang, 'invoice', 'uploadLogo'),
    date: getTranslation(lang, 'invoice', 'date'),
    dueDate: getTranslation(lang, 'invoice', 'dueDate'),
    from: getTranslation(lang, 'invoice', 'from'),
    billTo: getTranslation(lang, 'invoice', 'billTo'),
    items: getTranslation(lang, 'invoice', 'items'),
    addItem: getTranslation(lang, 'invoice', 'addItem'),
    description: getTranslation(lang, 'invoice', 'description'),
    quantity: getTranslation(lang, 'invoice', 'quantity'),
    price: getTranslation(lang, 'invoice', 'price'),
    total: getTranslation(lang, 'invoice', 'total'),
    subtotal: getTranslation(lang, 'invoice', 'subtotal'),
    taxRate: getTranslation(lang, 'invoice', 'taxRate'),
    taxAmount: getTranslation(lang, 'invoice', 'taxAmount'),
    notes: getTranslation(lang, 'invoice', 'notes'),
    nameCompanyPlaceholder: getTranslation(lang, 'invoice', 'nameCompanyPlaceholder'),
    addressPlaceholder: getTranslation(lang, 'invoice', 'addressPlaceholder'),
    email: getTranslation(lang, 'invoice', 'email'),
    phone: getTranslation(lang, 'invoice', 'phone'),
    clientNamePlaceholder: getTranslation(lang, 'invoice', 'clientNamePlaceholder'),
    clientAddressPlaceholder: getTranslation(lang, 'invoice', 'clientAddressPlaceholder'),
    itemDescriptionPlaceholder: getTranslation(lang, 'invoice', 'itemDescriptionPlaceholder'),
    notesPlaceholder: getTranslation(lang, 'invoice', 'notesPlaceholder')
  };
});

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
  console.log('GuestInvoice mounted - Current locale:', currentLocale.value);
  
  // Track guest invoice page view
  trackPageView('/invoice/guest', 'Buat Faktur Tanpa Daftar - Faktur.web.id');
  
  // Load saved invoice if localStorage is available
  if (isLocalStorageAvailable()) {
    try {
      const savedInvoice = localStorage.getItem('currentInvoice');
      if (savedInvoice) {
        try {
          const parsedInvoice = JSON.parse(savedInvoice);
          
          // If the saved invoice has a language preference, use it
          if (parsedInvoice._language && ['id', 'en'].includes(parsedInvoice._language)) {
            currentLocale.value = parsedInvoice._language;
            console.log('Language loaded from saved invoice:', currentLocale.value);
          }
          
          // Copy saved values to invoice
          invoice.value = parsedInvoice;
          
          // Recalculate item totals to ensure they're correct
          invoice.value.items.forEach((item, index) => {
            calculateItemTotal(index);
          });
        } catch (parseError) {
          console.error('Error parsing saved invoice:', parseError);
          // If error parsing, use defaults
        }
      }
    } catch (storageError) {
      console.warn('Error accessing localStorage for invoice data:', storageError);
      // Continue with default invoice
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
  // Make sure we're saving the language preference with the invoice
  invoice.value._language = currentLocale.value;
  
  // Save current invoice data to localStorage if available
  if (isLocalStorageAvailable()) {
    try {
      localStorage.setItem('currentInvoice', JSON.stringify(invoice.value));
    } catch (error) {
      console.warn('Failed to save invoice to localStorage:', error);
    }
  }
  
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
        
        // Track guest PDF generation with comprehensive data
        trackGuestPdfGeneration({
          invoiceTitle: invoice.value.title,
          invoiceTotal: calculateTotal(),
          userAgent: navigator.userAgent
        });
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