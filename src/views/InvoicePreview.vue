<template>
  <div class="min-h-screen py-12">
    <div class="container mx-auto max-w-4xl" :class="{ 'pdf-container': isGenerating }">
      <!-- Step Timeline -->
      <div class="mb-8 flex justify-center">
        <div class="relative px-4 max-w-md w-full">
          <!-- Step Line -->
          <div class="absolute left-8 right-8 top-4 h-0.5 bg-gray-200 z-0"></div>
          
          <!-- Step Line Progress (50% complete) -->
          <div class="absolute left-8 right-1/2 top-4 h-0.5 bg-primary z-0"></div>
          
          <!-- Step Items -->
          <div class="relative z-10 flex justify-between w-full">
            <!-- Step 1: Create (completed) -->
            <div class="flex flex-col items-center">
              <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="text-center mt-1">
                <div class="text-xs font-medium text-primary">{{ translations.fillData }}</div>
              </div>
            </div>
            
            <!-- Step 2: Preview (active) -->
            <div class="flex flex-col items-center">
              <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mb-2 ring-4 ring-primary/20 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div class="text-center mt-1">
                <div class="text-xs font-medium text-primary">{{ translations.chooseTheme }}</div>
              </div>
            </div>
            
            <!-- Step 3: Download (upcoming) -->
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
      
      <div class="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center py-8 gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">{{ translations.preview }} Faktur</h1>
          <p class="text-gray-500">
            {{ translations.createInvoiceMessage }}
          </p>
        </div>
        <div class="flex sm:flex-row w-full sm:w-auto gap-3 justify-center">
          <button
            @click="backToEdit"
            class="min-h-[44px] w-[44px] sm:w-auto px-3 sm:px-4 py-2.5 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 active:bg-gray-300 font-medium flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 relative group"
            title="Edit Invoice"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            <span class="hidden sm:inline-block ml-2">Edit</span>
            <!-- Tooltip for mobile -->
            <span class="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none sm:hidden">
              Edit Invoice
            </span>
          </button>
          <button 
            @click="shareToWhatsApp"
            class="min-h-[44px] w-[44px] sm:w-auto px-3 sm:px-4 py-2.5 bg-green-500 text-white rounded-md hover:bg-green-600 active:bg-green-700 font-medium flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 relative group"
            title="Share via WhatsApp"
          >
            <svg class="h-5 w-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
            </svg>
            <span class="hidden sm:inline-block ml-2">WhatsApp</span>
            <span class="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none sm:hidden">
              Share via WhatsApp
            </span>
          </button>
          <button 
            @click="shareViaEmail"
            class="min-h-[44px] w-[44px] sm:w-auto px-3 sm:px-4 py-2.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 active:bg-blue-700 font-medium flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 relative group"
            title="Share via Email"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span class="hidden sm:inline-block ml-2">Email</span>
            <span class="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none sm:hidden">
              Share via Email
            </span>
          </button>
          <button 
            @click="downloadPDF"
            class="min-h-[44px] w-[44px] sm:w-auto px-3 sm:px-4 py-2.5 bg-primary text-white rounded-md hover:bg-primary/90 active:bg-primary/80 font-medium flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed relative group"
            :disabled="isGenerating"
            title="Download PDF"
          >
            <img src="/images/pdf-icon.svg" alt="PDF" class="h-5 w-5" />
            <span class="hidden sm:inline-block ml-2">{{ isGenerating ? 'Membuat PDF...' : 'PDF' }}</span>
            <!-- Loading spinner -->
            <div v-if="isGenerating" class="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center rounded-md">
              <div class="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            </div>
            <!-- Tooltip for mobile -->
            <span class="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none sm:hidden">
              Download PDF
            </span>
          </button>
        </div>
      </div>
      
      <!-- Theme Selector -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-semibold">{{ translations.chooseTheme }}</h3>
          
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
        <div class="flex space-x-3">
          <button 
            class="flex items-center space-x-2 px-3 py-2 rounded-md border transition-all hover:shadow-sm"
            :class="{ 'border-primary bg-primary/5': selectedTheme === 'classic', 'border-gray-200': selectedTheme !== 'classic' }"
            @click="selectedTheme = 'classic'"
          >
            <div class="flex space-x-1">
              <div class="w-3 h-3 bg-gray-200 rounded"></div>
              <div class="w-3 h-3 bg-gray-300 rounded"></div>
              <div class="w-3 h-3 bg-gray-400 rounded"></div>
            </div>
            <span class="text-sm font-medium">Klasik</span>
          </button>
          
          <button 
            class="flex items-center space-x-2 px-3 py-2 rounded-md border transition-all hover:shadow-sm"
            :class="{ 'border-primary bg-primary/5': selectedTheme === 'modern', 'border-gray-200': selectedTheme !== 'modern' }"
            @click="selectedTheme = 'modern'"
          >
            <div class="flex space-x-1">
              <div class="w-3 h-3 bg-blue-200 rounded"></div>
              <div class="w-3 h-3 bg-blue-300 rounded"></div>
              <div class="w-3 h-3 bg-blue-400 rounded"></div>
            </div>
            <span class="text-sm font-medium">Modern</span>
          </button>
          
          <button 
            class="flex items-center space-x-2 px-3 py-2 rounded-md border transition-all hover:shadow-sm"
            :class="{ 'border-primary bg-primary/5': selectedTheme === 'elegant', 'border-gray-200': selectedTheme !== 'elegant' }"
            @click="selectedTheme = 'elegant'"
          >
            <div class="flex space-x-1">
              <div class="w-3 h-3 bg-yellow-200 rounded"></div>
              <div class="w-3 h-3 bg-yellow-300 rounded"></div>
              <div class="w-3 h-3 bg-yellow-400 rounded"></div>
            </div>
            <span class="text-sm font-medium">Elegan</span>
          </button>
        </div>
      </div>
    </div>  
    
    <div class="container mx-auto max-w-4xl">
      <div 
        :class="[
          'p-4 md:p-8 rounded-lg border pdf-container',
          {
            'bg-white border-gray-200': selectedTheme === 'classic',
            'bg-blue-50 border-blue-200': selectedTheme === 'modern',
            'bg-yellow-50 border-yellow-200': selectedTheme === 'elegant'
          }
        ]" 
        ref="invoicePrintRef"
      >
        <!-- Invoice Header -->
        <div class="flex flex-col items-center md:flex-row md:justify-between md:items-start mb-10">
          <!-- Logo -->
          <div class="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mb-4 md:mb-0">
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
                  'border-yellow-300': selectedTheme === 'elegant'
                }
              ]"
            >
              <span :class="{
                'text-gray-400': selectedTheme === 'classic',
                'text-blue-400': selectedTheme === 'modern',
                'text-navy-500': selectedTheme === 'elegant'
              }" class="text-xs md:text-sm">{{ translations.uploadLogo }}</span>
            </div>
          </div>
          
          <div class="flex-1 md:ml-8 text-center md:text-right">
            <div 
              :class="[
                'text-2xl md:text-3xl font-bold mb-2',
                {
                  'text-gray-800': selectedTheme === 'classic',
                  'text-blue-800': selectedTheme === 'modern',
                  'text-navy-900': selectedTheme === 'elegant'
                }
              ]"
            >{{ invoice.title }}</div>
            <div class="flex flex-col space-y-1 items-center md:items-end">
              <div class="flex items-center">
                <span :class="{
                  'text-gray-500': selectedTheme === 'classic',
                  'text-blue-500': selectedTheme === 'modern',
                  'text-navy-600': selectedTheme === 'elegant'
                }" class="w-24 text-sm">{{ translations.date }}:</span>
                <span class="text-sm">{{ formatDate(invoice.date) }}</span>
              </div>
              <div class="flex items-center">
                <span :class="{
                  'text-gray-500': selectedTheme === 'classic',
                  'text-blue-500': selectedTheme === 'modern',
                  'text-navy-600': selectedTheme === 'elegant'
                }" class="w-24 text-sm">{{ translations.dueDate }}:</span>
                <span class="text-sm">{{ formatDate(invoice.dueDate) }}</span>
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
              'text-navy-800': selectedTheme === 'elegant'
            }" class="text-sm uppercase font-medium mb-2">{{ translations.from }}</h3>
            <div :class="{
              'text-gray-900': selectedTheme === 'classic',
              'text-blue-900': selectedTheme === 'modern',
              'text-navy-900': selectedTheme === 'elegant'
            }" class="font-semibold text-lg mb-2">{{ invoice.from.name }}</div>
            <div :class="{
              'text-gray-600': selectedTheme === 'classic',
              'text-blue-700': selectedTheme === 'modern',
              'text-navy-700': selectedTheme === 'elegant'
            }" class="mb-2 text-base whitespace-pre-line">{{ invoice.from.address }}</div>
            <div class="flex items-center mb-1">
              <span :class="{
                'text-gray-400': selectedTheme === 'classic',
                'text-blue-500': selectedTheme === 'modern',
                'text-navy-700': selectedTheme === 'elegant'
              }" class="w-16 text-sm">Email:</span>
              <span class="text-base">{{ invoice.from.email }}</span>
            </div>
            <div class="flex items-center">
              <span :class="{
                'text-gray-400': selectedTheme === 'classic',
                'text-blue-500': selectedTheme === 'modern',
                'text-navy-700': selectedTheme === 'elegant'
              }" class="w-16 text-sm">Telepon:</span>
              <span class="text-base">{{ invoice.from.phone }}</span>
            </div>
          </div>
          
          <div class="to-details">
            <h3 :class="{
              'text-gray-400': selectedTheme === 'classic',
              'text-blue-500': selectedTheme === 'modern',
              'text-navy-800': selectedTheme === 'elegant'
            }" class="text-sm uppercase font-medium mb-2">{{ translations.billTo }}</h3>
            <div :class="{
              'text-gray-900': selectedTheme === 'classic',
              'text-blue-900': selectedTheme === 'modern',
              'text-navy-900': selectedTheme === 'elegant'
            }" class="font-semibold text-lg mb-2">{{ invoice.to.name }}</div>
            <div :class="{
              'text-gray-600': selectedTheme === 'classic',
              'text-blue-700': selectedTheme === 'modern',
              'text-navy-700': selectedTheme === 'elegant'
            }" class="mb-2 text-base whitespace-pre-line">{{ invoice.to.address }}</div>
            <div class="flex items-center mb-1">
              <span :class="{
                'text-gray-400': selectedTheme === 'classic',
                'text-blue-500': selectedTheme === 'modern',
                'text-navy-700': selectedTheme === 'elegant'
              }" class="w-16 text-sm">Email:</span>
              <span class="text-base">{{ invoice.to.email }}</span>
            </div>
            <div class="flex items-center">
              <span :class="{
                'text-gray-400': selectedTheme === 'classic',
                'text-blue-500': selectedTheme === 'modern',
                'text-navy-700': selectedTheme === 'elegant'
              }" class="w-16 text-sm">Telepon:</span>
              <span class="text-base">{{ invoice.to.phone }}</span>
            </div>
          </div>
        </div>

        <!-- Invoice Items -->
        <div class="mb-10">
          <h3 :class="{
            'text-gray-400': selectedTheme === 'classic',
            'text-blue-500': selectedTheme === 'modern',
            'text-navy-800': selectedTheme === 'elegant'
          }" class="text-sm uppercase font-medium mb-4">{{ translations.items }}</h3>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead :class="{
                'border-b border-gray-200': selectedTheme === 'classic',
                'border-b border-blue-300': selectedTheme === 'modern',
                'border-b border-yellow-300': selectedTheme === 'elegant'
              }">
                <tr>
                  <th class="text-left p-3 text-gray-500 font-medium">{{ translations.description }}</th>
                  <th class="text-right p-3 text-gray-500 font-medium">{{ translations.quantity }}</th>
                  <th class="text-right p-3 text-gray-500 font-medium">{{ translations.price }}</th>
                  <th class="text-right p-3 text-gray-500 font-medium">{{ translations.total }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in invoice.items" :key="index" :class="{
                  'border-b border-gray-200': selectedTheme === 'classic',
                  'border-b border-blue-300': selectedTheme === 'modern',
                  'border-b border-yellow-300': selectedTheme === 'elegant'
                }">
                  <td class="p-3 text-base">{{ item.description }}</td>
                  <td class="p-3 text-right text-base">{{ item.quantity }}</td>
                  <td class="p-3 text-right text-base">{{ formatCurrency(item.unitPrice) }}</td>
                  <td class="p-3 text-right text-base">{{ formatCurrency(item.total) }}</td>
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
                  'text-navy-700': selectedTheme === 'elegant'
                }" class="text-base">{{ translations.subtotal }}:</span>
                <span class="text-base">{{ formatCurrency(calculateSubtotal()) }}</span>
              </div>
              <template v-if="invoice.showTax">
                <div class="flex justify-between py-2">
                  <span :class="{
                    'text-gray-600': selectedTheme === 'classic',
                    'text-blue-700': selectedTheme === 'modern',
                    'text-navy-700': selectedTheme === 'elegant'
                  }" class="text-base">{{ translations.taxRate }}: {{ invoice.taxRate }}%</span>
                  <span class="text-base">{{ formatCurrency(calculateTaxAmount()) }}</span>
                </div>
              </template>
              <div :class="{
                'border-t border-gray-200': selectedTheme === 'classic',
                'border-t border-blue-300': selectedTheme === 'modern',
                'border-t border-yellow-300': selectedTheme === 'elegant'
              }" class="flex justify-between py-3 font-bold text-lg">
                <span>{{ translations.total }}:</span>
                <span :class="{
                  'text-gray-900': selectedTheme === 'classic',
                  'text-blue-900': selectedTheme === 'modern',
                  'text-navy-900': selectedTheme === 'elegant'
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
            'text-navy-800': selectedTheme === 'elegant'
          }" class="text-sm uppercase font-medium mb-2">{{ translations.notes }}</h3>
          <div :class="{
            'border border-gray-200': selectedTheme === 'classic',
            'border border-blue-200': selectedTheme === 'modern',
            'border border-yellow-200': selectedTheme === 'elegant'
          }" class="p-3 rounded-md text-base">{{ invoice.notes }}</div>
        </div>

        <!-- Update the watermark footer structure -->
        <div class="watermark-footer mt-6 flex justify-center items-center w-full">
          <p 
            :class="{
              'text-gray-700': selectedTheme === 'classic',
              'text-blue-700': selectedTheme === 'modern',
              'text-navy-500': selectedTheme === 'elegant'
            }"
            class="text-center"
          >
            Powered by 🔥 <a href="https://faktur.web.id" class="text-red-600 font-medium">Faktur.web.id</a>
          </p>
        </div>
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

  <!-- Registration Benefits Modal -->
  <div v-if="showRegisterModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      
      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full relative">
        <!-- Universal close button for both mobile and desktop -->
        <button 
          @click="showRegisterModal = false" 
          class="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          title="Close modal"
        >
          <svg class="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="flex flex-col md:flex-row">
          <!-- Left side (benefits) -->
          <div class="hidden md:block bg-gray-800 text-white p-6 md:p-8 md:w-1/2">
            <h2 class="text-2xl font-bold mb-4">MAU SIMPAN INVOICE-MU? 🔥</h2>
            <p class="text-gray-300 mb-6">Bikin invoice ga perlu ribet lagi! Daftar sekarang dan nikmati semua fitur keren ini:</p>
            
            <div class="space-y-4">
              <div class="flex items-start">
                <svg class="h-6 w-6 mr-3 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 class="font-semibold">Invoice Tanpa Watermark</h3>
                  <p class="text-gray-300 text-sm">Tampilan invoice jadi lebih pro & branded sesuai bisnismu!</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <svg class="h-6 w-6 mr-3 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div>
                  <h3 class="font-semibold">Kelola Klien</h3>
                  <p class="text-gray-300 text-sm">Simpan data klien sekali, pakai berkali-kali. Praktis, kan?</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <svg class="h-6 w-6 mr-3 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div>
                  <h3 class="font-semibold">Bikin Quotation</h3>
                  <p class="text-gray-300 text-sm">Penawaran harga jadi lebih gampang & langsung bisa jadi invoice!</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <svg class="h-6 w-6 mr-3 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 class="font-semibold">Tracking Waktu & Biaya</h3>
                  <p class="text-gray-300 text-sm">Hitung jam kerja & biaya otomatis. Ga perlu Excel lagi!</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <svg class="h-6 w-6 mr-3 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <div>
                  <h3 class="font-semibold">Invoice Berulang</h3>
                  <p class="text-gray-300 text-sm">Set jadwal kirim invoice otomatis. Tinggal duduk manis, duit ngalir!</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <svg class="h-6 w-6 mr-3 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <div>
                  <h3 class="font-semibold">Terima Pembayaran Online</h3>
                  <p class="text-gray-300 text-sm">Integrasi dengan payment gateway. Duit cair lebih cepat!</p>
                </div>
              </div>
            </div>
            
            <div class="mt-8">
              <router-link 
                to="/beta" 
                class="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                DAFTAR VERSI BETA SEKARANG
              </router-link>
              <p class="text-center mt-2 text-sm italic text-gray-300">Gratis kok, ga pake tipu-tipu! 😉</p>
            </div>
          </div>
          
          <!-- Right side (PDF download) -->
          <div class="p-6 md:p-8 md:w-1/2 flex flex-col items-center justify-center">
            <div class="text-center mb-8">
              <h3 class="text-2xl font-light text-gray-400">{{ getActionTitle }}</h3>
              <h2 class="text-4xl font-light text-gray-400 mb-4">invoice di sini</h2>
              
              <svg v-if="shareMethod === 'pdf'" class="h-16 w-16 mx-auto text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              <svg v-else-if="shareMethod === 'whatsapp'" class="h-16 w-16 mx-auto text-green-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
              </svg>
              <svg v-else class="h-16 w-16 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            
            <!-- Guest Information Form -->
            <div class="w-full mb-4 bg-gray-50 p-4 rounded-md">
              <h4 class="text-sm font-medium text-gray-700 mb-3">Masukkan Informasi Anda</h4>
              
              <div class="mb-3">
                <label for="guest-name" class="block text-xs text-gray-600 mb-1">Nama <span class="text-red-500">*</span></label>
                <input 
                  id="guest-name" 
                  type="text" 
                  v-model="guestInfo.name" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  :class="{'border-red-500': formErrors.name}"
                  placeholder="Nama Lengkap"
                  required
                />
                <div v-if="formErrors.name" class="mt-1 text-xs text-red-500">{{ formErrors.name }}</div>
              </div>
              
              <div class="mb-3">
                <label for="guest-email" class="block text-xs text-gray-600 mb-1">Email <span class="text-red-500">*</span></label>
                <input 
                  id="guest-email" 
                  type="email" 
                  v-model="guestInfo.email" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  :class="{'border-red-500': formErrors.email}"
                  placeholder="email@anda.com"
                  required
                />
                <div v-if="formErrors.email" class="mt-1 text-xs text-red-500">{{ formErrors.email }}</div>
              </div>
              
              <div class="flex items-center mb-1">
                <input 
                  id="save-info" 
                  type="checkbox" 
                  v-model="guestInfo.saveInfo" 
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label for="save-info" class="ml-2 block text-xs text-gray-600">
                  Simpan untuk penggunaan selanjutnya
                </label>
              </div>
            </div>
            
            <button 
              @click="processDownload"
              :class="{
                'bg-gray-700 hover:bg-gray-600': shareMethod === 'pdf',
                'bg-green-600 hover:bg-green-500': shareMethod === 'whatsapp',
                'bg-blue-600 hover:bg-blue-500': shareMethod === 'email'
              }"
              class="w-full mb-4 py-3 px-6 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
              :disabled="isGenerating"
            >
              <span v-if="isGenerating">
                <svg class="animate-spin -ml-1 mr-2 h-5 w-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                LAGI PROSES...
              </span>
              <span v-else>
                {{ getActionButtonText }}
              </span>
            </button>
            <p class="text-center text-sm text-gray-500">Bisa {{ getActionText }} dulu, tapi coba deh daftar juga, nanti jadi lebih gampang!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import html2pdf from 'html2pdf.js';
