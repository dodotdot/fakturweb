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
          <h1 class="hero-title mb-6">
            Faktur Digital<br>Untuk <span class="highlight">Bisnis Modern</span>
          </h1>
          <p class="hero-subtitle mb-8">
            Faktur profesional dalam 30 detik. Hemat waktu, terlihat keren, dan terorganisir dengan baik.
          </p>
          <div class="hero-video-wrapper mb-8">
            <video class="hero-video" autoplay loop muted playsinline>
              <source src="/images/videos/hero-video.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
          <div class="hero-cta flex gap-4 justify-center">
            <!-- <router-link v-if="!isAuthenticated" to="/register" class="btn-primary">Mulai Gratis</router-link> -->
            <router-link v-if="isAuthenticated" to="/dashboard" class="btn-primary">Dashboard</router-link>
            <router-link to="/guest-invoice" class="btn-secondary">Buat Faktur Tanpa Daftar <span class="emoji">📝</span></router-link>
          </div>
        </div>
      </div>
    </section>

   


   
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';

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
  background-color: #00B74A;
  color: white;
}

.btn-primary:hover {
  background-color: #009E42;
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
  color: #00B74A;
  -webkit-text-fill-color: #00B74A;
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
  background-color: rgba(0, 183, 74, 0.2);
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
</style> 