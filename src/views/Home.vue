<template>
  <div class="landing-page">
    <section class="hero">
      <div class="container mx-auto px-4">
        <!-- Decorative illustrations -->
        <div class="hero-illustrations">
          <img src="/images/man-riding-a-rocket.svg" alt="Man riding a rocket" class="hero-illustration rocket-illustration">
          <img src="/images/work-party.svg" alt="Work party" class="hero-illustration party-illustration">
        </div>
        
        <div class="flex flex-col items-center justify-center text-center max-w-4xl mx-auto relative z-20">
          <h1 class="hero-title mb-6 tracking-tighter">
            Faktur Digital<br>Untuk <span class="highlight font-serif font-light italic">Bisnis Modern</span>
          </h1>
          <p class="hero-subtitle mb-8">
            Faktur profesional dalam 30 detik 🔥. Hemat waktu, simple, elegan, dan terorganisir dengan baik.
          </p>
          <div class="hero-video-wrapper mb-8">
            <video class="hero-video" autoplay loop muted playsinline>
              <source src="/images/videos/hero-video1.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
          <div class="hero-cta flex gap-4 justify-center">
            
            
            <router-link to="/invoice/guest" class="btn-primary">Buat Faktur Sekarang</router-link>
          </div>
        </div>
      </div>
    </section>

   <!-- Other sections would be here -->
   
   <!-- Logo Background Section -->
   <div class="logo-background-section container mx-auto bg-white">
     <img src="/images/faktur-logo.svg" alt="Faktur Logo Background" class="logo-background bg-white">
   </div>

   <!-- Join Now Section -->
   <section class="py-12 bg-gradient-to-br from-primary/5 to-primary/10">
     <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div class="lg:flex lg:items-center lg:justify-between">
         <div class="lg:w-0 lg:flex-1">
           <h2 class="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
             <span>Program Beta Tester Terbatas</span>
           </h2>
           <p class="mt-4 max-w-xl text-lg text-gray-600">
             Jadi beta tester dan dapatkan akses premium gratis selama 3 bulan plus diskon 50% untuk berlangganan seumur hidup!
           </p>
           <div class="mt-4 flex md:mt-6">
             <router-link to="/beta" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90">
               Daftar Sekarang
             </router-link>
             <a href="#" class="ml-4 inline-flex items-center px-5 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
               Pelajari Lebih Lanjut
             </a>
           </div>
         </div>
         <div class="mt-8 lg:mt-0 lg:ml-8">
           <div class="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
             <div class="flex items-center mb-4">
               <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                 </svg>
               </div>
               <div>
                 <h3 class="font-medium text-lg">Akses Premium Gratis</h3>
                 <p class="text-gray-500">Selama 3 bulan</p>
               </div>
             </div>
             <div class="flex items-center mb-4">
               <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
               </div>
               <div>
                 <h3 class="font-medium text-lg">Diskon 50% Seumur Hidup</h3>
                 <p class="text-gray-500">Untuk berlangganan premium</p>
               </div>
             </div>
             <div class="flex items-center">
               <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                 </svg>
               </div>
               <div>
                 <h3 class="font-medium text-lg">Program Terbatas</h3>
                 <p class="text-gray-500">Hanya untuk 100 tester pertama</p>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </section>

   <!-- Footer section -->
   <footer class="footer">
     <div class="footer-content">
       <div class="footer-logo">Faktur.web.id</div>
       <div class="footer-links">
         <a href="/terms-of-service" class="footer-link">Terms of Service</a>
         <a href="/privacy-policy" class="footer-link">Privacy Policy</a>
       </div>
       <div class="footer-copyright">© 2025 Faktur.web.id</div>
     </div>
   </footer>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { trackPageView } from '../utils/analytics';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);

// FAQ functionality
const faqItems = ref([
  {
    question: "Apa bisa coba dulu sebelum bayar?",
    answer: "Tentu! Kamu bisa daftar akun Starter yang gratis selamanya untuk mencoba semua fitur basic faktur.web.id.",
    active: false
  },
  {
    question: "Data saya aman ga nih di faktur.web.id?",
    answer: "Data kamu 100% aman di faktur.web.id. Kami menggunakan enkripsi end-to-end dan tidak pernah menyimpan data sensitif pelanggan kamu.",
    active: false
  },
  {
    question: "Faktur dari faktur.web.id sah ga secara hukum?",
    answer: "Faktur dari faktur.web.id 100% sah dan sesuai dengan standar pajak Indonesia. Faktur digital kami sudah memenuhi persyaratan faktur pajak yang berlaku.",
    active: false
  },
  {
    question: "Bisa ga integrasi dengan software akuntansi lain?",
    answer: "Ya, faktur.web.id bisa diintegrasikan dengan berbagai software akuntansi populer seperti Jurnal, Accurate, dan Zahir.",
    active: false
  }
]);

function toggleFaq(index) {
  faqItems.value[index].active = !faqItems.value[index].active;
}

// Smooth scrolling for anchor links
onMounted(() => {
  // Track home page view
  trackPageView('/', 'Faktur.web.id - Solusi Faktur Online Terbaik untuk UMKM Indonesia');
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });

  // Setup testimonial slider touch/drag functionality
  const testimonialSlider = document.querySelector('.testimonial-slider');
  let isDown = false;
  let startX;
  let scrollLeft;
  
  if (testimonialSlider) {
    testimonialSlider.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - testimonialSlider.offsetLeft;
      scrollLeft = testimonialSlider.scrollLeft;
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
      isDown = false;
    });
    
    testimonialSlider.addEventListener('mouseup', () => {
      isDown = false;
    });
    
    testimonialSlider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - testimonialSlider.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed
      testimonialSlider.scrollLeft = scrollLeft - walk;
    });

    // Add touch events for mobile
    testimonialSlider.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - testimonialSlider.offsetLeft;
      scrollLeft = testimonialSlider.scrollLeft;
    });
    
    testimonialSlider.addEventListener('touchend', () => {
      isDown = false;
    });
    
    testimonialSlider.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - testimonialSlider.offsetLeft;
      const walk = (x - startX) * 2;
      testimonialSlider.scrollLeft = scrollLeft - walk;
    });
  }
});
</script>

