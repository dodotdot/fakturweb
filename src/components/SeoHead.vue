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
  }
});

// Function to update all meta tags
function updateMetaTags() {
  // Update document title
  document.title = props.title;
  
  // Basic meta tags
  updateMetaTag('description', props.description);
  updateMetaTag('keywords', props.keywords);
  
  // Open Graph
  updateMetaTag('og:title', props.title);
  updateMetaTag('og:description', props.description);
  updateMetaTag('og:image', props.image);
  updateMetaTag('og:type', props.type);
  updateMetaTag('og:url', window.location.href);
  
  // Twitter Card
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', props.title);
  updateMetaTag('twitter:description', props.description);
  updateMetaTag('twitter:image', props.image);
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

// Update meta tags when component is mounted
onMounted(() => {
  updateMetaTags();
});

// Update meta tags when route or props change
watch(
  [() => props.title, () => props.description, () => props.keywords, () => props.image, () => props.type, () => route.path], 
  () => {
    updateMetaTags();
  }
);
</script> 