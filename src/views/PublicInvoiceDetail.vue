<template>
  <div class="min-h-screen">
    <div class="container mx-auto max-w-4xl">
      <div class="bg-white shadow-lg p-8 rounded-lg border border-gray-200 transform transition-all duration-300 hover:shadow-xl">
        <div class="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 pb-8 no-print">
              Invoice
            </h1>
            <p class="text-gray-500 no-print">
              View and download this invoice
            </p>
          </div>
          <div class="flex gap-3 no-print">
            <button 
              @click="downloadPDF"
              class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-70"
              :disabled="isPrinting"
            >
              {{ isPrinting ? 'Generating PDF...' : 'Download PDF' }}
            </button>
          </div>
        </div>
        
        <div v-if="error" class="my-4 p-4 bg-red-50 text-red-500 rounded-md no-print">
          {{ error }}
        </div>
        
        <div v-if="isLoading" class="flex justify-center my-8 no-print">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>

        <div v-else-if="!invoice" class="my-4 p-4 bg-red-50 text-red-500 rounded-md">
          Invoice not found or has been deleted.
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
            <table class="w-full">
              <thead>
                <tr :class="{
                  'bg-gray-50': selectedTheme === 'classic',
                  'bg-blue-100': selectedTheme === 'modern',
                  'bg-gray-800': selectedTheme === 'elegant'
                }">
                  <th class="py-3 px-4 text-left">Item</th>
                  <th class="py-3 px-4 text-right">Quantity</th>
                  <th class="py-3 px-4 text-right">Rate</th>
                  <th class="py-3 px-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in invoice.items" :key="index" 
                  :class="{
                    'border-b border-gray-200': selectedTheme === 'classic',
                    'border-b border-blue-200': selectedTheme === 'modern',
                    'border-b border-gray-700': selectedTheme === 'elegant'
                  }"
                >
                  <td class="py-4 px-4">
                    <div class="font-medium">{{ item.name }}</div>
                    <div :class="{
                      'text-gray-500': selectedTheme === 'classic',
                      'text-blue-600': selectedTheme === 'modern',
                      'text-gray-400': selectedTheme === 'elegant'
                    }" class="text-sm">{{ item.description }}</div>
                  </td>
                  <td class="py-4 px-4 text-right">{{ item.quantity }}</td>
                  <td class="py-4 px-4 text-right">{{ formatCurrency(item.rate || item.unitPrice) }}</td>
                  <td class="py-4 px-4 text-right">{{ formatCurrency(calculateItemTotal(item)) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Invoice Summary -->
          <div class="flex justify-end">
            <div class="w-full md:w-1/2">
              <div class="flex justify-between py-2" :class="{
                'border-b border-gray-200': selectedTheme === 'classic',
                'border-b border-blue-200': selectedTheme === 'modern',
                'border-b border-gray-700': selectedTheme === 'elegant'
              }">
                <span :class="{
                  'text-gray-600': selectedTheme === 'classic',
                  'text-blue-600': selectedTheme === 'modern',
                  'text-gray-300': selectedTheme === 'elegant'
                }">Subtotal:</span>
                <span>{{ formatCurrency(calculateSubtotal) }}</span>
              </div>
              <div class="flex justify-between py-2" :class="{
                'border-b border-gray-200': selectedTheme === 'classic',
                'border-b border-blue-200': selectedTheme === 'modern',
                'border-b border-gray-700': selectedTheme === 'elegant'
              }">
                <span :class="{
                  'text-gray-600': selectedTheme === 'classic',
                  'text-blue-600': selectedTheme === 'modern',
                  'text-gray-300': selectedTheme === 'elegant'
                }">Tax ({{ invoice.tax_rate || 0 }}%):</span>
                <span>{{ formatCurrency(calculateTax) }}</span>
              </div>
              <div class="flex justify-between py-3 font-bold text-lg">
                <span :class="{
                  'text-gray-800': selectedTheme === 'classic',
                  'text-blue-800': selectedTheme === 'modern',
                  'text-white': selectedTheme === 'elegant'
                }">Total:</span>
                <span :class="{
                  'text-gray-800': selectedTheme === 'classic',
                  'text-blue-800': selectedTheme === 'modern',
                  'text-yellow-500': selectedTheme === 'elegant'
                }">{{ formatCurrency(calculateTotal) }}</span>
              </div>
            </div>
          </div>
          
          <!-- Notes -->
          <div class="mt-10" v-if="invoice.notes">
            <h3 :class="{
              'text-gray-600': selectedTheme === 'classic',
              'text-blue-600': selectedTheme === 'modern',
              'text-yellow-500': selectedTheme === 'elegant'
            }" class="text-sm font-medium mb-2">Notes:</h3>
            <p :class="{
              'text-gray-600': selectedTheme === 'classic',
              'text-blue-700': selectedTheme === 'modern',
              'text-gray-300': selectedTheme === 'elegant'
            }" class="whitespace-pre-line">{{ invoice.notes }}</p>
          </div>
          
          <!-- Powered by watermark -->
          <div class="mt-16 text-center text-sm" :class="{
            'text-gray-400': selectedTheme === 'classic',
            'text-blue-400': selectedTheme === 'modern',
            'text-gray-500': selectedTheme === 'elegant'
          }">
            Powered by 🔥 <a href="/" class="underline">Faktur.web.id</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- PDF Generation Loading Overlay -->
  <div class="pdf-generating-overlay" :class="{ 'active': isPrinting }" aria-live="polite">
    <!-- Mobile-specific elements (shown only on mobile) -->
    <div class="pdf-generating-spinner"></div>
    <div class="pdf-generating-text">{{ pdfGenerationStatus }}</div>
    <div class="pdf-generating-progress">
      <div class="pdf-generating-progress-bar" :style="{ width: pdfGenerationProgress + '%' }"></div>
    </div>
    
    <!-- Desktop-specific elements (hidden on mobile) -->
    <div class="desktop-pdf-spinner"></div>
    <div class="desktop-pdf-text">{{ pdfGenerationStatus }}</div>
    <div class="desktop-pdf-progress">
      <div class="pdf-generating-progress-bar" :style="{ width: pdfGenerationProgress + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { supabase } from '../lib/supabase';
