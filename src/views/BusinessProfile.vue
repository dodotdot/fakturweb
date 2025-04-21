<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <Breadcrumb :breadcrumbItems="[
      { text: 'Dashboard', to: '/dashboard' },
      { text: 'Profile', to: '/profile' },
      { text: 'Business Profile' }
    ]" class="mb-4" />
    
    <h1 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Business Profile</h1>
    
    <div v-if="isLoading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Business Logo Section -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-4">Business Logo</h3>
          
          <div class="flex flex-col items-center">
            <div v-if="form.businessLogo" class="mb-4 relative">
              <img 
                :src="form.businessLogo" 
                alt="Business Logo" 
                class="w-48 h-48 object-contain border rounded-lg"
              />
              <button 
                @click="removeBusinessLogo" 
                class="absolute top-2 right-2 p-1 bg-red-100 text-red-500 rounded-full hover:bg-red-200"
                title="Remove logo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div v-else class="mb-4 h-48 w-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <div class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="mt-2 text-sm text-gray-500">No logo uploaded</p>
              </div>
            </div>
            
            <label class="mt-2 cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
              Upload Logo
              <input 
                type="file" 
                ref="logoInput"
                class="hidden" 
                accept="image/png,image/jpeg,image/jpg" 
                @change="handleLogoUpload" 
              />
            </label>
            
            <p class="mt-2 text-xs text-gray-500">Max size: 2MB. Allowed formats: PNG, JPG</p>
          </div>
        </div>
      </div>
      
      <!-- Business Information Form -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden md:col-span-2">
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-4">Business Information</h3>
          
          <form @submit.prevent="saveBusinessProfile" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="companyName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Company Name*</label>
                <input
                  type="text"
                  id="companyName"
                  v-model="form.companyName"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Your Company Name"
                />
              </div>
              
              <div>
                <label for="businessTaxId" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tax ID / NPWP</label>
                <input
                  type="text"
                  id="businessTaxId"
                  v-model="form.businessTaxId"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="XX.XXX.XXX.X-XXX.XXX"
                />
              </div>
            </div>
            
            <div>
              <label for="businessEmail" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Business Email*</label>
              <input
                type="email"
                id="businessEmail"
                v-model="form.businessEmail"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="business@example.com"
              />
              <p class="mt-1 text-xs text-gray-500">This email will be used for invoice notifications</p>
            </div>
            
            <div>
              <label for="businessPhone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Business Phone*</label>
              <input
                type="tel"
                id="businessPhone"
                v-model="form.businessPhone"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="+62 8xx-xxxx-xxxx"
              />
            </div>
            
            <div>
              <label for="businessWebsite" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Website</label>
              <input
                type="url"
                id="businessWebsite"
                v-model="form.businessWebsite"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="https://example.com"
              />
            </div>
            
            <div>
              <label for="businessAddress" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Business Address*</label>
              <textarea
                id="businessAddress"
                v-model="form.businessAddress"
                required
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Street, City, State, Postal Code"
              ></textarea>
            </div>
            
            <div>
              <label for="businessDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Business Description</label>
              <textarea
                id="businessDescription"
                v-model="form.businessDescription"
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Brief description of your business"
              ></textarea>
            </div>
            
            <div class="pt-4 flex justify-end">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isSubmitting ? 'Saving...' : 'Save Business Profile' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <!-- Success Toast -->
    <div 
      v-if="showSuccessToast" 
      class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg flex items-center gap-2 animate-fade-in-up"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>Business profile updated successfully!</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import Breadcrumb from '../components/ui/Breadcrumb.vue';
import { 
  getBusinessProfile, 
  updateBusinessProfile, 
  uploadBusinessLogo, 
  deleteBusinessLogo 
} from '../lib/business-profile';

const authStore = useAuthStore();
const logoInput = ref(null);
const isLoading = ref(true);
const isSubmitting = ref(false);
const showSuccessToast = ref(false);

// Form data
const form = ref({
  companyName: '',
  businessEmail: '',
  businessPhone: '',
  businessAddress: '',
  businessWebsite: '',
  businessTaxId: '',
  businessLogo: '',
  businessDescription: '',
  fullName: ''
});

// Load business profile data
onMounted(async () => {
  try {
    const userId = authStore.user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    const profileData = await getBusinessProfile(userId);
    
    // Map DB snake_case to JS camelCase
    form.value = {
      companyName: profileData.company_name || '',
      businessEmail: profileData.business_email || authStore.user?.email || '',
      businessPhone: profileData.business_phone || '',
      businessAddress: profileData.business_address || '',
      businessWebsite: profileData.business_website || '',
      businessTaxId: profileData.business_tax_id || '',
      businessLogo: profileData.business_logo || '',
      businessDescription: profileData.business_description || '',
      fullName: profileData.full_name || ''
    };
  } catch (error) {
    console.error('Error loading business profile:', error);
  } finally {
    isLoading.value = false;
  }
});

// Handle logo upload
async function handleLogoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  try {
    const userId = authStore.user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    isSubmitting.value = true;
    const logoUrl = await uploadBusinessLogo(file, userId);
    form.value.businessLogo = logoUrl;
    
    // Reset file input
    if (logoInput.value) {
      logoInput.value.value = '';
    }
    
    // Show success toast
    showToast();
  } catch (error) {
    console.error('Error uploading business logo:', error);
    alert(error.message || 'Failed to upload logo. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
}

// Remove business logo
async function removeBusinessLogo() {
  try {
    const userId = authStore.user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    if (!form.value.businessLogo) return;
    
    isSubmitting.value = true;
    await deleteBusinessLogo(form.value.businessLogo, userId);
    form.value.businessLogo = '';
    
    // Show success toast
    showToast();
  } catch (error) {
    console.error('Error removing business logo:', error);
    alert('Failed to remove logo. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
}

// Save business profile
async function saveBusinessProfile() {
  try {
    const userId = authStore.user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    isSubmitting.value = true;
    
    // Update business profile
    await updateBusinessProfile(userId, form.value);
    
    // Show success toast
    showToast();
  } catch (error) {
    console.error('Error saving business profile:', error);
    alert('Failed to save business profile. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
}

// Show success toast
function showToast() {
  showSuccessToast.value = true;
  setTimeout(() => {
    showSuccessToast.value = false;
  }, 3000);
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