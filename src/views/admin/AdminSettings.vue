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
            <div class="flex space-x-2">
              <input 
                type="file" 
                id="import-settings" 
                class="hidden" 
                accept=".json" 
                @change="importSettings"
              />
              <button
                @click="() => document.getElementById('import-settings').click()"
                class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                </svg>
                Import
              </button>
              <button
                @click="exportSettings"
                class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
              <button 
                @click="saveSettings" 
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                :disabled="isSaving"
              >
                <svg v-if="!isSaving" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-else class="animate-spin h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
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
            
            <!-- User Types Settings -->
            <div v-if="activeCategory === 'user_types'" class="space-y-6">
              <!-- Tabs -->
              <div class="border-b border-gray-200">
                <nav class="-mb-px flex space-x-8">
                  <button
                    @click="activeUserTypeTab = 'guest'"
                    :class="[
                      'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                      activeUserTypeTab === 'guest'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    ]"
                  >
                    Guest Mode
                  </button>
                  <button
                    @click="activeUserTypeTab = 'member'"
                    :class="[
                      'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                      activeUserTypeTab === 'member'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    ]"
                  >
                    Member Users
                  </button>
                </nav>
              </div>
              
              <!-- Guest Mode Settings -->
              <div v-if="activeUserTypeTab === 'guest'" class="space-y-6">
                <div>
                  <div class="flex justify-between">
                    <label class="block text-sm font-medium text-gray-700">Enable Guest Mode</label>
                    <div class="ml-4 flex items-center">
                      <button 
                        :class="[
                          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
                          settings.user_types.guest.enabled ? 'bg-primary' : 'bg-gray-200'
                        ]"
                        @click="settings.user_types.guest.enabled = !settings.user_types.guest.enabled"
                      >
                        <span 
                          :class="[
                            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                            settings.user_types.guest.enabled ? 'translate-x-5' : 'translate-x-0'
                          ]"
                        />
                      </button>
                    </div>
                  </div>
                  <p class="mt-1 text-sm text-gray-500">Allow users to create invoices without registration</p>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Max Invoices per Guest</label>
                  <input 
                    v-model="settings.user_types.guest.maxInvoices" 
                    type="number" 
                    min="0" 
                    class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="5"
                  >
                  <p class="mt-1 text-sm text-gray-500">Maximum number of invoices a guest can create (by browser session)</p>
                </div>
                
                <div>
                  <div class="flex justify-between">
                    <label class="block text-sm font-medium text-gray-700">Allow Download Without Registration</label>
                    <div class="ml-4 flex items-center">
                      <button 
                        :class="[
                          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
                          settings.user_types.guest.allowDownloadWithoutRegistration ? 'bg-primary' : 'bg-gray-200'
                        ]"
                        @click="settings.user_types.guest.allowDownloadWithoutRegistration = !settings.user_types.guest.allowDownloadWithoutRegistration"
                      >
                        <span 
                          :class="[
                            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                            settings.user_types.guest.allowDownloadWithoutRegistration ? 'translate-x-5' : 'translate-x-0'
                          ]"
                        />
                      </button>
                    </div>
                  </div>
                  <p class="mt-1 text-sm text-gray-500">If disabled, users will be required to register before downloading</p>
                </div>
                
                <div>
                  <div class="flex justify-between">
                    <label class="block text-sm font-medium text-gray-700">Hide Watermark for Guests</label>
                    <div class="ml-4 flex items-center">
                      <button 
                        :class="[
                          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
                          settings.user_types.guest.hideWatermark ? 'bg-primary' : 'bg-gray-200'
                        ]"
                        @click="settings.user_types.guest.hideWatermark = !settings.user_types.guest.hideWatermark"
                      >
                        <span 
                          :class="[
                            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                            settings.user_types.guest.hideWatermark ? 'translate-x-5' : 'translate-x-0'
                          ]"
                        />
                      </button>
                    </div>
                  </div>
                  <p class="mt-1 text-sm text-gray-500">Removes the "Powered by" watermark from guest invoices</p>
                </div>
                
                <div>
                  <div class="flex justify-between">
                    <label class="block text-sm font-medium text-gray-700">Require Email Capture</label>
                    <div class="ml-4 flex items-center">
                      <button 
                        :class="[
                          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
                          settings.user_types.guest.requireEmailCapture ? 'bg-primary' : 'bg-gray-200'
                        ]"
                        @click="settings.user_types.guest.requireEmailCapture = !settings.user_types.guest.requireEmailCapture"
                      >
                        <span 
                          :class="[
                            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                            settings.user_types.guest.requireEmailCapture ? 'translate-x-5' : 'translate-x-0'
                          ]"
                        />
                      </button>
                    </div>
                  </div>
                  <p class="mt-1 text-sm text-gray-500">Require guests to provide their email before downloading invoice</p>
                </div>
              </div>
              
              <!-- Member Users Settings -->
              <div v-if="activeUserTypeTab === 'member'" class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Default Trial Period (Days)</label>
                  <input 
                    v-model="settings.user_types.member.defaultTrialDays" 
                    type="number" 
                    min="0" 
                    class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="14"
                  >
                  <p class="mt-1 text-sm text-gray-500">Trial period for newly registered members (0 for no trial)</p>
                </div>
                
                <div>
                  <div class="flex justify-between">
                    <label class="block text-sm font-medium text-gray-700">Allow Team Creation</label>
                    <div class="ml-4 flex items-center">
                      <button 
                        :class="[
                          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
                          settings.user_types.member.allowTeamCreation ? 'bg-primary' : 'bg-gray-200'
                        ]"
                        @click="settings.user_types.member.allowTeamCreation = !settings.user_types.member.allowTeamCreation"
                      >
                        <span 
                          :class="[
                            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                            settings.user_types.member.allowTeamCreation ? 'translate-x-5' : 'translate-x-0'
                          ]"
                        />
                      </button>
                    </div>
                  </div>
                  <p class="mt-1 text-sm text-gray-500">Allow members to create and manage teams</p>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Maximum Team Members</label>
                  <input 
                    v-model="settings.user_types.member.maxTeamMembers" 
                    type="number" 
                    min="0" 
                    class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="5"
                  >
                  <p class="mt-1 text-sm text-gray-500">Maximum number of members allowed per team</p>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Maximum Client Accounts</label>
                  <input 
                    v-model="settings.user_types.member.maxClientAccounts" 
                    type="number" 
                    min="0" 
                    class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="50"
                  >
                  <p class="mt-1 text-sm text-gray-500">Maximum number of client accounts a member can create</p>
                </div>
                
                <div>
                  <div class="flex justify-between">
                    <label class="block text-sm font-medium text-gray-700">Auto Invoice Reminders</label>
                    <div class="ml-4 flex items-center">
                      <button 
                        :class="[
                          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
                          settings.user_types.member.autoInvoiceReminders ? 'bg-primary' : 'bg-gray-200'
                        ]"
                        @click="settings.user_types.member.autoInvoiceReminders = !settings.user_types.member.autoInvoiceReminders"
                      >
                        <span 
                          :class="[
                            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                            settings.user_types.member.autoInvoiceReminders ? 'translate-x-5' : 'translate-x-0'
                          ]"
                        />
                      </button>
                    </div>
                  </div>
                  <p class="mt-1 text-sm text-gray-500">Send automatic reminders for unpaid invoices</p>
                </div>
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
import { useToast } from 'vue-toastification';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();
const isLoading = ref(true);
const isSaving = ref(false);

