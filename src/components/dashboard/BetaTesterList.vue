<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
    <div class="p-6 border-b border-gray-100">
      <h2 class="text-xl font-semibold text-gray-900">Beta Tester List</h2>
      <p class="text-sm text-gray-500 mt-1">Manage your beta tester applications</p>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Business
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Use Case
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody v-if="betaTesters.length > 0" class="bg-white divide-y divide-gray-200">
          <tr v-for="tester in betaTesters" :key="tester.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ tester.full_name }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ tester.business_name || '-' }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ tester.email }}</div>
              <div class="text-sm text-gray-500">WA: {{ formatWhatsApp(tester.whatsapp) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getStatusClass(tester.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ tester.status }}
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-900 max-w-xs truncate">{{ tester.use_case || '-' }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button 
                @click="updateStatus(tester.id, 'approved')" 
                v-if="tester.status === 'pending'"
                class="text-green-600 hover:text-green-900 mr-3"
              >
                Approve
              </button>
              <button 
                @click="updateStatus(tester.id, 'rejected')" 
                v-if="tester.status === 'pending'"
                class="text-red-600 hover:text-red-900"
              >
                Reject
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="6" class="px-6 py-10 text-center text-gray-500">
              <p>No beta tester applications found</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../../lib/supabase';

const betaTesters = ref([]);
const error = ref(null);

function getStatusClass(status) {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };
  return classes[status] || classes.pending;
}

function formatWhatsApp(number) {
  if (!number) return '-';
  // Format: 08xxxxxxxxxx to 08xx-xxxx-xxxx
  return number.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
}

async function fetchBetaTesters() {
  try {
    const { data, error: fetchError } = await supabase
      .from('beta_testers')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) throw fetchError;
    betaTesters.value = data;
  } catch (err) {
    console.error('Error fetching beta testers:', err);
    error.value = 'Failed to load beta testers';
  }
}

async function updateStatus(id, newStatus) {
  try {
    const { error: updateError } = await supabase
      .from('beta_testers')
      .update({ status: newStatus })
      .eq('id', id);

    if (updateError) throw updateError;
    await fetchBetaTesters(); // Refresh the list
  } catch (err) {
    console.error('Error updating status:', err);
    error.value = 'Failed to update status';
  }
}

onMounted(() => {
  fetchBetaTesters();
});
</script> 