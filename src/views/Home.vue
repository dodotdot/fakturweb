<template>
  <div class="landing-page">
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Bikin Faktur Jualan<br>Semudah <span class="highlight">Swipe TikTok</span></h1>
          <p class="hero-subtitle">Ribet ngurusin faktur? Pelanggan kesel nunggu invoice? FAKTUR.web.id bikin semuanya beres dalam hitungan detik. Cobain sekarang, dijamin auto beres!</p>
          <div class="hero-cta">
            <router-link v-if="!isAuthenticated" to="/register" class="btn-primary btn-large">Mulai Gratis</router-link>
            <router-link v-if="isAuthenticated" to="/dashboard" class="btn-primary btn-large">Dashboard</router-link>
            <router-link v-if="isAuthenticated" to="/invoices/new" class="btn-secondary btn-large">Buat Faktur</router-link>
            <a v-if="!isAuthenticated" href="#demo" class="btn-secondary btn-large">Lihat Demo <span class="emoji">👀</span></a>
          </div>
          <div class="hero-trust">
            <p>Dipercaya oleh <span class="bold">2,500+</span> UMKM Indonesia</p>
            <div class="trust-logos">
              <img src="/images/brands/tokopedia.png" alt="Tokopedia" class="brand-logo">
              <img src="/images/brands/shopee.png" alt="Shopee" class="brand-logo">
              <img src="/images/brands/bukalapak.png" alt="Bukalapak" class="brand-logo">
            </div>
          </div>
        </div>
        <div class="hero-image">
          <img src="/images/hero/dashboard-preview.webp" alt="FAKTUR.web.id Dashboard Preview" class="hero-preview">
        </div>
      </div>
    </section>

   

    <section class="faq" id="faq">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Masih <span class="highlight">Ragu</span>?</h2>
          <p class="section-subtitle">Cek dulu pertanyaan yang sering ditanyain</p>
        </div>
        
        <div class="faq-list">
          <div class="faq-item" v-for="(item, index) in faqItems" :key="index" :class="{ active: item.active }">
            <div class="faq-question" @click="toggleFaq(index)">
              <h3>{{ item.question }}</h3>
              <span class="faq-icon">+</span>
            </div>
            <div class="faq-answer">
              <p>{{ item.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Udah Siap Bikin Faktur yang <span class="highlight">Kece Badai</span>?</h2>
          <p class="cta-subtitle">Gabung bareng 2,500+ UMKM Indonesia yang udah naik level bisnisnya bareng FAKTUR.web.id</p>
          <div class="cta-buttons">
            <router-link v-if="!isAuthenticated" to="/register" class="btn-primary btn-large">Mulai Gratis Sekarang</router-link>
            <router-link v-if="isAuthenticated" to="/dashboard" class="btn-primary btn-large">Dashboard</router-link>
            <router-link to="/contact" class="btn-secondary btn-large">Tanya-tanya Dulu</router-link>
          </div>
        </div>
        <div class="cta-image">
          <img src="/images/cta/start-using.webp" alt="Start Using FAKTUR.web.id" class="cta-preview">
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
    answer: "Tentu! Kamu bisa daftar akun Starter yang gratis selamanya untuk mencoba semua fitur basic FAKTUR.web.id.",
    active: false
  },
  {
    question: "Data saya aman ga nih di FAKTUR.web.id?",
    answer: "100% aman! Kami pakai teknologi enkripsi kelas dunia dan server yang super secure. Data kamu juga di-backup setiap hari, jadi ga bakal hilang meski ada kendala teknis.",
    active: false
  },
  {
    question: "Faktur dari FAKTUR.web.id sah ga secara hukum?",
    answer: "Faktur dari FAKTUR.web.id 100% sah dan sesuai dengan ketentuan perpajakan Indonesia. Kami juga menyediakan fitur untuk menambahkan nomor NPWP dan informasi pajak lainnya.",
    active: false
  },
  {
    question: "Bisa integrasi dengan software lain ga?",
    answer: "Bisa dong! FAKTUR.web.id bisa diintegrasikan dengan berbagai platform e-commerce populer, payment gateway, dan software akuntansi. Untuk detail lebih lanjut, silakan hubungi tim kami.",
    active: false
  }
]);

const toggleFaq = (index) => {
  faqItems.value = faqItems.value.map((item, i) => {
    if (i === index) {
      return { ...item, active: !item.active };
    } else {
      return { ...item, active: false };
    }
  });
};

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
  background: linear-gradient(135deg, #ffffff 0%, #f7fafc 100%);
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23f0f4f8' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.5;
}

.hero .container {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-content {
  max-width: 600px;
}

.hero-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #1a202c;
  letter-spacing: -0.02em;
}

.hero-title .highlight {
  color: hsl(var(--primary));
  position: relative;
  display: inline-block;
}

.hero-title .highlight::after {
  content: '';
  position: absolute;
  bottom: 0.2em;
  left: 0;
  width: 100%;
  height: 0.2em;
  background: hsl(var(--primary));
  opacity: 0.2;
  border-radius: 1em;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #4a5568;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
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

.hero-trust {
  margin-top: 2rem;
}

.hero-trust p {
  font-size: 1rem;
  color: #718096;
  margin-bottom: 1rem;
}

.trust-logos {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.brand-logo {
  height: 40px;
  width: auto;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  filter: grayscale(100%);
}

.brand-logo:hover {
  opacity: 1;
  filter: grayscale(0%);
}

.hero-image {
  position: relative;
}

.hero-image img {
  width: 100%;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease;
}

.hero-image img:hover {
  transform: translateY(-5px);
}

.hero-preview {
  width: 100%;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease;
  object-fit: cover;
}

.hero-preview:hover {
  transform: translateY(-5px);
}

/* Responsive styles */
@media (max-width: 1024px) {
  .hero .container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-cta {
    justify-content: center;
  }

  .trust-logos {
    justify-content: center;
  }

  .hero-title {
    font-size: 3rem;
  }
}

@media (max-width: 640px) {
  .hero {
    padding: 4rem 0;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.125rem;
  }

  .hero-cta {
    flex-direction: column;
  }

  .btn-primary, .btn-secondary {
    width: 100%;
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