import { invoiceEvents, trackPageView } from '../utils/analytics';
import { trackGuestPdfGeneration } from '../utils/guest-tracker';
import { getTranslation, getPreferredLanguage } from '../i18n/direct-translations';

const route = useRoute();
const router = useRouter();
const invoicePrintRef = ref(null);
const isGenerating = ref(false);
const selectedTheme = ref('classic'); // Default theme
const showRegisterModal = ref(false);
const successMessage = ref('');

// Direct language management
const currentLocale = ref(getPreferredLanguage());

// Guest information for tracking
const guestInfo = ref({
  name: '',
  email: '',
  saveInfo: true
});

// Form validation errors
const formErrors = ref({
  name: '',
  email: ''
});

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

// Add new ref for tracking the share method
const shareMethod = ref('');

// Add new refs for process states
const processState = ref({
  status: '', // 'idle', 'processing', 'success', 'error'
  message: '',
  error: null
});

// Add these new refs for the PDF generation status
const pdfGenerationStatus = ref('');
const pdfGenerationProgress = ref(0);

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

    // Check if there's a language preference in the invoice data
    if (invoice.value._language) {
      currentLocale.value = invoice.value._language;
    }
  } else {
    // Redirect back if no invoice data
    router.push('/invoice/guest');
  }
  
  // Load saved guest info if available
  if (isLocalStorageAvailable()) {
    try {
      const savedGuestInfo = localStorage.getItem('guest_info');
      if (savedGuestInfo) {
        const parsedInfo = JSON.parse(savedGuestInfo);
        if (parsedInfo.name) guestInfo.value.name = parsedInfo.name;
        if (parsedInfo.email) guestInfo.value.email = parsedInfo.email;
      }
    } catch (e) {
      console.warn('Failed to load saved guest info:', e);
    }
  }
});

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

