<template>
  <div class="min-h-screen bg-gradient-to-b from-primary/5 to-primary/10">
    <!-- Header -->
    <div class="py-8 px-4 sm:px-6 lg:px-8 text-center">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
          <span class="block">Jadi Beta Tester Faktur.web.id</span>
          <span class="block text-primary">Dapatkan Akses Premium Gratis</span>
        </h1>
        <p class="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Bantu kami meningkatkan layanan dan dapatkan diskon khusus 50% untuk berlangganan premium seumur hidup!
        </p>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-8 pb-12">
      <!-- Benefits Section -->
      <div class="lg:w-1/2">
        <div class="bg-white rounded-xl shadow-xl overflow-hidden">
          <div class="bg-primary text-white py-6 px-6">
            <h2 class="text-2xl font-bold">Keuntungan Beta Tester</h2>
            <p class="text-primary-100 mt-2">Akses eksklusif dan prioritas dukungan</p>
          </div>
          <div class="p-6">
            <ul class="space-y-4">
              <li class="flex">
                <svg class="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-700">Akses ke fitur premium <span class="font-semibold">gratis selama 3 bulan</span></span>
              </li>
              <li class="flex">
                <svg class="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-700">Diskon <span class="font-semibold text-primary">50% seumur hidup</span> untuk langganan premium</span>
              </li>
              <li class="flex">
                <svg class="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-700">Prioritas dukungan pelanggan via WhatsApp</span>
              </li>
              <li class="flex">
                <svg class="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-700">Akses ke grup eksklusif untuk masukan dan saran pengembangan</span>
              </li>
              <li class="flex">
                <svg class="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-700">Kesempatan berkolaborasi dengan tim pengembang</span>
              </li>
            </ul>

            <div class="mt-8 bg-yellow-50 border border-yellow-100 rounded-lg p-4">
              <div class="flex">
                <svg class="h-6 w-6 text-yellow-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                <div>
                  <h3 class="text-sm font-medium text-yellow-800">Program Terbatas</h3>
                  <p class="mt-1 text-sm text-yellow-700">
                    Kami hanya menerima 100 beta tester. Kesempatan terbatas, daftar sekarang!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Registration Form -->
      <div class="lg:w-1/2">
        <div class="bg-white rounded-xl shadow-xl overflow-hidden">
          <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Daftar Beta Tester</h2>
            
            <div v-if="error" class="p-3 rounded-md bg-red-50 text-red-500 text-sm mb-4">
              {{ error }}
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div class="space-y-2">
                  <label for="fullName" class="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                  <input 
                    id="fullName" 
                    v-model="fullName" 
                    type="text" 
                    placeholder="Nama lengkap Anda" 
                    required
                    class="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div class="space-y-2">
                  <label for="business" class="block text-sm font-medium text-gray-700">Nama Bisnis/Usaha</label>
                  <input 
                    id="business" 
                    v-model="business" 
                    type="text" 
                    placeholder="Nama bisnis Anda (opsional)" 
                    class="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div class="space-y-2">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input 
                  id="email" 
                  v-model="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  required
                  class="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div class="space-y-2">
                <label for="whatsapp" class="block text-sm font-medium text-gray-700">Nomor WhatsApp</label>
                <input 
                  id="whatsapp" 
                  v-model="whatsapp" 
                  type="tel" 
                  placeholder="08xxxxxxxxxx" 
                  required
                  class="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div class="space-y-2">
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <input 
                  id="password" 
                  v-model="password" 
                  type="password" 
                  placeholder="••••••••" 
                  required
                  class="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p class="text-xs text-gray-500">
                  Password minimal 8 karakter
                </p>
              </div>
              
              <div class="space-y-2">
                <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
                <input 
                  id="confirmPassword" 
                  v-model="confirmPassword" 
                  type="password" 
                  placeholder="••••••••" 
                  required
                  class="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div class="space-y-2">
                <label for="useCase" class="block text-sm font-medium text-gray-700">Bagaimana Anda akan menggunakan aplikasi ini?</label>
                <textarea 
                  id="useCase" 
                  v-model="useCase" 
                  placeholder="Ceritakan sedikit tentang kebutuhan Anda terkait faktur" 
                  rows="3"
                  class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>
              
              <div class="flex items-center space-x-2">
                <input 
                  id="terms" 
                  type="checkbox" 
                  v-model="acceptTerms"
                  class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  required
                />
                <label for="terms" class="text-sm text-gray-500">
                  Saya setuju dengan
                  <router-link to="/terms-of-service" class="text-primary hover:underline">Syarat Layanan</router-link>
                  dan
                  <router-link to="/privacy-policy" class="text-primary hover:underline">Kebijakan Privasi</router-link>
                </label>
              </div>
              
              <div class="flex items-center space-x-2">
                <input 
                  id="betaTester" 
                  type="checkbox" 
                  v-model="betaTesterAgreement"
                  class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  required
                />
                <label for="betaTester" class="text-sm text-gray-500">
                  Saya bersedia menjadi beta tester dan memberikan masukan untuk pengembangan aplikasi
                </label>
              </div>
              
              <button 
                type="submit"
                :disabled="isLoading"
                class="w-full inline-flex justify-center items-center h-12 px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-lg"
              >
                <span v-if="isLoading" class="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                Daftar Sebagai Beta Tester
              </button>
              
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">Atau daftar dengan</span>
                </div>
              </div>
              
              <button 
                @click="handleGoogleSignIn" 
                :disabled="isGoogleLoading"
                type="button" 
                class="w-full flex items-center justify-center gap-2 h-10 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <span v-if="isGoogleLoading" class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                <svg v-else class="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Daftar dengan Google
              </button>
              
              <div class="text-center text-sm">
                Sudah memiliki akun?
                <router-link to="/login" class="font-medium text-primary hover:underline">
                  Masuk
                </router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { trackPageView } from '../utils/analytics';