import html2pdf from 'html2pdf.js';

const route = useRoute();
const invoiceId = route.params.id;
const invoice = ref(null);
const isLoading = ref(true);
const error = ref(null);
const isPrinting = ref(false);
const invoicePrintRef = ref(null);
const selectedTheme = ref('classic');  // Default theme

// Additional state for PDF generation
const pdfGenerationStatus = ref('Preparing document...');
const pdfGenerationProgress = ref(0);

// Fetch the invoice details
async function fetchInvoice() {
  try {
    isLoading.value = true;
    error.value = null;
    
    const { data, error: fetchError } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', invoiceId)
      .eq('is_public', true)  // Only fetch if the invoice is marked as public
      .single();
    
    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        error.value = 'Invoice not found or is not publicly accessible';
      } else {
        error.value = fetchError.message;
      }
      return;
    }
    
    invoice.value = data;
    console.log('Fetched invoice:', data);
    console.log('Client info (to_details):', data.to_details);
    
    // Map database fields to component fields
    if (data) {
      // Create from and to fields from from_details and to_details
      invoice.value.from = data.from_details;
      invoice.value.to = data.to_details;
    }
    
    // Record view analytics
    recordAnalytics('view');
  } catch (err) {
    console.error('Error fetching invoice:', err);
    error.value = 'Failed to load invoice details. Please try again later.';
  } finally {
    isLoading.value = false;
  }
}

// Calculate invoice subtotal
const calculateSubtotal = computed(() => {
  if (!invoice.value || !invoice.value.items) return 0;
  
  return invoice.value.items.reduce((sum, item) => {
    return sum + calculateItemTotal(item);
  }, 0);
});

// Calculate individual item total with safe parsing
function calculateItemTotal(item) {
  if (!item) return 0;
  const quantity = parseFloat(item.quantity) || 0;
  // Handle both potential field names (rate from database and unitPrice from UI components)
  const price = parseFloat(item.rate || item.unitPrice) || 0;
  return quantity * price;
}

