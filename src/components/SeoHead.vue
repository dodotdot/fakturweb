<template>
  <!-- No visual output, this component only updates document head -->
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onMounted, watch } from 'vue';

const route = useRoute();

const props = defineProps({
  title: {
    type: String,
    default: 'Faktur.web.id - Solusi Faktur Online Terbaik untuk UMKM Indonesia'
  },
  description: {
    type: String,
    default: 'Faktur.web.id - Solusi Faktur Online Terbaik untuk UMKM Indonesia'
  },
  keywords: {
    type: String,
    default: 'faktur online, invoice generator, buat faktur, faktur gratis, aplikasi faktur, faktur umkm, faktur pajak, invoice umkm'
  },
  image: {
    type: String,
    default: '/images/faktur-logo.png'
  },
  type: {
    type: String,
    default: 'website'
  },
  canonical: {
    type: String,
    default: ''
  },
  lang: {
    type: String,
    default: 'id-ID'
  }
});

// Function to update all meta tags
function updateMetaTags() {
  // Update document title
  document.title = props.title;
  
  // Set document language
  document.documentElement.setAttribute('lang', props.lang);
  
  // Basic meta tags
  updateMetaTag('description', props.description);
  updateMetaTag('keywords', props.keywords);
  
  // Open Graph
  updateMetaTag('og:title', props.title);
  updateMetaTag('og:description', props.description);
  updateMetaTag('og:image', props.image);
  updateMetaTag('og:type', props.type);
  updateMetaTag('og:url', window.location.href);
  updateMetaTag('og:site_name', 'Faktur.web.id');
  updateMetaTag('og:locale', 'id_ID');
  
  // Twitter Card
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', props.title);
  updateMetaTag('twitter:description', props.description);
  updateMetaTag('twitter:image', props.image);
  
  // Additional SEO meta tags
  updateMetaTag('author', 'Faktur.web.id');
  updateMetaTag('robots', 'index, follow');
  
  // Set canonical URL
  updateCanonicalLink();

  // Add JSON-LD structured data for better rich snippets
  addStructuredData();
}

// Helper function to update or create meta tags
function updateMetaTag(name, content) {
  // First try to find by name attribute
  let meta = document.querySelector(`meta[name="${name}"]`);
  
  // If not found, try by property attribute (for Open Graph)
  if (!meta) {
    meta = document.querySelector(`meta[property="${name}"]`);
  }
  
  // Create if doesn't exist
  if (!meta) {
    meta = document.createElement('meta');
    if (name.startsWith('og:')) {
      meta.setAttribute('property', name);
    } else {
      meta.setAttribute('name', name);
    }
    document.head.appendChild(meta);
  }
  
  // Update content
  meta.setAttribute('content', content);
}

// Set canonical URL to avoid duplicate content issues
function updateCanonicalLink() {
  let canonicalUrl = props.canonical || window.location.href.split('?')[0].split('#')[0];
  
  // Remove or update existing canonical
  const existingCanonical = document.querySelector('link[rel="canonical"]');
  if (existingCanonical) {
    existingCanonical.setAttribute('href', canonicalUrl);
  } else {
    const link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', canonicalUrl);
    document.head.appendChild(link);
  }
}

// Add structured data for better rich snippets in search results
function addStructuredData() {
  // Remove any existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Faktur.web.id",
    "url": "https://faktur.web.id",
    "description": props.description,
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "IDR"
    },
    "operatingSystem": "All",
    "screenshot": props.image,
    "author": {
      "@type": "Organization",
      "name": "Faktur.web.id",
      "url": "https://faktur.web.id"
    }
  };
  
  const script = document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
}

// Update meta tags when component is mounted
onMounted(() => {
  updateMetaTags();
});

// Update meta tags when route or props change
watch(
  [() => props.title, () => props.description, () => props.keywords, () => props.image, () => props.type, () => props.canonical, () => route.path], 
  () => {
    updateMetaTags();
  }
);
</script> 