import { supabase } from '../lib/supabase';

const router = useRouter();
const authStore = useAuthStore();

const fullName = ref('');
const business = ref('');
const email = ref('');
const whatsapp = ref('');
const password = ref('');
const confirmPassword = ref('');
const useCase = ref('');
const acceptTerms = ref(false);
const betaTesterAgreement = ref(false);
const error = ref('');
const isLoading = ref(false);
const isGoogleLoading = ref(false);

// Track beta tester registration page view
trackPageView('/beta-register', 'Beta Tester Registration - Faktur.web.id');

async function handleSubmit() {
  try {
    // Clear previous errors
    error.value = '';
    
    // Validate form
    if (!fullName.value) {
      error.value = 'Nama lengkap wajib diisi';
      return;
    }
    
    if (!email.value) {
      error.value = 'Email wajib diisi';
      return;
    }
    
    if (!whatsapp.value) {
      error.value = 'Nomor WhatsApp wajib diisi';
      return;
    }
    
    if (!password.value) {
      error.value = 'Password wajib diisi';
      return;
    }
    
    if (password.value !== confirmPassword.value) {
      error.value = 'Password tidak cocok';
      return;
    }
    
    if (password.value.length < 8) {
      error.value = 'Password minimal 8 karakter';
      return;
    }
    
    if (!acceptTerms.value) {
      error.value = 'Anda harus menyetujui syarat dan ketentuan';
      return;
    }
    
    if (!betaTesterAgreement.value) {
      error.value = 'Anda harus setuju untuk menjadi beta tester';
      return;
    }
    
    // Start loading
    isLoading.value = true;
    
    // Register user with additional metadata
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          full_name: fullName.value,
          business_name: business.value,
          whatsapp: whatsapp.value,
          use_case: useCase.value,
          is_beta_tester: true
        }
      }
    });
    
    if (signUpError) throw signUpError;
    
    // Check if user data exists
    if (!data || !data.user || !data.user.id) {
      throw new Error('Gagal membuat akun. Data pengguna tidak valid.');
    }
    
    try {
      // Insert beta tester record
      const { error: insertError } = await supabase
        .from('beta_testers')
        .insert({
          user_id: data.user.id,
          full_name: fullName.value,
          email: email.value,
          whatsapp: whatsapp.value,
          business_name: business.value || null,
          use_case: useCase.value || null,
          status: 'pending'
        });
      
      if (insertError) {
        console.error('Error inserting beta tester record:', insertError);
        // Don't throw here - we already created the user account
        // Just log it and continue
      }
    } catch (insertErr) {
      // Log the error but continue with registration
      console.error('Failed to create beta tester record:', insertErr);
      // We don't want to block the registration if only the beta_testers record fails
    }
    
    // Store beta status in local storage as fallback
    try {
      localStorage.setItem('is_beta_tester', 'true');
      localStorage.setItem('beta_user_details', JSON.stringify({
        full_name: fullName.value,
        email: email.value,
        whatsapp: whatsapp.value,
        business_name: business.value,
        use_case: useCase.value,
        registered_at: new Date().toISOString()
      }));
    } catch (storageErr) {
      console.error('Failed to save beta data to localStorage:', storageErr);
    }
    
    // Redirect on success with a congratulations message
    router.push('/login?beta_registered=true');
  } catch (err) {
    console.error('Beta registration error:', err);
    
    // Handle specific errors
    if (err.message?.includes('Database error') || err.message?.includes('saving new user')) {
      error.value = 'Terjadi kesalahan pada database. Coba lagi atau hubungi kami jika masalah berlanjut.';
    } else if (err.message?.includes('User already registered')) {
      error.value = 'Email sudah terdaftar. Silakan login atau gunakan email lain.';
    } else if (err.message?.includes('rate limit')) {
      error.value = 'Terlalu banyak percobaan. Silakan coba lagi setelah beberapa saat.';
    } else {
      error.value = err.message || 'Gagal membuat akun. Silakan coba lagi.';
    }
  } finally {
    isLoading.value = false;
  }
}

async function handleGoogleSignIn() {
  try {
    isGoogleLoading.value = true;
    error.value = '';
    
    // Store beta tester info in localStorage to retrieve after OAuth flow
    localStorage.setItem('beta_signup', 'true');
    
    await authStore.signInWithGoogle();
    // The redirect will be handled by Supabase
  } catch (err) {
    error.value = err.message || 'Gagal masuk dengan Google. Silakan coba lagi.';
    isGoogleLoading.value = false;
  }
}
</script> 