function downloadPDF() {
  if (isGenerating.value) {
    console.log('PDF generation already in progress');
    return;
  }

  try {
    console.log('Starting PDF download process...');
    shareMethod.value = 'pdf';
    showRegisterModal.value = true;
    
    // Track the modal view
    invoiceEvents.download(
      invoice.value.title || 'Untitled Invoice',
      calculateTotal()
    );
  } catch (error) {
    alert('Error preparing PDF download: ' + (error.message || 'Unknown error'));
  }
}

async function processDownload() {
  if (!validateGuestInfo()) return;

  try {
    processState.value = {
      status: 'processing',
      message: `Memproses ${getActionText.value}...`,
      error: null
    };
    
    isGenerating.value = true;
    showRegisterModal.value = false;

    // Save guest info if checkbox is checked
    if (guestInfo.value.saveInfo && isLocalStorageAvailable()) {
      try {
        localStorage.setItem('guest_info', JSON.stringify({
          name: guestInfo.value.name,
          email: guestInfo.value.email,
          lastUsed: new Date().toISOString()
        }));
      } catch (e) {
        console.warn('Failed to save guest info:', e);
      }
    }

    // Ensure we have a valid title
    const invoiceTitle = invoice.value.title?.trim() || `Faktur #${new Date().getTime()}`;

    // Track guest info with proper data structure
    const guestData = {
      invoiceTitle: invoiceTitle, // Use the validated title
      invoiceTotal: calculateTotal(),
      guestName: guestInfo.value.name,
      guestEmail: guestInfo.value.email,
      userAgent: navigator.userAgent,
      source: shareMethod.value, // Add the source based on share method
      timestamp: new Date().toISOString()
    };
    
    await trackGuestPdfGeneration(guestData);

    // Process based on share method
    switch (shareMethod.value) {
      case 'whatsapp':
        await processWhatsAppShare();
        break;
      case 'email':
        await processEmailShare();
        break;
      case 'pdf':
        await processPDFDownload();
        break;
    }

    processState.value = {
      status: 'success',
      message: `${getActionTitle.value} berhasil!`,
      error: null
    };

  } catch (error) {
    console.error('Process error:', error);
    processState.value = {
      status: 'error',
      message: 'Terjadi kesalahan saat memproses.',
      error: error
    };

    // Show error message to user
    alert(`Maaf, terjadi kesalahan: ${error.message || 'Unknown error'}`);
  } finally {
    isGenerating.value = false;
  }
}

