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

            <div v-if="success" class="p-3 rounded-md bg-green-50 text-green-600 text-sm mb-4">
              {{ success }}
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
                class="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">
                  <svg class="animate-spin -ml-1 mr-2 h-5 w-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mendaftar...
                </span>
                <span v-else>Daftar Sekarang</span>
              </button>
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
import { supabase } from '../lib/supabase';

const router = useRouter();

// Form data
const fullName = ref('');
const business = ref('');
const email = ref('');
const whatsapp = ref('');
const useCase = ref('');
const acceptTerms = ref(false);
const betaTesterAgreement = ref(false);

// UI state
const error = ref('');
const success = ref('');
const isSubmitting = ref(false);

// Generate a UUID v4
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

async function handleSubmit() {
  try {
    error.value = '';
    success.value = '';
    isSubmitting.value = true;

    // Basic validation
    if (!fullName.value || !email.value || !whatsapp.value) {
      throw new Error('Mohon lengkapi semua field yang wajib diisi');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      throw new Error('Format email tidak valid');
    }

    // Validate WhatsApp number format (simple Indonesian format)
    const waRegex = /^08[1-9][0-9]{7,11}$/;
    if (!waRegex.test(whatsapp.value.replace(/[^0-9]/g, ''))) {
      throw new Error('Format nomor WhatsApp tidak valid');
    }

    // Check if email already registered
    const { data: existingUsers, error: checkError } = await supabase
      .from('beta_testers')
      .select('id')
      .eq('email', email.value);

    if (checkError) {
      console.error('Error checking existing user:', checkError);
      throw new Error('Terjadi kesalahan saat memeriksa data. Silakan coba lagi.');
    }

    if (existingUsers && existingUsers.length > 0) {
      throw new Error('Email sudah terdaftar sebagai beta tester.');
    }

    // Prepare the data
    const betaTesterData = {
      full_name: fullName.value,
      business_name: business.value || null,
      email: email.value,
      whatsapp: whatsapp.value.replace(/[^0-9]/g, ''),
      use_case: useCase.value || null,
      status: 'pending'
    };

    console.log('Attempting to insert beta tester:', betaTesterData);

    // Insert to beta_testers table
    const { data, error: insertError } = await supabase
      .from('beta_testers')
      .insert([betaTesterData])
      .select();

    if (insertError) {
      console.error('Insert error details:', {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint
      });

      if (insertError.message?.includes('violates not-null constraint')) {
        throw new Error('Terjadi masalah dengan data registrasi. Mohon hubungi admin.');
      }
      
      if (insertError.message?.includes('row-level security')) {
        throw new Error('Terjadi masalah dengan izin akses. Mohon hubungi admin.');
      }
      
      throw new Error('Gagal mendaftar sebagai beta tester. Silakan coba lagi.');
    }

    console.log('Successfully registered beta tester:', data);

    // Show success message
    success.value = 'Pendaftaran berhasil! Kami akan menghubungi Anda melalui WhatsApp untuk informasi selanjutnya.';
    
    // Reset form
    fullName.value = '';
    business.value = '';
    email.value = '';
    whatsapp.value = '';
    useCase.value = '';
    acceptTerms.value = false;
    betaTesterAgreement.value = false;

    // Redirect after 3 seconds
    setTimeout(() => {
      router.push('/');
    }, 3000);

  } catch (err) {
    console.error('Beta registration error:', err);
    error.value = err.message || 'Terjadi kesalahan. Silakan coba lagi.';
  } finally {
    isSubmitting.value = false;
  }
}
</script> 