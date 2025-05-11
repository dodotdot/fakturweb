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

      <!-- Mobile Tabs -->
      <div class="lg:hidden mb-4">
        <div class="flex rounded-lg bg-gray-100 p-1">
          <button 
            @click="activeTab = 'form'; isMobileMenuOpen = false" 
            :class="[
              'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200',
              activeTab === 'form' 
                ? 'bg-white shadow text-primary'
                : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            {{ translations.fillData }}
          </button>
          <button 
            @click="activeTab = 'preview'; isMobileMenuOpen = false" 
            :class="[
              'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200',
              activeTab === 'preview' 
                ? 'bg-white shadow text-primary'
                : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            {{ translations.preview }}
          </button>
        </div>
      </div>
      
      <!-- Two Column Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Left Column: Invoice Form (1/4 width) -->
        <div 
          :class="[
            'lg:col-span-1 bg-white shadow-lg p-6 rounded-lg border border-gray-200',
            {'hidden': activeTab === 'preview' && windowWidth < 1024}
          ]"
        >
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
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-medium text-gray-700">{{ translations.taxRate }}</label>
              <div class="flex items-center">
                <Switch 
                  v-model="invoice.showTax"
                  class="data-[state=checked]:bg-red-700"
                />
              </div>
            </div>
            <div v-if="invoice.showTax">
              <input 
                type="number" 
                v-model="invoice.taxRate"
                min="0"
                max="100"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
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
        <div 
          :class="[
            'lg:col-span-3 bg-white shadow-lg p-8 rounded-lg border border-gray-200 transform transition-all duration-300 hover:shadow-xl h-fit lg:sticky lg:top-4',
            {'hidden': activeTab === 'form' && windowWidth < 1024},
            {'mobile-preview-mode': activeTab === 'preview' && windowWidth < 1024}
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
            <h3 class="text-gray-400 text-xs uppercase font-medium mb-4">{{ translations.items }}</h3>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="border-b font-semibold text-sm">
                  <tr>                    <th class="text-left p-3 text-gray-500">{{ translations.description }}</th>
                    <th class="text-right p-3 text-gray-500 w-24">{{ translations.quantity }}</th>
                    <th class="text-right p-3 text-gray-500 w-32">{{ translations.price }}</th>
                    <th class="text-right p-3 text-gray-500 w-32">{{ translations.total }}</th>
                  </tr>
                </thead>
                <tbody class="text-sm">
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
              <template v-if="invoice.showTax">
                <div class="flex justify-between py-2">
                  <span class="text-gray-600">{{ translations.taxRate }}:</span>
                  <span>{{ invoice.taxRate }}%</span>
                </div>
                <div class="flex justify-between py-2">
                  <span class="text-gray-600">{{ translations.taxAmount }}:</span>
                  <span>{{ formatCurrency(calculateTaxAmount()) }}</span>
                </div>
              </template>
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
          >
            Next
          </button>
      </div>
    </div>
  </div>

  <!-- PDF Generation Overlay -->
  <div class="pdf-generating-overlay" :class="{ active: isGenerating || pdfGenerationStatus !== '' }">
    <!-- Mobile Loader (only shows on mobile) -->
    <div class="mobile-pdf-spinner"></div>
    <p class="mobile-pdf-text">{{ pdfGenerationStatus }}</p>
    <div class="mobile-pdf-progress">
      <div class="pdf-generating-progress-bar" :style="{ width: pdfGenerationProgress + '%' }"></div>
    </div>
    
    <!-- Desktop Loader (only shows on desktop) -->
    <div class="desktop-pdf-spinner"></div>
    <p class="desktop-pdf-text">{{ pdfGenerationStatus }}</p>
    <div class="desktop-pdf-progress">
      <div class="pdf-generating-progress-bar" :style="{ width: pdfGenerationProgress + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount, nextTick } from 'vue';
import html2pdf from 'html2pdf.js';
import { useRouter } from 'vue-router';
import { invoiceEvents, trackPageView } from '../utils/analytics';
import { trackGuestPdfGeneration } from '../utils/guest-tracker';
import { getTranslation, getPreferredLanguage } from '../i18n/direct-translations';
import Switch from '../components/ui/Switch.vue';