async function processWhatsAppShare() {
  try {
    // Clean up phone number - remove all non-numeric characters
    const phoneNumber = invoice.value.to.phone.replace(/\D/g, '');
    
    if (!phoneNumber) {
      throw new Error('Nomor telepon penerima invoice harus diisi untuk mengirim via WhatsApp');
    }
    
    // Add country code if not present (assuming Indonesia/62)
    const formattedPhone = phoneNumber.startsWith('62') ? phoneNumber :
      phoneNumber.startsWith('0') ? `62${phoneNumber.substring(1)}` : `62${phoneNumber}`;

    // Generate message text
    const message = `*Invoice dari ${invoice.value.from.name}*\n\n` +
      `Kepada: ${invoice.value.to.name}\n` +
      `Tanggal: ${formatDate(invoice.value.date)}\n` +
      `Total: ${formatCurrency(calculateTotal())}\n\n` +
      `Detail Item:\n${invoice.value.items.map(item => 
        `- ${item.description}: ${formatCurrency(item.total)}`
      ).join('\n')}\n\n` +
      `Subtotal: ${formatCurrency(calculateSubtotal())}\n` +
      (invoice.value.showTax ? `Pajak (${invoice.value.taxRate}%): ${formatCurrency(calculateTaxAmount())}\n` : '') +
      `*Total: ${formatCurrency(calculateTotal())}*\n\n` +
      (invoice.value.notes ? `Catatan: ${invoice.value.notes}\n\n` : '') +
      `Dibuat dengan https://faktur.web.id`;

    // Track successful WhatsApp share attempt
    invoiceEvents.create(invoice.value.title || 'Untitled Invoice', calculateTotal());

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the message and phone number
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    return true;
  } catch (error) {
    console.error('WhatsApp share error:', error);
    throw error;
  }
}