// Calculate tax amount
const calculateTax = computed(() => {
  if (!invoice.value) return 0;
  const taxRate = invoice.value.tax_rate || 0;
  return calculateSubtotal.value * (taxRate / 100);
});

// Calculate invoice total
const calculateTotal = computed(() => {
  return calculateSubtotal.value + calculateTax.value;
});

// Format currency
function formatCurrency(amount) {
  // Make sure amount is a valid number
  const numericAmount = Number(amount);
  if (isNaN(numericAmount)) return 'Rp0';
  
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numericAmount);
}

// Format date
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Update the downloadPDF function
async function downloadPDF() {
  if (!invoicePrintRef.value) return;
  
  try {
    isPrinting.value = true;
    pdfGenerationStatus.value = 'Preparing document...';
    pdfGenerationProgress.value = 10;
    
    // Add class to body to prevent scrolling
    document.body.classList.add('generating-pdf');
    
    const invoiceElement = invoicePrintRef.value;
    
    // Add PDF class to improve rendering
    invoiceElement.classList.add('pdf-mode');
    
    // Update progress
    pdfGenerationStatus.value = 'Processing content...';
    pdfGenerationProgress.value = 30;
    await updateProgressWithDelay(40);
    
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `Invoice-${invoice.value.title.replace(/\s+/g, '-')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        allowTaint: true,
        logging: true // Enable logging for debugging
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true // Add compression to help with iOS rendering
      }
    };
    
    // Check if this is Safari on iOS/iPadOS
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    // Update progress
    pdfGenerationStatus.value = 'Loading images...';
    pdfGenerationProgress.value = 50;
    await updateProgressWithDelay(60);
    
    // Ensure all images are loaded before PDF generation
    const images = invoiceElement.getElementsByTagName('img');
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
      await html2pdf().from(invoiceElement).set(opt).output('blob');
      
      pdfGenerationProgress.value = 90;
      pdfGenerationStatus.value = 'Finalizing document...';
      await updateProgressWithDelay(95);
      
      // Second generation (should be properly rendered)
      await html2pdf().from(invoiceElement).set(opt).save();
    } else {
      // Normal flow for non-Safari/iOS browsers
      pdfGenerationStatus.value = 'Finalizing document...';
      pdfGenerationProgress.value = 90;
      await updateProgressWithDelay(95);
      
      await html2pdf().from(invoiceElement).set(opt).save();
    }
    
    // Update progress to 100% when complete
    pdfGenerationProgress.value = 100;
    pdfGenerationStatus.value = 'PDF downloaded successfully!';
    
    // Add a delay before hiding the overlay for user to see success message
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Record this PDF generation for tracking
    try {
      recordAnalytics('download');
    } catch (trackError) {
      console.error('Error tracking PDF download:', trackError);
      // Continue anyway, as this is just for analytics
    }
    
    // Remove PDF mode class
    invoiceElement.classList.remove('pdf-mode');
  } catch (err) {
    console.error('Error generating PDF:', err);
    pdfGenerationStatus.value = 'Error generating PDF. Please try again.';
    // Show error for 2 seconds then hide overlay
    await new Promise(resolve => setTimeout(resolve, 2000));
  } finally {
    isPrinting.value = false;
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

// Record analytics when viewing or sharing
async function recordAnalytics(viewType = 'view') {
  try {
    await supabase.from('public_invoice_views').insert({
      invoice_id: invoiceId,
      view_type: viewType,
      ip_address: '',  // Server will capture this
      viewed_at: new Date()
    });
  } catch (err) {
    console.error(`Error recording ${viewType}:`, err);
    // Continue anyway, as this is just for analytics
  }
}

onMounted(() => {
  fetchInvoice();
});
</script>

<style scoped>
@import '../assets/mobile-styles.css';

/* PDF printing styles */
@media print {
  .no-print {
    display: none;
  }
}

/* Fallback styles for PDF overlay - these are overridden by mobile-styles.css */
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