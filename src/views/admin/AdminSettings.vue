<template>
  <div class="container mx-auto py-8 px-4">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 pb-2">System Settings</h1>
      <p class="text-gray-500">Configure global application settings</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Left Column: Setting Categories -->
      <div class="md:col-span-1">
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div class="p-4 bg-gray-50 border-b border-gray-100">
            <h2 class="text-lg font-medium text-gray-900">Settings</h2>
          </div>
          <div class="p-2">
            <nav class="space-y-1">
              <button 
                v-for="(category, index) in settingCategories" 
                :key="index"
                @click="activeCategory = category.id"
                :class="[
                  'w-full flex items-center px-3 py-2 text-sm rounded-md',
                  activeCategory === category.id 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-50'
                ]"
              >
                <span class="truncate">{{ category.name }}</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
      
      <!-- Right Column: Settings -->
      <div class="md:col-span-2">
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div class="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
            <h2 class="text-lg font-medium text-gray-900">{{ currentCategoryName }}</h2>
            <div>
              <button 
                @click="saveSettings" 
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                :disabled="isSaving"
              >
                <span v-if="isSaving">Saving...</span>
                <span v-else>Save Changes</span>
              </button>
            </div>
          </div>
          
          <div class="p-6">
            <!-- General Settings -->
            <div v-if="activeCategory === 'general'" class="space-y-6">
              <div>
                <label for="app-name" class="block text-sm font-medium text-gray-700">Application Name</label>
                <input 
                  id="app-name" 
                  v-model="settings.general.appName" 
                  type="text" 
                  class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="FakturWeb"
                >
              </div>
              
              <div>
                <label for="logo-url" class="block text-sm font-medium text-gray-700">Logo URL</label>
                <input 
                  id="logo-url" 
                  v-model="settings.general.logoUrl" 
                  type="text" 
                  class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="https://example.com/logo.png"
                >
              </div>
              
              <div>
                <label for="currency" class="block text-sm font-medium text-gray-700">Default Currency</label>
                <select 
                  id="currency" 
                  v-model="settings.general.currency" 
                  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                >
                  <option value="IDR">Indonesian Rupiah (IDR)</option>
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="SGD">Singapore Dollar (SGD)</option>
                </select>
              </div>
              
              <div>
                <label for="date-format" class="block text-sm font-medium text-gray-700">Date Format</label>
                <select 
                  id="date-format" 
                  v-model="settings.general.dateFormat" 
                  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
            
            <!-- Invoice Settings -->
            <div v-if="activeCategory === 'invoice'" class="space-y-6">
              <div>
                <label for="invoice-prefix" class="block text-sm font-medium text-gray-700">Invoice Prefix</label>
                <input 
                  id="invoice-prefix" 
                  v-model="settings.invoice.prefix" 
                  type="text" 
                  class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="INV-"
                >
              </div>
              
              <div>
                <label for="tax-rate" class="block text-sm font-medium text-gray-700">Default Tax Rate (%)</label>
                <input 
                  id="tax-rate" 
                  v-model="settings.invoice.defaultTaxRate" 
                  type="number" 
                  min="0" 
                  max="100" 
                  class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="10"
                >
              </div>
              
              <div>
                <label for="payment-terms" class="block text-sm font-medium text-gray-700">Default Payment Terms (days)</label>
                <input 
                  id="payment-terms" 
                  v-model="settings.invoice.paymentTerms" 
                  type="number" 
                  min="0" 
                  class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="30"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Invoice Numbering</label>
                <div class="mt-2 space-y-4">
                  <div class="flex items-center">
                    <input 
                      id="sequential" 
                      name="invoice-numbering" 
                      type="radio" 
                      value="sequential" 
                      v-model="settings.invoice.numberingSystem"
                      class="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                    >
                    <label for="sequential" class="ml-3 block text-sm font-medium text-gray-700">
                      Sequential (INV-0001, INV-0002, ...)
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input 
                      id="date-based" 
                      name="invoice-numbering" 
                      type="radio" 
                      value="date-based" 
                      v-model="settings.invoice.numberingSystem"
                      class="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                    >
                    <label for="date-based" class="ml-3 block text-sm font-medium text-gray-700">
                      Date-based (INV-YYYYMMDD-001, ...)
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- User Settings -->
            <div v-if="activeCategory === 'user'" class="space-y-6">
              <div>
                <div class="flex justify-between">
                  <label for="allow-registration" class="block text-sm font-medium text-gray-700">Allow Public Registration</label>
                  <div class="ml-4 flex items-center">
                    <button 
                      :class="[
                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
                        settings.user.allowRegistration ? 'bg-primary' : 'bg-gray-200'
                      ]"
                      @click="settings.user.allowRegistration = !settings.user.allowRegistration"
                    >
                      <span 
                        :class="[
                          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                          settings.user.allowRegistration ? 'translate-x-5' : 'translate-x-0'
                        ]"
                      />
                    </button>
                  </div>
                </div>
                <p class="mt-1 text-sm text-gray-500">Allow new users to register through the signup page</p>
              </div>
              
              <div>
                <div class="flex justify-between">
                  <label for="require-approval" class="block text-sm font-medium text-gray-700">Require Account Approval</label>
                  <div class="ml-4 flex items-center">
                    <button 
                      :class="[
                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
                        settings.user.requireApproval ? 'bg-primary' : 'bg-gray-200'
                      ]"
                      @click="settings.user.requireApproval = !settings.user.requireApproval"
                    >
                      <span 
                        :class="[
                          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                          settings.user.requireApproval ? 'translate-x-5' : 'translate-x-0'
                        ]"
                      />
                    </button>
                  </div>
                </div>
                <p class="mt-1 text-sm text-gray-500">New accounts require admin approval before they can access the system</p>
              </div>
              
              <div>
                <label for="default-role" class="block text-sm font-medium text-gray-700">Default User Role</label>
                <select 
                  id="default-role" 
                  v-model="settings.user.defaultRole" 
                  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                >
                  <option value="user">User</option>
                  <option value="premium">Premium User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <div>
                <label for="max-invoices" class="block text-sm font-medium text-gray-700">Max Free Invoices per User</label>
                <input 
                  id="max-invoices" 
                  v-model="settings.user.maxFreeInvoices" 
                  type="number" 
                  min="0" 
                  class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="10"
                >
                <p class="mt-1 text-sm text-gray-500">Set to 0 for unlimited</p>
              </div>
            </div>
            
            <!-- API Settings -->
            <div v-if="activeCategory === 'api'" class="space-y-6">
              <div>
                <div class="flex justify-between">
                  <label for="enable-api" class="block text-sm font-medium text-gray-700">Enable API Access</label>
                  <div class="ml-4 flex items-center">
                    <button 
                      :class="[
                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
                        settings.api.enabled ? 'bg-primary' : 'bg-gray-200'
                      ]"
                      @click="settings.api.enabled = !settings.api.enabled"
                    >
                      <span 
                        :class="[
                          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                          settings.api.enabled ? 'translate-x-5' : 'translate-x-0'
                        ]"
                      />
                    </button>
                  </div>
                </div>
                <p class="mt-1 text-sm text-gray-500">Allow users to generate and use API tokens</p>
              </div>
              
              <div>
                <label for="api-rate-limit" class="block text-sm font-medium text-gray-700">API Rate Limit (requests per minute)</label>
                <input 
                  id="api-rate-limit" 
                  v-model="settings.api.rateLimit" 
                  type="number" 
                  min="0" 
                  class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="60"
                >
              </div>
              
              <div>
                <label for="webhook-url" class="block text-sm font-medium text-gray-700">Webhook URL</label>
                <input 
                  id="webhook-url" 
                  v-model="settings.api.webhookUrl" 
                  type="text" 
                  class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="https://your-webhook-url.com/invoice-events"
                >
                <p class="mt-1 text-sm text-gray-500">URL to receive system event notifications</p>
              </div>
              
              <div>
                <div class="flex justify-between">
                  <label for="invoice-webhooks" class="block text-sm font-medium text-gray-700">Invoice Webhooks</label>
                  <div class="ml-4 flex items-center">
                    <button 
                      :class="[
                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
                        settings.api.invoiceWebhooks ? 'bg-primary' : 'bg-gray-200'
                      ]"
                      @click="settings.api.invoiceWebhooks = !settings.api.invoiceWebhooks"
                    >
                      <span 
                        :class="[
                          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                          settings.api.invoiceWebhooks ? 'translate-x-5' : 'translate-x-0'
                        ]"
                      />
                    </button>
                  </div>
                </div>
                <p class="mt-1 text-sm text-gray-500">Send webhook notifications on invoice status changes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { trackPageView } from '../../utils/analytics';