async function processEmailShare() {
  try {
    if (!invoice.value.to.email) {
      throw new Error('Email penerima invoice harus diisi untuk mengirim via Email');
    }

    // Generate email subject
    const subject = `Invoice dari ${invoice.value.from.name}`;

    // Generate email body
    const body = `Kepada ${invoice.value.to.name},\n\n` +
      `Berikut detail invoice Anda:\n\n` +
      `Tanggal: ${formatDate(invoice.value.date)}\n` +
      `Jatuh Tempo: ${formatDate(invoice.value.dueDate)}\n\n` +
      `Detail Item:\n${invoice.value.items.map(item => 
        `- ${item.description}\n  Jumlah: ${item.quantity}\n  Harga: ${formatCurrency(item.unitPrice)}\n  Total: ${formatCurrency(item.total)}`
      ).join('\n\n')}\n\n` +
      `Subtotal: ${formatCurrency(calculateSubtotal())}\n` +
      (invoice.value.showTax ? `Pajak (${invoice.value.taxRate}%): ${formatCurrency(calculateTaxAmount())}\n` : '') +
      `Total: ${formatCurrency(calculateTotal())}\n\n` +
      (invoice.value.notes ? `Catatan:\n${invoice.value.notes}\n\n` : '') +
      `Hormat kami,\n${invoice.value.from.name}\n\n` +
      `--\nDibuat dengan https://faktur.web.id`;

    // Track successful email share attempt
    invoiceEvents.create(invoice.value.title || 'Untitled Invoice', calculateTotal());

    // Encode subject and body for mailto URL
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    
    // Open default email client with pre-filled content
    window.location.href = `mailto:${invoice.value.to.email}?subject=${encodedSubject}&body=${encodedBody}`;

    return true;
  } catch (error) {
    console.error('Email share error:', error);
    throw error;
  }
}