<style scoped>
/* Base styles */
.landing-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #2d3748;
}

/* Hero section styles */
.hero {
  padding: 6rem 0;
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
  position: relative;
  overflow: hidden;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #1a1a1a, #333);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.hero-subtitle-alt {
  font-size: 1.25rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.hero-video-wrapper {
  width: 100%;
  max-width: 800px;
  margin: 0 auto 2.5rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.hero-video {
  width: 100%;
  display: block;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background-color: #c0392b;
  color: white;
}

.btn-primary:hover {
  background-color: #c0392a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 183, 74, 0.2);
}

.btn-secondary {
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background-color: #f8f9fa;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.highlight {
  color: #c0392b;
  -webkit-text-fill-color: #c0392b;
  position: relative;
  display: inline-block;
  z-index: 21;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: rgba(192, 57, 43,0.2);
  z-index: -1;
  border-radius: 4px;
}

.emoji {
  margin-left: 0.5rem;
}

/* Hero illustrations */
.hero-illustrations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.hero-illustration {
  position: absolute;
  max-width: 300px;
  height: auto;
  opacity: 0.8;
}

.rocket-illustration {
  top: 10%;
  right: -10%;
  transform: rotate(15deg);
  animation: float 6s ease-in-out infinite;
}

.party-illustration {
  bottom: 15%;
  left: -15%;
  transform: rotate(-10deg);
  animation: float 8s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px) rotate(15deg);
  }
  50% {
    transform: translateY(-20px) rotate(15deg);
  }
  100% {
    transform: translateY(0px) rotate(15deg);
  }
}

/* Responsive styles */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-cta {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
  
  .btn-primary, .btn-secondary {
    width: 100%;
  }
  
  .hero-illustration {
    max-width: 200px;
  }
  
  .rocket-illustration {
    top: 5%;
    right: 0;
  }
  
  .party-illustration {
    bottom: 10%;
    left: 0;
  }
}

/* Animation classes */
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

.hero-content {
  animation: fadeInUp 0.8s ease-out;
}

.hero-image {
  animation: fadeInUp 0.8s ease-out 0.2s backwards;
}

/* Inherit other styles from landing.css */
.features, .how-it-works, .testimonials, 
.pricing, .faq, .cta {
  padding: 6rem 0;
}

.features {
  padding: 4rem 0;
  background-color: white;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  font-size: 1.25rem;
  color: #4a5568;
}

.feature-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.feature-card {
  flex: 1 1 calc(33.33% - 2rem);
  text-align: center;
  padding: 2rem;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.feature-desc {
  font-size: 1rem;
  color: #4a5568;
}

.how-it-works {
  padding: 4rem 0;
  background-color: white;
}

.steps {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.step-card {
  flex: 1 1 calc(33.33% - 2rem);
  text-align: center;
  padding: 2rem;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.step-number {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.step-desc {
  font-size: 1rem;
  color: #4a5568;
}

.step-img {
  width: 100%;
  height: auto;
  border-radius: 0.75rem;
  margin-top: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.step-img:hover {
  transform: scale(1.02);
}

.testimonials {
  padding: 4rem 0;
  background-color: white;
}

.testimonial-slider {
  display: flex;
  overflow-x: auto;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: #f0f4f8;
}

.testimonial-card {
  flex: 0 0 auto;
  width: 300px;
  padding: 2rem;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-right: 1rem;
}

.testimonial-content {
  font-size: 1rem;
  color: #4a5568;
  margin-bottom: 1.5rem;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.author-info {
  text-align: left;
}

.author-name {
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
}

.author-business {
  font-size: 1rem;
  color: #718096;
}

.faq {
  padding: 4rem 0;
  background-color: white;
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 0;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.faq-icon {
  font-size: 1.5rem;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.faq-item.active .faq-answer {
  max-height: 500px;
  padding-bottom: 1.5rem;
}

.cta {
  padding: 4rem 0;
  background-color: white;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.cta-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.cta-subtitle {
  font-size: 1.25rem;
  color: #4a5568;
  margin-bottom: 2.5rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
}

.btn-primary, .btn-secondary {
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.125rem;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-primary {
  background: hsl(var(--primary));
  color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.06);
}

.btn-secondary {
  background: white;
  color: hsl(var(--primary));
  border: 2px solid hsl(var(--primary));
}

.btn-secondary:hover {
  background: hsl(var(--primary));
  color: white;
  transform: translateY(-2px);
}

.cta-image {
  margin-top: 2rem;
}

.cta-image img {
  width: 100%;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.cta-preview {
  width: 100%;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease;
}

.cta-preview:hover {
  transform: translateY(-5px);
}

/* Logo Background Section */
.logo-background-section {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.logo-background {
  position: absolute;
  width: 100%;
  left: 0;
  z-index: 1;
  opacity: 0.4;
}

/* Footer styles */
.footer {
  padding: 1.5rem 0;
  background-color: #f5f5f5;
  border-top: 1px solid #eaeaea;
  position: relative;
  z-index: 2;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-link {
  color: #333;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #00B74A;
}

.footer-copyright {
  color: #666;
  font-size: 0.9rem;
}

/* Responsive footer styles */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .footer-links {
    order: 2;
  }
  
  .footer-copyright {
    order: 3;
  }
}
</style> 