const router = useRouter();
const invoicePrintRef = ref(null);
const fileInput = ref(null);
const isGenerating = ref(false);

// Mobile menu state
const isMobileMenuOpen = ref(false);

// Mobile preview zoom state
const isZoomed = ref(false);

// Mobile responsive tabs
const activeTab = ref('form');
// Initialize window width with a safe default value for SSR
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024);

// Toggle zoom for mobile preview
function zoomInvoice() {
  isZoomed.value = !isZoomed.value;
  
  // Add/remove zoom class to body to prevent scrolling when zoomed
  if (typeof document !== 'undefined') {
    if (isZoomed.value) {
      document.body.classList.add('invoice-zoomed');
    } else {
      document.body.classList.remove('invoice-zoomed');
    }
  }
}

// Handle window resize for responsive design
function handleResize() {
  windowWidth.value = window.innerWidth;
  // If we're on desktop (>= 1024px), we don't need tabs
  if (windowWidth.value >= 1024) {
    activeTab.value = 'both';
    // Close mobile menu on desktop
    isMobileMenuOpen.value = false;
    // Reset zoom state when switching to desktop
    if (isZoomed.value) {
      isZoomed.value = false;
      document.body.classList.remove('invoice-zoomed');
    }
  } else if (activeTab.value === 'both') {
    // If switching to mobile, default to form view
    activeTab.value = 'form';
  }
}

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
    // Tab navigation
    seePreview: getTranslation(lang, 'ui', 'seePreview') || 'See Preview',
    editForm: getTranslation(lang, 'ui', 'editForm') || 'Edit Form',
    
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
    notesPlaceholder: getTranslation(lang, 'invoice', 'notesPlaceholder'),
    showTax: getTranslation(lang, 'invoice', 'showTax') || 'Tampilkan Pajak',
    hideTax: getTranslation(lang, 'invoice', 'hideTax') || 'Sembunyikan Pajak'
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
  showTax: true,
  notes: '',
  logo: null
};

// Initialize with default values
const invoice = ref({...defaultInvoice});

// Load saved language preference
onMounted(() => {
  console.log('GuestInvoice mounted - Current locale:', currentLocale.value);
  
  // Set up resize listener for responsive design - safely check for window
  if (typeof window !== 'undefined') {
    // Make sure windowWidth is properly initialized
    windowWidth.value = window.innerWidth;
    window.addEventListener('resize', handleResize);
    // Initialize the correct view based on initial window size
    handleResize();
  }
  
  // Add click outside handler to close mobile menu
  document.addEventListener('click', handleClickOutside);
  
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

// Remove event listeners when component is unmounted
onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('click', handleClickOutside);
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
  return calculateSubtotal() + (invoice.value.showTax ? calculateTaxAmount() : 0);
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

// Additional state for PDF generation
const pdfGenerationStatus = ref('');
const pdfGenerationProgress = ref(0);

// Update the downloadPDF function
async function downloadPDF() {
  if (!invoicePrintRef.value) return;
  
  isGenerating.value = true;
  pdfGenerationStatus.value = 'Preparing document...';
  pdfGenerationProgress.value = 10;

  // Add class to body to prevent scrolling
  document.body.classList.add('generating-pdf');

  try {
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
        orientation: 'portrait',
        compress: true // Add compression to help with iOS rendering
    }
  };

    // Update progress
    pdfGenerationStatus.value = 'Processing content...';
    pdfGenerationProgress.value = 30;
    await updateProgressWithDelay(40);
    
    // Check if this is Safari on iOS/iPadOS
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    // Add PDF class to improve rendering
    const element = invoicePrintRef.value;
    element.classList.add('pdf-mode');
    
    // Update progress
    pdfGenerationStatus.value = 'Loading images...';
    pdfGenerationProgress.value = 50;
    await updateProgressWithDelay(60);
    
    // Ensure all images are loaded before PDF generation
    const images = element.getElementsByTagName('img');
    await Promise.all(Array.from(images).map(img => {
      return new Promise((resolve) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Continue even if image fails to load
        }
      });
    }));
    
    // Update progress
    pdfGenerationStatus.value = 'Generating PDF...';
    pdfGenerationProgress.value = 70;
    await updateProgressWithDelay(80);
    
    // Safari on iOS requires a double-generation approach to fix blank PDF issue
    if (isSafari && isIOS) {
      pdfGenerationStatus.value = 'Optimizing for iOS...';
      // First generation (will likely be blank on iOS Safari, but primes the renderer)
      await html2pdf()
        .from(element)
      .set(options)
        .output('blob');
      
      pdfGenerationProgress.value = 90;
      pdfGenerationStatus.value = 'Finalizing document...';
      await updateProgressWithDelay(95);
      
      // Second generation (should be properly rendered)
      await html2pdf()
        .from(element)
        .set(options)
        .save();
    } else {
      // Normal flow for non-Safari/iOS browsers
      pdfGenerationStatus.value = 'Finalizing document...';
      pdfGenerationProgress.value = 90;
      await updateProgressWithDelay(95);
      
      await html2pdf()
        .from(element)
        .set(options)
        .save();
    }
    
    // Update progress to 100% when complete
    pdfGenerationProgress.value = 100;
    pdfGenerationStatus.value = 'PDF downloaded successfully!';
    
    // Add a delay before hiding the overlay for user to see success message
    await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Track guest PDF generation with comprehensive data
        trackGuestPdfGeneration({
          invoiceTitle: invoice.value.title,
          invoiceTotal: calculateTotal(),
          userAgent: navigator.userAgent
        });
    
    // Remove PDF mode class
    element.classList.remove('pdf-mode');
    
    // Reset status and progress
    pdfGenerationStatus.value = '';
    pdfGenerationProgress.value = 0;
    
  } catch (error) {
        console.error('Error generating PDF:', error);
    pdfGenerationStatus.value = 'Error generating PDF. Please try again.';
    // Show error for 2 seconds then hide overlay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset status and progress
    pdfGenerationStatus.value = '';
    pdfGenerationProgress.value = 0;
  } finally {
        isGenerating.value = false;
    document.body.classList.remove('generating-pdf');
  }
}

