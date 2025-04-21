<template>
  <div class="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
    <h3 class="text-lg font-semibold mb-4">Aktivitas Invoice</h3>
    
    <div v-if="isLoading" class="flex justify-center py-6">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
    </div>
    
    <div v-else-if="error" class="p-4 bg-red-50 text-red-500 rounded-md">
      {{ error }}
    </div>
    
    <div v-else-if="activities.length === 0" class="text-center py-6 text-gray-500">
      Belum ada aktivitas untuk invoice ini
    </div>
    
    <div v-else class="space-y-2">
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="p-3 border-l-4 bg-gray-50 rounded"
        :class="{
          'border-blue-500': activity.activity_type === 'status_changed',
          'border-green-500': activity.activity_type === 'email_sent' || (activity.activity_type === 'notification_sent' && activity.channel === 'email'),
          'border-yellow-500': activity.activity_type === 'viewed',
          'border-purple-500': activity.activity_type === 'payment_received',
          'border-indigo-500': activity.activity_type === 'notification_sent' && activity.channel === 'whatsapp',
          'border-orange-500': activity.activity_type === 'notification_sent' && activity.channel === 'sms'
        }"
      >
        <div class="flex justify-between mb-1">
          <span class="font-medium flex items-center">
            {{ formatActivityType(activity.activity_type, activity.channel) }}
            <span 
              v-if="activity.channel" 
              class="ml-2 text-xs px-2 py-0.5 rounded-full"
              :class="{
                'bg-green-100 text-green-700': activity.channel === 'email',
                'bg-indigo-100 text-indigo-700': activity.channel === 'whatsapp',
                'bg-orange-100 text-orange-700': activity.channel === 'sms'
              }"
            >
              {{ formatChannel(activity.channel) }}
            </span>
          </span>
          <span class="text-sm text-gray-500">
            {{ formatDate(activity.created_at) }}
          </span>
        </div>
        
        <div v-if="activity.activity_type === 'status_changed'" class="text-sm">
          Status berubah dari 
          <span class="font-medium">{{ formatStatus(activity.details.old_status) }}</span> 
          menjadi 
          <span class="font-medium">{{ formatStatus(activity.details.new_status) }}</span>
        </div>
        
        <div v-else-if="activity.activity_type === 'email_sent' || (activity.activity_type === 'notification_sent' && activity.channel === 'email')" class="text-sm">
          Email dikirim ke 
          <span class="font-medium">{{ activity.details.recipient_name }}</span>
          (<span class="text-gray-500">{{ activity.details.recipient }}</span>)
        </div>
        
        <div v-else-if="activity.activity_type === 'notification_sent' && activity.channel === 'whatsapp'" class="text-sm">
          WhatsApp dikirim ke 
          <span class="font-medium">{{ activity.details.recipient_name }}</span>
          (<span class="text-gray-500">{{ activity.details.recipient }}</span>)
        </div>
        
        <div v-else-if="activity.activity_type === 'notification_sent' && activity.channel === 'sms'" class="text-sm">
          SMS dikirim ke 
          <span class="font-medium">{{ activity.details.recipient_name }}</span>
          (<span class="text-gray-500">{{ activity.details.recipient }}</span>)
        </div>
        
        <div v-else-if="activity.activity_type === 'viewed'" class="text-sm">
          Invoice dilihat oleh client
        </div>
        
        <div v-else-if="activity.activity_type === 'payment_received'" class="text-sm">
          Pembayaran diterima sebesar 
          <span class="font-medium">{{ formatCurrency(activity.details.amount) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { supabase } from '../../lib/supabase';

const props = defineProps({
  invoiceId: {
    type: String,
    required: true
  }
});

const activities = ref([]);
const isLoading = ref(false);
const error = ref('');

// Fetch activities when the component mounts or invoiceId changes
watch(() => props.invoiceId, fetchActivities, { immediate: true });

async function fetchActivities() {
  if (!props.invoiceId) return;
  
  isLoading.value = true;
  error.value = '';
  
  try {
    const { data, error: fetchError } = await supabase
      .from('invoice_activities')
      .select('*')
      .eq('invoice_id', props.invoiceId)
      .order('created_at', { ascending: false });
    
    if (fetchError) throw fetchError;
    
    activities.value = data;
  } catch (err) {
    console.error('Error fetching invoice activities:', err);
    error.value = 'Gagal mengambil data aktivitas invoice';
  } finally {
    isLoading.value = false;
  }
}

function formatActivityType(type, channel) {
  const types = {
    'status_changed': 'Perubahan Status',
    'email_sent': 'Email Terkirim',
    'viewed': 'Invoice Dilihat',
    'payment_received': 'Pembayaran Diterima'
  };
  
  if (channel) {
    return `${types[type] || type} (${formatChannel(channel)})`;
  }
  
  return types[type] || type;
}

function formatStatus(status) {
  const statuses = {
    'draft': 'Draft',
    'sent': 'Terkirim',
    'completed': 'Selesai',
    'overdue': 'Jatuh Tempo',
    'paid': 'Dibayar'
  };
  
  return statuses[status] || status;
}

function formatDate(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

function formatChannel(channel) {
  const channels = {
    'email': 'Email',
    'whatsapp': 'WhatsApp',
    'sms': 'SMS'
  };
  
  return channels[channel] || channel;
}
</script> 