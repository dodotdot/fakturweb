<template>
  <div class="min-h-screen py-12">
    <div class="container mx-auto max-w-4xl">
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
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-lg font-semibold mb-0">{{ translations.chooseTheme }}</h3>
          
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
            <div class="bg-yellow-50 p-3 rounded">
              <div class="h-10 border-b border-yellow-200 mb-2"></div>
              <div class="flex space-x-2 mb-2">
                <div class="w-10 h-10 bg-navy-500 rounded-lg"></div>
                <div class="flex-1 h-10 bg-yellow-100 rounded"></div>
              </div>
              <div class="h-4 bg-yellow-100 w-1/2 rounded mb-2"></div>
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
            'bg-yellow-50 border-yellow-200': selectedTheme === 'elegant'
          }
        ]" 
        ref="invoicePrintRef"
      >
        <!-- Invoice Header -->
        <div class="flex flex-col md:flex-row justify-between items-start mb-10">
          <!-- Logo -->
          <div class="w-1/2 md:w-1/2 flex items-center justify-center mb-4 md:mb-0">
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
              <span class="p-8" :class="{
                'text-gray-400': selectedTheme === 'classic',
                'text-blue-400': selectedTheme === 'modern',
                'text-navy-500': selectedTheme === 'elegant'
              }">{{ translations.uploadLogo }}</span>
            </div>
          </div>
          
          <div class="w-1/2 md:w-1/2 md:ml-8">
            <div 
              :class="[
                'text-3xl font-bold mb-2 text-right',
                {
                  'text-gray-800': selectedTheme === 'classic',
                  'text-blue-800': selectedTheme === 'modern',
                  'text-navy-900': selectedTheme === 'elegant'
                }
              ]"
            >{{ invoice.title }}</div>
            <div class="flex flex-col space-y-1 items-end">
              <div class="flex items-center">
                <span :class="{
                  'text-gray-500': selectedTheme === 'classic',
                  'text-blue-500': selectedTheme === 'modern',
                  'text-navy-600': selectedTheme === 'elegant'
                }" class="w-24">{{ translations.date }}:</span>
                <span>{{ formatDate(invoice.date) }}</span>
              </div>
              <div class="flex items-center">
                <span :class="{
                  'text-gray-500': selectedTheme === 'classic',
                  'text-blue-500': selectedTheme === 'modern',
                  'text-navy-600': selectedTheme === 'elegant'
                }" class="w-24">{{ translations.dueDate }}:</span>
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
            }" class="mb-2 text-base">{{ invoice.from.address }}</div>
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
            }" class="mb-2 text-base">{{ invoice.to.address }}</div>
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
              <div class="flex justify-between py-2">
                <span :class="{
                  'text-gray-600': selectedTheme === 'classic',
                  'text-blue-700': selectedTheme === 'modern',
                  'text-navy-700': selectedTheme === 'elegant'
                }" class="text-base">{{ translations.taxRate }}: {{ invoice.taxRate }}%</span>
                <span class="text-base">{{ formatCurrency(calculateTaxAmount()) }}</span>
              </div>
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
            'bg-gray-50': selectedTheme === 'classic',
            'bg-blue-100': selectedTheme === 'modern',
            'bg-yellow-100': selectedTheme === 'elegant'
          }" class="p-3 rounded-md text-base">{{ invoice.notes }}</div>
        </div>

        <!-- Add watermark footer at the bottom of the invoice -->
        <div class="watermark-footer">
          <p 
            :class="{
              'text-gray-700': selectedTheme === 'classic',
              'text-blue-700': selectedTheme === 'modern',
              'text-navy-500': selectedTheme === 'elegant'
            }"
          >
            Powered by 🔥 <img src="/images/faktur-logo.svg" alt="Faktur Logo" class="inline-block h-10 w-10 pdf-logo">
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Registration Benefits Modal -->
  <div v-if="showRegisterModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      
      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
        <div class="flex flex-col md:flex-row">
          <!-- Left side (benefits) - hidden on mobile -->
          <div class="hidden md:block bg-gray-800 text-white p-6 md:p-8 md:w-1/2">
            <button @click="showRegisterModal = false" class="absolute top-4 right-4 text-white hover:text-gray-300">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
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
            <!-- Close button for mobile view -->
            <button @click="showRegisterModal = false" class="md:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div class="text-center mb-8">
              <h3 class="text-2xl font-light text-gray-400">Download</h3>
              <h2 class="text-4xl font-light text-gray-400 mb-4">invoice di sini</h2>
              
              <svg class="h-16 w-16 mx-auto text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
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
              class="w-full mb-4 py-3 px-6 bg-primary text-white font-medium rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              :disabled="isGenerating"
            >
              <span v-if="isGenerating">
                <svg class="animate-spin -ml-1 mr-2 h-5 w-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                LAGI PROSES...
              </span>
              <span v-else>DOWNLOAD INVOICE PDF</span>
            </button>
            <p class="text-center text-sm text-gray-500">Bisa download dulu, tapi coba deh daftar juga, nanti jadi lebih gampang!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
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
  // Show the registration modal instead of immediately downloading
  showRegisterModal.value = true;
  
  // Track the modal view
  invoiceEvents.view('registration_modal', {
    source: 'invoice_preview',
    invoice_title: invoice.value.title || 'Untitled Invoice'
  });
}

