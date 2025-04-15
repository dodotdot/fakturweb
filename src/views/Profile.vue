<template>
  <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Profile</h1>
      
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <!-- Profile Header -->
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center">
            <div class="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-semibold">
              {{ userInitials }}
            </div>
            <div class="ml-6">
              <h2 class="text-xl font-semibold text-gray-800 dark:text-white">{{ userName }}</h2>
              <p class="text-gray-500 dark:text-gray-400">{{ userEmail }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Member since {{ formattedJoinDate }}</p>
            </div>
          </div>
        </div>
        
        <!-- Profile Form -->
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-4">Account Information</h3>
          
          <form @submit.prevent="updateProfile" class="space-y-4">
            <div>
              <label for="displayName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Display Name</label>
              <input
                type="text"
                id="displayName"
                v-model="form.displayName"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                disabled
                class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
              />
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Email cannot be changed</p>
            </div>
            
            <div>
              <label for="company" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Company Name</label>
              <input
                type="text"
                id="company"
                v-model="form.company"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
              <input
                type="tel"
                id="phone"
                v-model="form.phone"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            <div>
              <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
              <textarea
                id="address"
                v-model="form.address"
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>
            </div>
            
            <div class="pt-4">
              <button
                type="submit"
                :disabled="isLoading"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isLoading ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
        
        <!-- Account Settings -->
        <div class="p-6 border-t border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-4">Account Settings</h3>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Change Password</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Update your password to keep your account secure</p>
              </div>
              <button
                @click="showPasswordModal = true"
                class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Change Password
              </button>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Delete Account</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Permanently delete your account and all data</p>
              </div>
              <button
                @click="showDeleteModal = true"
                class="inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 dark:bg-gray-700 dark:text-red-400 dark:border-red-600 dark:hover:bg-gray-600"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Password Change Modal -->
    <div v-if="showPasswordModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-800 dark:text-white">Change Password</h3>
          <button @click="showPasswordModal = false" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="updatePassword" class="space-y-4">
          <div>
            <label for="currentPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              v-model="passwordForm.currentPassword"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
            <input
              type="password"
              id="newPassword"
              v-model="passwordForm.newPassword"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="passwordForm.confirmPassword"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          <div class="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              @click="showPasswordModal = false"
              class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isPasswordLoading"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              <svg v-if="isPasswordLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isPasswordLoading ? 'Updating...' : 'Update Password' }}
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Delete Account Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-800 dark:text-white">Delete Account</h3>
          <button @click="showDeleteModal = false" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="mb-4">
          <p class="text-gray-700 dark:text-gray-300">Are you sure you want to delete your account? This action cannot be undone.</p>
        </div>
        
        <div class="pt-4 flex justify-end space-x-3">
          <button
            type="button"
            @click="showDeleteModal = false"
            class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="deleteAccount"
            :disabled="isDeleting"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
          >
            <svg v-if="isDeleting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isDeleting ? 'Deleting...' : 'Delete Account' }}
          </button>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

// User data
const userEmail = computed(() => authStore.user?.email || '');
const userName = computed(() => {
  const email = userEmail.value;
  return email ? email.split('@')[0] : 'User';
});
const userInitials = computed(() => {
  const name = userName.value;
  return name ? name.substring(0, 2).toUpperCase() : 'U';
});
const formattedJoinDate = computed(() => {
  if (!authStore.user?.created_at) return 'N/A';
  return new Date(authStore.user.created_at).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Form data
const form = ref({
  displayName: '',
  email: userEmail.value,
  company: '',
  phone: '',
  address: ''
});

// Password form
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// Loading states
const isLoading = ref(false);
const isPasswordLoading = ref(false);
const isDeleting = ref(false);

// Modal states
const showPasswordModal = ref(false);
const showDeleteModal = ref(false);

// Load user profile data
onMounted(async () => {
  try {
    // In a real app, you would fetch the user profile data from your backend
    // For now, we'll just use the data from the auth store
    form.value.displayName = userName.value;
    form.value.email = userEmail.value;
    
    // Simulate loading profile data
    await new Promise(resolve => setTimeout(resolve, 500));
  } catch (error) {
    console.error('Error loading profile:', error);
  }
});

// Update profile
async function updateProfile() {
  try {
    isLoading.value = true;
    
    // In a real app, you would update the user profile in your backend
    // For now, we'll just simulate a successful update
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message
    alert('Profile updated successfully!');
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('Failed to update profile. Please try again.');
  } finally {
    isLoading.value = false;
  }
}

// Update password
async function updatePassword() {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('New passwords do not match.');
    return;
  }
  
  try {
    isPasswordLoading.value = true;
    
    // In a real app, you would update the password in your backend
    // For now, we'll just simulate a successful update
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form and close modal
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    showPasswordModal.value = false;
    
    // Show success message
    alert('Password updated successfully!');
  } catch (error) {
    console.error('Error updating password:', error);
    alert('Failed to update password. Please try again.');
  } finally {
    isPasswordLoading.value = false;
  }
}

// Delete account
async function deleteAccount() {
  try {
    isDeleting.value = true;
    
    // In a real app, you would delete the account in your backend
    // For now, we'll just simulate a successful deletion
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Logout and redirect to home
    await authStore.logout();
    router.push('/');
  } catch (error) {
    console.error('Error deleting account:', error);
    alert('Failed to delete account. Please try again.');
    isDeleting.value = false;
  }
}
</script> 