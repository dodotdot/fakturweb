<template>
  <!-- This component doesn't render anything but manages font loading -->
</template>

<script>
import { trackFontLoading } from '../utils/performance.js';

export default {
  name: 'FontLoader',
  
  data() {
    return {
      fontsLoaded: false,
      fontLoadTimeout: 3000, // 3 seconds timeout
      fontFamilies: ['Inter', 'Plus Jakarta Sans']
    }
  },
  
  mounted() {
    // Check if fonts are already cached (from our font-loader.js script)
    if (document.documentElement.classList.contains('fonts-loaded')) {
      this.fontsLoaded = true;
      this.$emit('fonts-loaded');
      return;
    }
    
    // Add loading class
    document.documentElement.classList.add('fonts-loading');
    
    // Try to load fonts
    this.loadFonts();
  },
  
  methods: {
    loadFonts() {
      // Set timeout to ensure fonts don't block rendering indefinitely
      const timeout = setTimeout(() => {
        this.onFontLoadingComplete();
      }, this.fontLoadTimeout);
      
      // Check if Font Loading API is supported
      if ('fonts' in document) {
        // Create array of promises for each font to load
        const fontPromises = this.fontFamilies.map(family => {
          return Promise.all([
            document.fonts.load(`400 1em ${family}`),
            document.fonts.load(`500 1em ${family}`),
            document.fonts.load(`600 1em ${family}`),
            document.fonts.load(`700 1em ${family}`)
          ]);
        });
        
        // Wait for all fonts to load
        Promise.all(fontPromises)
          .then(() => {
            clearTimeout(timeout);
            this.onFontLoadingComplete();
          })
          .catch(() => {
            // If there's an error, still mark as complete to ensure fallback works
            clearTimeout(timeout);
            this.onFontLoadingComplete();
          });
      } else {
        // For browsers without Font Loading API
        // Use a short timeout to allow browser to start font loading
        setTimeout(() => {
          clearTimeout(timeout);
          this.onFontLoadingComplete();
        }, 500);
      }
    },
    
    onFontLoadingComplete() {
      if (this.fontsLoaded) return; // Prevent duplicate calls
      
      this.fontsLoaded = true;
      
      // Update classes
      document.documentElement.classList.remove('fonts-loading');
      document.documentElement.classList.add('fonts-loaded');
      
      // Store in localStorage for future visits
      try {
        sessionStorage.setItem('fonts-loaded', 'true');
      } catch (e) {
        // Ignore localStorage errors
      }
      
      // Track font loading performance
      const duration = trackFontLoading(true);
      
      // Emit event for parent components
      this.$emit('fonts-loaded', { duration });
      
      // Emit a custom event for analytics or other use cases
      this.$emit('performance', {
        name: 'fonts-loaded',
        duration: duration
      });
    }
  }
}
</script>

<style>
/* No styles needed as they're in the dedicated CSS file */
</style> 