function processDownload() {
  // Validate form inputs
  let isValid = true;
  formErrors.value = { name: '', email: '' };
  
  if (!guestInfo.value.name.trim()) {
    formErrors.value.name = 'Nama harus diisi';
    isValid = false;
  }
  
  if (!guestInfo.value.email.trim()) {
    formErrors.value.email = 'Email harus diisi';
    isValid = false;
  } else if (!validateEmail(guestInfo.value.email)) {
    formErrors.value.email = 'Format email tidak valid';
    isValid = false;
  }
  
  if (!isValid) {
    return;
  }
  
  if (!invoicePrintRef.value) return;
  
  isGenerating.value = true;
  showRegisterModal.value = false; // Close the modal

  // Track the download event using the utility with comprehensive data
  trackGuestPdfGeneration({
    invoiceTitle: invoice.value.title,
    invoiceTotal: calculateTotal(),
    userAgent: navigator.userAgent,
    guestName: guestInfo.value.name || 'Anonymous',
    guestEmail: guestInfo.value.email || null
  });

  // Save guest info if checkbox is checked
  if (guestInfo.value.saveInfo && isLocalStorageAvailable()) {
    try {
      localStorage.setItem('guest_info', JSON.stringify({
        name: guestInfo.value.name,
        email: guestInfo.value.email
      }));
    } catch (e) {
      console.warn('Failed to save guest info to localStorage:', e);
    }
  }

  // Create a simplified version of the invoice for PDF generation
  const invoiceElement = invoicePrintRef.value;
  
  // Create a new div for PDF generation
  const pdfContainer = document.createElement('div');
  pdfContainer.style.width = '210mm'; // A4 width
  pdfContainer.style.padding = '10mm'; // Reduced padding
  pdfContainer.style.backgroundColor = 'white';
  pdfContainer.style.color = 'black';
  pdfContainer.style.fontFamily = 'Arial, sans-serif';
  pdfContainer.style.boxSizing = 'border-box';
  pdfContainer.style.overflow = 'hidden'; // Prevent overflow
  
  // Clone the invoice content
  const content = invoiceElement.cloneNode(true);
  
  // Add a class to the content for PDF-specific styling
  content.classList.add('pdf-content');
  
  // Handle SVG images differently - convert to data URL if possible
  const svgImages = content.querySelectorAll('img[src$=".svg"]');
  svgImages.forEach(img => {
    // For the logo in the footer, use a special approach
    if (img.classList.contains('pdf-logo')) {
      // Create a text-based fallback for the logo
      const logoText = document.createElement('span');
      logoText.textContent = 'FAKTUR';
      logoText.style.fontWeight = 'bold';
      logoText.style.fontSize = '12px';
      logoText.style.color = '#FF0000'; // Red color
      logoText.style.display = 'inline-block';
      logoText.style.verticalAlign = 'middle';
      logoText.style.marginLeft = '5px';
      
      // Replace the SVG with the text
      img.parentNode.replaceChild(logoText, img);
    } else {
      // For other SVGs, use the placeholder approach
      const placeholder = document.createElement('div');
      placeholder.style.width = '40px';
      placeholder.style.height = '40px';
      placeholder.style.backgroundColor = '#f0f0f0';
      placeholder.style.display = 'inline-block';
      placeholder.style.verticalAlign = 'middle';
      placeholder.style.textAlign = 'center';
      placeholder.style.lineHeight = '40px';
      placeholder.textContent = 'LOGO';
      img.parentNode.replaceChild(placeholder, img);
    }
  });
  
  // Add the content to the PDF container
  pdfContainer.appendChild(content);
  
  // Add the container to the document temporarily
  document.body.appendChild(pdfContainer);
  
  // Configure PDF options
  const options = {
    margin: [5, 5, 5, 5], // Reduced margins
    filename: `faktur-${invoice.value.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`,
    image: { 
      type: 'jpeg', 
      quality: 0.98 
    },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: true,
      letterRendering: true,
      scrollY: 0,
      windowWidth: 210 * 3.78, // A4 width in pixels (210mm * 3.78 pixels/mm)
      windowHeight: 297 * 3.78 // A4 height in pixels (297mm * 3.78 pixels/mm)
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait',
      compress: true
    }
  };
  
  // Generate the PDF
  setTimeout(() => {
    html2pdf()
      .from(pdfContainer)
      .set(options)
      .save()
      .then(() => {
        // Clean up
        document.body.removeChild(pdfContainer);
        isGenerating.value = false;
        
        // Remove the currentInvoice data from localStorage after successful download
        localStorage.removeItem('currentInvoice');
      })
      .catch(error => {
        console.error('Error generating PDF:', error);
        // Clean up even if there's an error
        if (document.body.contains(pdfContainer)) {
          document.body.removeChild(pdfContainer);
        }
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

// Helper function to validate email format
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
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
    notesPlaceholder: getTranslation(lang, 'invoice', 'notesPlaceholder')
  };
});
</script>

<style scoped>
/* Define custom colors for themes */
:root {
  --navy-500: #1e3a8a;
  --navy-600: #1e40af;
  --navy-700: #1e429f;
  --navy-800: #1e3a8a;
  --navy-900: #172554;
}

/* Theme transition effects */
.container, .bg-white, .border, .text-gray-500, .text-gray-400, .text-gray-600, .border-gray-200, .bg-gray-50 {
  transition: all 0.3s ease-in-out;
}

/* Custom theme colors */
.bg-navy-500 {
  background-color: var(--navy-500);
}

.text-navy-500 {
  color: var(--navy-500);
}

.text-navy-600 {
  color: var(--navy-600);
}

.text-navy-700 {
  color: var(--navy-700);
}

.text-navy-800 {
  color: var(--navy-800);
}

.text-navy-900 {
  color: var(--navy-900);
}

/* Watermark footer styling */
.watermark-footer {
  margin-top: 30px;
  padding-top: 10px;
  text-align: center;
  position: relative;
  clear: both;
}

.watermark-footer p {
  font-size: 8px;
  opacity: 0.5;
  letter-spacing: 0.5px;
  font-family: 'Arial', sans-serif;
}

/* Fix for SVG logo in PDF */
.pdf-logo {
  display: inline-block;
  width: 40px !important;
  height: 40px !important;
  vertical-align: middle;
  object-fit: contain;
}

/* Critical styles for PDF generation */
.generating-pdf * {
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
  color-adjust: exact !important;
}

.generating-pdf .shadow-lg {
  box-shadow: none !important;
}

.generating-pdf .rounded-lg {
  border-radius: 0 !important;
}

.generating-pdf .bg-white,
.generating-pdf .bg-blue-50,
.generating-pdf .bg-yellow-50 {
  background-color: white !important;
}

.generating-pdf .border {
  border: 1px solid #e5e7eb !important;
}

.generating-pdf .p-8 {
  padding: 15px !important;
}

.generating-pdf .mb-10 {
  margin-bottom: 15px !important;
}

.generating-pdf .text-3xl {
  font-size: 16pt !important;
  line-height: 1.2 !important;
}

.generating-pdf .text-base {
  font-size: 9pt !important;
  line-height: 1.3 !important;
}

.generating-pdf .text-sm {
  font-size: 8pt !important;
  line-height: 1.2 !important;
}

.generating-pdf .text-xs {
  font-size: 7pt !important;
  line-height: 1.1 !important;
}

/* Make table text smaller for PDF */
.generating-pdf table {
  width: 100% !important;
  border-collapse: collapse !important;
  font-size: 6pt !important;
}

.generating-pdf th,
.generating-pdf td {
  padding: 2px !important;
  border-bottom: 1px solid #e5e7eb !important;
  font-size: 6pt !important;
  line-height: 1 !important;
}

/* Make table rows more compact */
.generating-pdf tr {
  line-height: 1 !important;
}

/* PDF content specific styles */
.pdf-content {
  max-height: 277mm !important; /* A4 height minus margins */
  overflow: hidden !important;
}

.pdf-content .watermark-footer {
  margin-top: 15px !important;
  padding-top: 5px !important;
  border-top: 1px solid #e5e7eb !important;
  position: relative !important;
  bottom: 0 !important;
}

.generating-pdf .watermark-footer {
  margin-top: 15px !important;
  padding-top: 5px !important;
  border-top: 1px solid #e5e7eb !important;
}

@media print {
  .watermark-footer {
    position: fixed;
    bottom: 5mm;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 999;
    margin-top: 0;
    padding-top: 0;
  }
  
  /* Make sure base fonts are not too small in the invoice */
  p, span, div {
    font-size: 10pt !important;
  }
  
  /* Header size for better readability */
  h3 {
    font-size: 11pt !important;
  }
  
  /* Ensure table content is readable but compact */
  table {
    font-size: 6pt !important;
  }
  
  table td, table th {
    font-size: 6pt !important;
    padding: 1.5mm !important;
    line-height: 1 !important;
  }
  
  /* Ensure SVG logo displays correctly in PDF */
  .pdf-logo {
    width: 40px !important;
    height: 40px !important;
    display: inline-block !important;
    vertical-align: middle !important;
  }
}

/* PDF generation specific styles */
:global(.generating-pdf) {
  height: auto !important;
  overflow: visible !important;
}

:global(.generating-pdf *) {
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}

:global(.generating-pdf) .watermark-footer p {
  font-size: 8px !important;
  opacity: 0.5 !important;
}

:global(.generating-pdf) .pdf-logo {
  width: 40px !important;
  height: 40px !important;
  display: inline-block !important;
  vertical-align: middle !important;
}

/* Adjust general text sizing to prevent small text */
.text-sm {
  font-size: 0.875rem !important;
  line-height: 1.25rem !important;
}

/* Ensure From/To section text is readable */
.from-details div, .to-details div,
.from-details span, .to-details span {
  font-size: 0.875rem !important;
}

/* Mobile header layout */
@media (max-width: 1023px) {
  .flex.flex-col.md\:flex-row {
    flex-direction: row !important;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .w-1\/2 {
    width: 50% !important;
    min-width: 0;
  }

  .text-3xl {
    font-size: 1.25rem;
    line-height: 1.5rem;
    margin-bottom: 0.5rem;
    text-align: left;
  }

  .flex.flex-col.space-y-1.items-end {
    align-items: flex-start;
  }

  .flex.items-center {
    font-size: 0.875rem;
  }

  .text-gray-500.w-24 {
    width: 4rem;
  }
}

/* Small devices (phones) */
@media (max-width: 640px) {
  .flex.flex-col.md\:flex-row {
    gap: 0.75rem;
  }

  .w-1\/2 {
    width: 50% !important;
  }

  .text-3xl {
    font-size: 1.125rem;
  }

  .flex.items-center {
    font-size: 0.8125rem;
  }
}
</style> 