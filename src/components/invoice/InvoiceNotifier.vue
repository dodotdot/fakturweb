<template>
  <div class="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
    <h3 class="text-lg font-semibold mb-4">Kirim Notifikasi Invoice</h3>
    
    <div v-if="!invoice?.to">
      <p class="text-gray-500 text-center py-4">
        Tambahkan detail client untuk menggunakan fitur notifikasi
      </p>
    </div>
    
    <div v-else>
      <div class="space-y-4">
        <!-- Email Option -->
        <div class="flex items-center justify-between border-b pb-3">
          <div>
            <h4 class="font-medium">Email</h4>
            <p class="text-sm text-gray-500">Kirim invoice melalui email ke {{ invoice.to.email || 'client' }}</p>
          </div>
          <button 
            @click="sendEmailNotification"
            class="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 flex items-center gap-2"
            :disabled="isSendingEmail || !invoice.to.email"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {{ isSendingEmail ? 'Mengirim...' : 'Kirim' }}
          </button>
        </div>
        
        <!-- WhatsApp Option -->
        <div class="flex items-center justify-between border-b pb-3">
          <div>
            <h4 class="font-medium">WhatsApp</h4>
            <p class="text-sm text-gray-500">Kirim link invoice melalui WhatsApp ke {{ invoice.to.phone || 'client' }}</p>
          </div>
          <button 
            @click="sendWhatsAppNotification"
            class="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
            :disabled="isSendingWhatsApp || !invoice.to.phone"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            {{ isSendingWhatsApp ? 'Mengirim...' : 'Kirim' }}
          </button>
        </div>
        
        <!-- SMS Option -->
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-medium">SMS</h4>
            <p class="text-sm text-gray-500">Kirim link invoice melalui SMS ke {{ invoice.to.phone || 'client' }}</p>
          </div>
          <button 
            @click="sendSMSNotification"
            class="px-3 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50 flex items-center gap-2"
            :disabled="isSendingSMS || !invoice.to.phone"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            {{ isSendingSMS ? 'Mengirim...' : 'Kirim' }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Success Toast Notification -->
    <div 
      v-if="showSuccessToast"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg flex items-center gap-2 z-50 animate-fade-in-up"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>{{ successMessage }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { supabase } from '../../lib/supabase';
import html2pdf from 'html2pdf.js';

const props = defineProps({
  invoice: {
    type: Object,
    required: true
  },
  invoicePrintRef: {
    type: Object,
    required: true
  }
});

const isSendingEmail = ref(false);
const isSendingWhatsApp = ref(false);
const isSendingSMS = ref(false);
const showSuccessToast = ref(false);
const successMessage = ref('');

// Function to show success toast
function showToast(message) {
  successMessage.value = message;
  showSuccessToast.value = true;
  setTimeout(() => {
    showSuccessToast.value = false;
  }, 5000);
}

// Send invoice via email
async function sendEmailNotification() {
  if (!props.invoice || !props.invoice.to?.email) {
    alert('Email client tidak ditemukan. Silakan update invoice dengan alamat email client.');
    return;
  }

  console.log('Sending email for invoice with status:', props.invoice.status);
  
  if (props.invoice.status !== 'completed' && props.invoice.status !== 'sent') {
    alert('Invoice harus berstatus "completed" atau "sent" sebelum dapat dikirim via email. Silakan tandai invoice sebagai selesai terlebih dahulu.');
    return;
  }

  isSendingEmail.value = true;
  
  try {
    // Generate PDF for attachment
    let pdfBlob = null;
    
    // Create a temporary wrapper for PDF generation
    const printWrapper = document.createElement('div');
    printWrapper.className = 'pdf-content-wrapper';
    document.body.appendChild(printWrapper);
    
    // Clone the invoice content
    const contentClone = props.invoicePrintRef.cloneNode(true);
    
    // Remove any no-print elements from the clone
    const noPrintElements = contentClone.querySelectorAll('.no-print');
    noPrintElements.forEach(el => el.remove());
    
    // Add the cloned content to the wrapper
    printWrapper.appendChild(contentClone);
    
    // Configure html2pdf options
    const options = {
      margin: 10,
      filename: `invoice-${props.invoice.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`,
      image: { 
        type: 'jpeg', 
        quality: 0.98 
      },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        allowTaint: true,
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait'
      },
      output: 'blob'
    };

    // Generate PDF blob
    pdfBlob = await html2pdf().from(printWrapper).set(options).output('blob');
    
    // Clean up
    document.body.removeChild(printWrapper);
    
    // Create FormData with the PDF file
    const formData = new FormData();
    formData.append('pdf', pdfBlob, `invoice-${props.invoice.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`);
    formData.append('invoiceId', props.invoice.id);
    formData.append('clientEmail', props.invoice.to.email);
    formData.append('clientName', props.invoice.to.name);
    formData.append('invoiceTitle', props.invoice.title);
    
    // Call Supabase Edge Function to send email
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-invoice-email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session.access_token}`,
      },
      body: formData
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Gagal mengirim email');
    }
    
    // Show success message
    showToast('Email berhasil dikirim ke client!');
    
  } catch (error) {
    console.error('Error sending email:', error);
    alert(`Error mengirim email: ${error.message || 'Gagal mengirim email'}`);
  } finally {
    isSendingEmail.value = false;
  }
}

// Send invoice link via WhatsApp
async function sendWhatsAppNotification() {
  if (!props.invoice || !props.invoice.to?.phone) {
    alert('Nomor telepon client tidak ditemukan. Silakan update invoice dengan nomor telepon client.');
    return;
  }

  isSendingWhatsApp.value = true;
  
  try {
    // Generate share link if needed
    let shareLink = props.invoice._shareLink;
    
    if (!shareLink) {
      // Generate share link through your existing functionality
      // This is a placeholder - implement based on your actual share link generation
      const baseUrl = window.location.origin;
      shareLink = `${baseUrl}/invoice/public/${props.invoice.id}`;
    }
    
    // Call Supabase Edge Function to send WhatsApp
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-invoice-whatsapp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session.access_token}`,
      },
      body: JSON.stringify({
        invoiceId: props.invoice.id,
        clientPhone: props.invoice.to.phone,
        clientName: props.invoice.to.name,
        invoiceTitle: props.invoice.title,
        shareLink
      })
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Gagal mengirim WhatsApp');
    }
    
    // Show success message
    showToast('WhatsApp berhasil dikirim ke client!');
    
  } catch (error) {
    console.error('Error sending WhatsApp:', error);
    alert(`Error mengirim WhatsApp: ${error.message || 'Gagal mengirim WhatsApp'}`);
  } finally {
    isSendingWhatsApp.value = false;
  }
}