// Helper function to update progress with a small delay to show animation
async function updateProgressWithDelay(targetProgress) {
  // Wait for UI to update
  await nextTick();
  // Add a small delay for the progress animation
  await new Promise(resolve => setTimeout(resolve, 300));
  pdfGenerationProgress.value = targetProgress;
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

// Handle clicks outside to close the mobile menu
function handleClickOutside(event) {
  const hamburgerBtn = document.querySelector('.lg\\:hidden.fixed.top-4.right-4.z-50 button');
  const mobileMenu = document.querySelector('.lg\\:hidden.fixed.top-4.right-4.z-50 .absolute');
  
  if (hamburgerBtn && mobileMenu && 
      !hamburgerBtn.contains(event.target) && 
      !mobileMenu.contains(event.target) && 
      isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
  }
}
</script>

<style scoped>
@import '../assets/mobile-styles.css';

/* Shadcn-style switch component */
.shadcn-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background-color: #e5e7eb;
  transition: background-color 0.2s;
  cursor: pointer;
}

.shadcn-switch:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}

.shadcn-switch[data-state="checked"] {
  background-color: #c0392b;
}

.shadcn-switch[data-state="unchecked"] {
  background-color: #e5e7eb;
}

.shadcn-switch span {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  transition: transform 0.2s;
  transform: translateX(2px);
}

.shadcn-switch[data-state="checked"] span {
  transform: translateX(22px);
}

/* Mobile responsive adjustments */
@media (max-width: 640px) {
  .shadcn-switch {
    width: 40px;
    height: 22px;
  }
  
  .shadcn-switch span {
    width: 18px;
    height: 18px;
  }
  
  .shadcn-switch[data-state="checked"] span {
    transform: translateX(20px);
  }
}

/* Override for tax switch to use darker red */
.data-\[state\=checked\]\.bg-red-700[data-state="checked"] {
  background-color: #c0392b !important;
}

/* Modern styles that improve on mobile and desktop */
.invoice-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  overflow: hidden;
}

@media print {
  .no-print {
    display: none !important;
  }
}

/* Fallback styles for PDF overlay - these are overriden by mobile-styles.css */
@media (max-width: 1023px) {
  .pdf-generating-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
  
  .pdf-generating-overlay.active {
    opacity: 1;
    pointer-events: auto;
  }
}
</style> 