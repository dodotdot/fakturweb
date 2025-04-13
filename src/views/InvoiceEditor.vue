<template>
  <div class="container mx-auto py-8">
    <div class="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">
          {{ isEditMode ? 'Edit Invoice' : 'Create New Invoice' }}
        </h1>
        <p class="text-gray-500">
          {{ isEditMode ? 'Edit the details of your invoice' : 'Create a new invoice for your client' }}
        </p>
      </div>
      <div class="flex gap-3">
        <Button 
          variant="outline" 
          @click="goBack"
        >
          Cancel
        </Button>
        <Button 
          :loading="isLoading" 
          @click="saveInvoice"
        >
          {{ isEditMode ? 'Update Invoice' : 'Save Invoice' }}
        </Button>
      </div>
    </div>
    
    <div v-if="error" class="my-4 p-4 bg-red-50 text-red-500 rounded-md">
      {{ error }}
    </div>
    
    <InvoiceGenerator 
      :ref="invoiceGeneratorRef"
      :store-mode="true"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useInvoiceStore } from '../stores/invoice';
import Button from '../components/ui/Button.vue';
import InvoiceGenerator from '../components/InvoiceGenerator.vue';

const router = useRouter();
const route = useRoute();
const invoiceStore = useInvoiceStore();
const invoiceGeneratorRef = ref(null);

const isLoading = computed(() => invoiceStore.isLoading);
const error = computed(() => invoiceStore.error);
const invoiceId = computed(() => route.params.id);
const isEditMode = computed(() => !!invoiceId.value);

onMounted(async () => {
  if (isEditMode.value) {
    try {
      await invoiceStore.getInvoice(invoiceId.value);
    } catch (err) {
      router.push('/invoices');
    }
  } else {
    invoiceStore.resetInvoice();
  }
});

async function saveInvoice() {
  try {
    if (isEditMode.value) {
      // TODO: Implement update logic
      await invoiceStore.updateInvoice(invoiceId.value);
      router.push(`/invoices/${invoiceId.value}`);
    } else {
      const newInvoiceId = await invoiceStore.saveInvoice();
      router.push(`/invoices/${newInvoiceId}`);
    }
  } catch (err) {
    console.error('Error saving invoice:', err);
  }
}

function goBack() {
  if (isEditMode.value) {
    router.push(`/invoices/${invoiceId.value}`);
  } else {
    router.push('/invoices');
  }
}
</script> 