const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref(true);
const isSaving = ref(false);

// Setting categories
const settingCategories = [
  { id: 'general', name: 'General' },
  { id: 'invoice', name: 'Invoice' },
  { id: 'user', name: 'User Management' },
  { id: 'api', name: 'API & Integrations' }
];

const activeCategory = ref('general');

// Settings data structure
const settings = ref({
  general: {
    appName: 'FakturWeb',
    logoUrl: '/logo.png',
    currency: 'IDR',
    dateFormat: 'DD/MM/YYYY'
  },
  invoice: {
    prefix: 'INV-',
    defaultTaxRate: 10,
    paymentTerms: 30,
    numberingSystem: 'sequential'
  },
  user: {
    allowRegistration: true,
    requireApproval: false,
    defaultRole: 'user',
    maxFreeInvoices: 10
  },
  api: {
    enabled: false,
    rateLimit: 60,
    webhookUrl: '',
    invoiceWebhooks: false
  }
});

// Get current category name for header
const currentCategoryName = computed(() => {
  const category = settingCategories.find(c => c.id === activeCategory.value);
  return category ? category.name : '';
});

// Make sure only superadmin can access this page
onMounted(async () => {
  try {
    if (!authStore.isSuperAdmin) {
      router.push('/dashboard');
      return;
    }
    
    // Track page view
    trackPageView('/admin/settings', 'System Settings - Admin Console');
    
    isLoading.value = true;
    await fetchSettings();
  } catch (error) {
    console.error('Error fetching settings:', error);
  } finally {
    isLoading.value = false;
  }
});