async function processPDFDownload() {
  if (!invoicePrintRef.value) {
    alert('Error: PDF container not found. Please try refreshing the page.');
    return;
  }

  try {
    console.log('Starting PDF generation...');
    isGenerating.value = true;
    pdfGenerationStatus.value = 'Preparing document...';
    pdfGenerationProgress.value = 10;
    
    // Add class to body to prevent scrolling
    document.body.classList.add('generating-pdf');

    // Track PDF generation start
    invoiceEvents.download(invoice.value.title || 'Untitled Invoice', calculateTotal());

    // Add PDF class and remove shadows
    const element = invoicePrintRef.value;
    element.classList.add('pdf-mode');
    
    // Update progress
    pdfGenerationStatus.value = 'Processing content...';
    pdfGenerationProgress.value = 30;
    await updateProgressWithDelay(40);
    
    // Remove all shadow-related classes
    element.querySelectorAll('[class*="shadow"]').forEach(el => {
      const classes = Array.from(el.classList);
      classes.forEach(cls => {
        if (cls.includes('shadow')) {
          el.classList.remove(cls);
        }
      });
    });

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
          img.onload = () => {
            resolve();
          };
          img.onerror = () => {
            resolve(); // Continue even if image fails to load
          };
        }
      });
    }));

    // Update progress
    pdfGenerationStatus.value = 'Generating PDF...';
    pdfGenerationProgress.value = 70;
    await updateProgressWithDelay(80);

    // A4 dimensions in pixels (96 DPI)
    const a4Width = 794;  // 210mm
    const a4Height = 1123; // 297mm

    const options = {
      margin: 8,
      filename: `faktur-${invoice.value.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`,
      image: { 
        type: 'jpeg', 
        quality: 0.98 
      },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        allowTaint: true,
        letterSpacing: true,
        scrollY: 0,
        width: a4Width - 16,
        height: a4Height - 10,
        windowWidth: a4Width - 16,
        windowHeight: a4Height - 10,
        removeContainer: true,
        backgroundColor: '#ffffff',
        logging: true, // Enable logging
        onclone: (clonedDoc) => {
          console.log('Cloning document for PDF...');
          // Ensure all content is visible in the clone
          const clonedElement = clonedDoc.querySelector('.pdf-mode');
          if (clonedElement) {
            clonedElement.style.display = 'block';
            clonedElement.style.visibility = 'visible';
            clonedElement.style.opacity = '1';
            clonedElement.style.position = 'relative';
            clonedElement.style.height = 'auto';
            clonedElement.style.overflow = 'visible';
            console.log('PDF mode styles applied to clone');
          } else {
            console.warn('Could not find .pdf-mode element in clone');
          }
        }
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true,
        hotfixes: ['px_scaling'],
        putOnlyUsedFonts: true,
        precision: 16
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Add a small delay to ensure all styles are applied
    await updateProgressWithDelay(90);

    console.log('Generating PDF with options:', options);
    
    // Generate PDF
    pdfGenerationStatus.value = 'Finalizing document...';
    const pdf = await html2pdf()
      .from(element)
      .set(options)
      .save();

    // Update progress to 100% when complete
    pdfGenerationProgress.value = 100;
    pdfGenerationStatus.value = 'PDF downloaded successfully!';
      
    // Add a delay before hiding the overlay for user to see success message
    await new Promise(resolve => setTimeout(resolve, 1000));
      
    console.log('PDF generation completed');
    element.classList.remove('pdf-mode');
    
    // Reset status and progress
    pdfGenerationStatus.value = '';
    pdfGenerationProgress.value = 0;
    
    return true;
  } catch (error) {
    console.error('PDF generation error:', error);
    pdfGenerationStatus.value = 'Error generating PDF. Please try again.';
    // Show error for 2 seconds then hide overlay
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Reset status and progress
    pdfGenerationStatus.value = '';
    pdfGenerationProgress.value = 0;
    return false;
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

// Update validation to include more specific checks
function validateGuestInfo() {
  formErrors.value = {
    name: '',
    email: ''
  };

  let isValid = true;

  // Validate name
  if (!guestInfo.value.name.trim()) {
    formErrors.value.name = 'Nama harus diisi';
    isValid = false;
  }

  // Validate email
  if (!guestInfo.value.email.trim()) {
    formErrors.value.email = 'Email harus diisi';
    isValid = false;
  } else if (!validateEmail(guestInfo.value.email)) {
    formErrors.value.email = 'Format email tidak valid';
    isValid = false;
  }

  // Validate based on share method
  switch (shareMethod.value) {
    case 'whatsapp':
      if (!invoice.value.to.phone) {
        alert('Nomor telepon penerima invoice harus diisi untuk mengirim via WhatsApp');
        isValid = false;
      }
      break;
    case 'email':
      if (!invoice.value.to.email) {
        alert('Email penerima invoice harus diisi untuk mengirim via Email');
        isValid = false;
      }
      break;
  }

  return isValid;
}

// Helper function to validate email format
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Function to set language
function setLanguage(lang) {
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
    
    // If we have invoice data, update its language preference
    if (invoice.value) {
      invoice.value._language = lang;
    }
  }
}

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