// Setting categories
const settingCategories = [
  { id: 'general', name: 'General Settings' },
  { id: 'invoice', name: 'Invoice Settings' },
  { id: 'user', name: 'User Settings' },
  { id: 'user_types', name: 'User Types' },
];

const activeCategory = ref('general');

// Active tab in User Types section
const activeUserTypeTab = ref('guest');

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
  user_types: {
    guest: {
      enabled: true,
      maxInvoices: 5,
      allowDownloadWithoutRegistration: true,
      hideWatermark: false,
      requireEmailCapture: true
    },
    member: {
      defaultTrialDays: 14,
      allowTeamCreation: true,
      maxTeamMembers: 5,
      maxClientAccounts: 50,
      autoInvoiceReminders: true
    }
  }
});

// Get current category name for header
const currentCategoryName = computed(() => {
  const category = settingCategories.find(c => c.id === activeCategory.value);
  return category ? category.name : '';
});

// Load settings on mount
onMounted(async () => {
  if (!authStore.isSuperAdmin) {
    router.push('/dashboard');
    return;
  }
  
  trackPageView('/admin/settings', 'Admin Settings - FakturWeb');
  
  try {
    // Simulate API call to fetch settings
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // In a real app, you would fetch from backend
    // const response = await fetch('/api/admin/settings');
    // const data = await response.json();
    // settings.value = data;
    
    isLoading.value = false;
  } catch (error) {
    console.error('Error loading settings:', error);
    toast.error('Failed to load settings');
    isLoading.value = false;
  }
});

// Save settings
async function saveSettings() {
  isSaving.value = true;
  
  try {
    // Simulate API call to save settings
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, you would save to backend
    // const response = await fetch('/api/admin/settings', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(settings.value),
    // });
    
    // if (!response.ok) throw new Error('Failed to save settings');
    
    toast.success('Settings saved successfully');
    isSaving.value = false;
  } catch (error) {
    console.error('Error saving settings:', error);
    toast.error('Failed to save settings');
    isSaving.value = false;
  }
}

// Export app settings for other components to use
function exportSettings() {
  const settingsData = JSON.stringify(settings.value);
  const blob = new Blob([settingsData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'fakturweb-settings.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Import app settings
function importSettings(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedSettings = JSON.parse(e.target.result);
      
      // Validate imported settings structure
      if (!importedSettings.general || !importedSettings.invoice || 
          !importedSettings.user || !importedSettings.user_types) {
        throw new Error('Invalid settings format');
      }
      
      // Apply imported settings
      settings.value = importedSettings;
      toast.success('Settings imported successfully');
    } catch (error) {
      console.error('Error importing settings:', error);
      toast.error('Failed to import settings: Invalid format');
    }
  };
  reader.readAsText(file);
}
</script> 