async function fetchSettings() {
  try {
    const { data, error } = await authStore.supabase
      .from('system_settings')
      .select('*')
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // Settings don't exist yet, create them
        await saveSettings();
      } else {
        throw error;
      }
    } else if (data) {
      // Merge in the settings from the database
      settings.value = {
        ...settings.value,
        ...JSON.parse(data.settings_json || '{}')
      };
    }
  } catch (error) {
    console.error('Error fetching settings:', error);
  }
}

async function saveSettings() {
  isSaving.value = true;
  
  try {
    // Check if settings entry exists
    const { data: existingData, error: checkError } = await authStore.supabase
      .from('system_settings')
      .select('id')
      .single();
    
    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }
    
    if (existingData) {
      // Update existing settings
      const { error } = await authStore.supabase
        .from('system_settings')
        .update({
          settings_json: JSON.stringify(settings.value),
          updated_at: new Date()
        })
        .eq('id', existingData.id);
      
      if (error) throw error;
    } else {
      // Insert new settings
      const { error } = await authStore.supabase
        .from('system_settings')
        .insert({
          settings_json: JSON.stringify(settings.value),
          created_at: new Date(),
          updated_at: new Date()
        });
      
      if (error) throw error;
    }
    
    alert('Settings saved successfully!');
  } catch (error) {
    console.error('Error saving settings:', error);
    alert('Failed to save settings. Please try again.');
  } finally {
    isSaving.value = false;
  }
}
</script> 