// Computed translations using our direct method
const translations = computed(() => {
  // Get current language
  const lang = currentLocale.value;
  
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
    notesPlaceholder: getTranslation(lang, 'invoice', 'notesPlaceholder'),
    showTax: getTranslation(lang, 'invoice', 'showTax') || 'Tampilkan Pajak',
    hideTax: getTranslation(lang, 'invoice', 'hideTax') || 'Sembunyikan Pajak'
  };
});

function shareToWhatsApp() {
  shareMethod.value = 'whatsapp';
  showRegisterModal.value = true;
  
  // Track the modal view using the correct method
  invoiceEvents.create(
    invoice.value.title || 'Untitled Invoice',
    calculateTotal()
  );
}

function shareViaEmail() {
  shareMethod.value = 'email';
  showRegisterModal.value = true;
  
  // Track the modal view using the correct method
  invoiceEvents.create(
    invoice.value.title || 'Untitled Invoice',
    calculateTotal()
  );
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
      
      // Save the language preference
      currentData._language = currentLocale.value;
      
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

// Add computed properties for dynamic text
const getActionTitle = computed(() => {
  switch (shareMethod.value) {
    case 'whatsapp':
      return 'Kirim';
    case 'email':
      return 'Kirim';
    default:
      return 'Download';
  }
});

const getActionButtonText = computed(() => {
  switch (shareMethod.value) {
    case 'whatsapp':
      return 'KIRIM KE WHATSAPP';
    case 'email':
      return 'KIRIM VIA EMAIL';
    default:
      return 'DOWNLOAD INVOICE PDF';
  }
});

const getActionText = computed(() => {
  switch (shareMethod.value) {
    case 'whatsapp':
      return 'kirim';
    case 'email':
      return 'kirim';
    default:
      return 'download';
  }
});
</script>

<style scoped>
@import '../assets/mobile-styles.css';

/* PDF mode styles */
:deep(.pdf-mode) {
  width: 778px !important;
  height: 1113px !important;
  margin: 0 !important;
  padding: 8mm 8mm 2mm 8mm !important;
  background: white !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
  transform-origin: top center !important;
  display: flex !important;
  flex-direction: column !important;
  border: 1px solid #000 !important;
  border-radius: 0 !important;
  page-break-after: avoid !important;
  page-break-inside: avoid !important;
  break-after: avoid !important;
  break-inside: avoid !important;
}

/* Super compact spacing */
:deep(.pdf-mode *) {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

:deep(.pdf-mode .mb-8),
:deep(.pdf-mode .mb-10),
:deep(.pdf-mode .mb-6),
:deep(.pdf-mode .mb-4),
:deep(.pdf-mode .mt-6) {
  margin: 2mm 0 !important;
}

/* Compact text sizes */
:deep(.pdf-mode .text-base),
:deep(.pdf-mode .text-lg),
:deep(.pdf-mode .text-xl),
:deep(.pdf-mode .text-2xl),
:deep(.pdf-mode .text-sm) {
  font-size: 7pt !important;
  line-height: 1.1 !important;
  margin: 1mm 0 !important;
}

:deep(.pdf-mode .text-2xl) {
  font-size: 9pt !important;
}

/* Compact table */
:deep(.pdf-mode table) {
  width: 100% !important;
  margin: 2mm 0 !important;
  font-size: 7pt !important;
  border-collapse: collapse !important;
  page-break-inside: avoid !important;
  break-inside: avoid !important;
}

:deep(.pdf-mode td),
:deep(.pdf-mode th) {
  padding: 1mm !important;
  font-size: 7pt !important;
  line-height: 1.1 !important;
}

/* Grid layout */
:deep(.pdf-mode .grid) {
  gap: 2mm !important;
  margin: 2mm 0 !important;
  page-break-inside: avoid !important;
  break-inside: avoid !important;
}

/* Logo size */
:deep(.pdf-mode .w-32),
:deep(.pdf-mode .h-32),
:deep(.pdf-mode .w-40),
:deep(.pdf-mode .h-40) {
  width: 20mm !important;
  height: 20mm !important;
  min-width: 20mm !important;
  min-height: 20mm !important;
  max-width: 20mm !important;
  max-height: 20mm !important;
}

/* Notes section */
:deep(.pdf-mode .notes) {
  margin: 2mm 0 !important;
  page-break-inside: avoid !important;
  break-inside: avoid !important;
}

:deep(.pdf-mode .notes div) {
  padding: 1mm !important;
  margin: 1mm 0 !important;
  page-break-inside: avoid !important;
  break-inside: avoid !important;
}

/* Footer */
:deep(.pdf-mode .watermark-footer) {
  width: 100% !important;
  margin: 2mm auto 0 !important;
  padding: 1mm 0 !important;
  text-align: center !important;
  position: relative !important;
  bottom: 0 !important;
  page-break-before: avoid !important;
  break-before: avoid !important;
}

/* Force single page */
:deep(.pdf-mode),
:deep(.pdf-mode *) {
  break-inside: avoid !important;
  break-before: avoid !important;
  break-after: avoid !important;
}

/* PDF Generation Loading Overlay - Fallback styles if CSS file doesn't load */
/* These styles are provided as fallbacks but will be overridden by the CSS file */
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