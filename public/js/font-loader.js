/**
 * Font Loader Script
 * 
 * This script manages optimized font loading with the following features:
 * 1. Check if fonts are already cached 
 * 2. Loads fonts asynchronously
 * 3. Handles both modern browsers and legacy browsers
 * 4. Uses localStorage to remember loaded fonts
 * 5. Sets appropriate CSS classes
 */

(function() {
  'use strict';

  // Configuration
  const config = {
    storageKey: 'fonts-loaded',
    classes: {
      loading: 'fonts-loading',
      loaded: 'fonts-loaded'
    },
    timeout: 3000,
    fontFamilies: [
      'Inter',
      'Plus Jakarta Sans'
    ]
  };

  // Check if we've already loaded and cached the fonts
  function checkCachedFonts() {
    try {
      if (sessionStorage.getItem(config.storageKey) === 'true') {
        // Fonts were loaded in this session
        markFontsAsLoaded();
        return true;
      }
    } catch (e) {
      // Ignore localStorage errors
    }
    return false;
  }

  // Mark fonts as loaded and update UI 
  function markFontsAsLoaded() {
    // Update classes
    document.documentElement.classList.remove(config.classes.loading);
    document.documentElement.classList.add(config.classes.loaded);
    
    // Store in session to avoid reloading fonts
    try {
      sessionStorage.setItem(config.storageKey, 'true');
    } catch (e) {
      // Ignore storage errors
    }
  }

  // A simple implementation of FontFaceObserver-like functionality
  function checkFontLoaded(family, weight) {
    return new Promise((resolve, reject) => {
      // Create elements to test font loading
      const serif = document.createElement('div');
      const sansSerif = document.createElement('div');
      
      // Set up test elements
      serif.style.cssText = 'position:absolute;visibility:hidden;display:block;font-size:30px;width:auto;height:auto;margin:0;padding:0;font-family:serif;';
      sansSerif.style.cssText = 'position:absolute;visibility:hidden;display:block;font-size:30px;width:auto;height:auto;margin:0;padding:0;font-weight:' + weight + ';font-family:' + family + ',sans-serif;';
      
      // Add test text
      serif.textContent = 'giItT1WQy@!-/#';
      sansSerif.textContent = 'giItT1WQy@!-/#';
      
      // Add to DOM
      document.body.appendChild(serif);
      document.body.appendChild(sansSerif);
      
      // Check if widths are different (indicating custom font loaded)
      setTimeout(() => {
        const serifWidth = serif.offsetWidth;
        const sansSerifWidth = sansSerif.offsetWidth;
        
        // Clean up 
        document.body.removeChild(serif);
        document.body.removeChild(sansSerif);
        
        if (serifWidth !== sansSerifWidth) {
          resolve();
        } else {
          // Try one more time after a small delay
          setTimeout(() => {
            document.body.appendChild(serif);
            document.body.appendChild(sansSerif);
            
            const serifWidth = serif.offsetWidth;
            const sansSerifWidth = sansSerif.offsetWidth;
            
            document.body.removeChild(serif);
            document.body.removeChild(sansSerif);
            
            if (serifWidth !== sansSerifWidth) {
              resolve();
            } else {
              reject();
            }
          }, 500);
        }
      }, 20);
    });
  }

  // Load each font
  function loadFonts() {
    // Mark loading started
    document.documentElement.classList.add(config.classes.loading);
    
    const fontPromises = [];
    const fontWeights = ['400', '500', '600', '700'];
    
    // Add font loading promises
    config.fontFamilies.forEach(family => {
      fontWeights.forEach(weight => {
        if ('fonts' in document) {
          // Use native Font Loading API if available
          fontPromises.push(document.fonts.load(`${weight} 1em ${family}`));
        } else {
          // Use our custom font detection for older browsers
          fontPromises.push(checkFontLoaded(family, weight));
        }
      });
    });
    
    // Set timeout to ensure we don't block forever
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(resolve, config.timeout);
    });
    
    // Race between actual loading and timeout
    Promise.race([
      Promise.all(fontPromises),
      timeoutPromise
    ])
    .then(() => {
      markFontsAsLoaded();
    })
    .catch(() => {
      // Even on error, mark fonts as loaded to use fallbacks
      markFontsAsLoaded();
    });
  }

  // Initialize font loading
  function init() {
    // Check if document is already complete
    if (document.readyState === 'complete') {
      // If we haven't cached the fonts yet, load them
      if (!checkCachedFonts()) {
        loadFonts();
      }
    } else {
      // Wait for DOM to be ready
      document.addEventListener('DOMContentLoaded', function() {
        // If we haven't cached the fonts yet, load them
        if (!checkCachedFonts()) {
          loadFonts();
        }
      });
    }
  }

  // Start the process
  init();
})(); 