// Send invoice link via SMS
async function sendSMSNotification() {
  if (!props.invoice || !props.invoice.to?.phone) {
    alert('Nomor telepon client tidak ditemukan. Silakan update invoice dengan nomor telepon client.');
    return;
  }

  isSendingSMS.value = true;
  
  try {
    // Generate share link if needed
    let shareLink = props.invoice._shareLink;
    
    if (!shareLink) {
      // Generate share link through your existing functionality
      // This is a placeholder - implement based on your actual share link generation
      const baseUrl = window.location.origin;
      shareLink = `${baseUrl}/invoice/public/${props.invoice.id}`;
    }
    
    // Call Supabase Edge Function to send SMS
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-invoice-sms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session.access_token}`,
      },
      body: JSON.stringify({
        invoiceId: props.invoice.id,
        clientPhone: props.invoice.to.phone,
        clientName: props.invoice.to.name,
        invoiceTitle: props.invoice.title,
        shareLink
      })
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Gagal mengirim SMS');
    }
    
    // Show success message
    showToast('SMS berhasil dikirim ke client!');
    
  } catch (error) {
    console.error('Error sending SMS:', error);
    alert(`Error mengirim SMS: ${error.message || 'Gagal mengirim SMS'}`);
  } finally {
    isSendingSMS.value = false;
  }
}
</script>

<style scoped>
/* Toast animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out forwards;
}
</style> 