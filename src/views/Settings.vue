<template>
  <div class="container mx-auto px-4 py-8">
      <!-- Breadcrumb -->
      <Breadcrumb :breadcrumbItems="[
        { text: 'Dashboard', to: '/dashboard' },
        { text: 'Settings' }
      ]" class="mb-4" />
  
      <h1 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Settings</h1>
      
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <!-- Notification Settings -->
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-4">Notification Settings</h3>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Email Notifications</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Receive email notifications about your invoices</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.emailNotifications" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/80 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Invoice Reminders</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Get reminders for unpaid invoices</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.invoiceReminders" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/80 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Marketing Emails</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Receive updates about new features and promotions</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.marketingEmails" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/80 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
        
        <!-- Invoice Settings -->
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-4">Invoice Settings</h3>
          
          <div class="space-y-4">
            <div>
              <label for="defaultCurrency" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Default Currency</label>
              <select
                id="defaultCurrency"
                v-model="settings.defaultCurrency"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="IDR">Indonesian Rupiah (IDR)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="GBP">British Pound (GBP)</option>
                <option value="SGD">Singapore Dollar (SGD)</option>
                <option value="MYR">Malaysian Ringgit (MYR)</option>
              </select>
            </div>
            
            <div>
              <label for="defaultLanguage" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Default Language</label>
              <select
                id="defaultLanguage"
                v-model="settings.defaultLanguage"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="id">Indonesian (Bahasa Indonesia)</option>
                <option value="en">English</option>
              </select>
            </div>
            
            <div>
              <label for="invoicePrefix" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Invoice Number Prefix</label>
              <input
                type="text"
                id="invoicePrefix"
                v-model="settings.invoicePrefix"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="INV-"
              />
            </div>
            
            <div>
              <label for="invoiceFooter" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Invoice Footer Text</label>
              <textarea
                id="invoiceFooter"
                v-model="settings.invoiceFooter"
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Thank you for your business!"
              ></textarea>
            </div>
          </div>
        </div>
        
        <!-- Save Button -->
        <div class="p-6">
          <button
            @click="saveSettings"
            :disabled="isLoading"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? 'Saving...' : 'Save Settings' }}
          </button>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import Breadcrumb from '../components/ui/Breadcrumb.vue';

const authStore = useAuthStore();
const isLoading = ref(false);

// Settings data
const settings = ref({
  emailNotifications: true,
  invoiceReminders: true,
  marketingEmails: false,
  defaultCurrency: 'IDR',
  defaultLanguage: 'id',
  invoicePrefix: 'INV-',
  invoiceFooter: 'Thank you for your business!'
});

// Load user settings
onMounted(async () => {
  try {
    // In a real app, you would fetch the user settings from your backend
    // For now, we'll just use default values
    await new Promise(resolve => setTimeout(resolve, 500));
  } catch (error) {
    console.error('Error loading settings:', error);
  }
});

// Save settings
async function saveSettings() {
  try {
    isLoading.value = true;
    
    // In a real app, you would save the settings to your backend
    // For now, we'll just simulate a successful save
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message
    alert('Settings saved successfully!');
  } catch (error) {
    console.error('Error saving settings:', error);
    alert('Failed to save settings. Please try again.');
  } finally {
    isLoading.value = false;
  }
}
</script> 