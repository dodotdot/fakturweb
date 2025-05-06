/**
 * Resource Hints Manager
 * 
 * This script dynamically adds various resource hints to improve loading performance:
 * - DNS prefetch: Resolve domain names before resources are requested
 * - Preconnect: Establish early connections to critical origins
 * - Preload: Load critical resources needed for current page
 * - Prefetch: Load resources likely needed for future navigation
 * - Prerender: Load and render entire pages likely to be visited next
 */

(function() {
  'use strict';
  
  /**
   * Configuration for resource hints
   */
  const config = {
    // Critical domains to establish early connections
    preconnect: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com'
    ],
    
    // DNS prefetch for secondary domains
    dnsPrefetch: [
      'https://www.google.com',
      'https://api.faktur.web.id'
    ],
    
    // Critical assets to preload for current page (dynamically updated based on route)
    preload: {
      // Default/global preloads
      global: [
        { href: '/styles/fonts.css', as: 'style' },
        { href: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2', as: 'font', type: 'font/woff2', crossorigin: true },
        { href: 'https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA.woff2', as: 'font', type: 'font/woff2', crossorigin: true }
      ],
      // Route-specific preloads
      routes: {
        'home': [
          { href: '/images/hero-mockup.png', as: 'image' }
        ],
        'invoice': [
          { href: '/js/pdf-generator.js', as: 'script' }
        ]
      }
    },
    
    // Resources to prefetch for future navigation
    prefetch: [
      { href: '/js/landing.js', as: 'script' }
    ],
    
    // Pages to prerender for instant navigation
    prerender: [
      // Use sparingly as this is resource-intensive
      // '/login'
    ]
  };
  
  /**
   * Add a resource hint to the document
   * @param {string} type - Type of hint (preconnect, prefetch, etc.)
   * @param {Object} attributes - Attributes for the link element
   */
  function addResourceHint(type, attributes) {
    // Check if hint already exists
    const selector = `link[rel="${type}"][href="${attributes.href}"]`;
    if (document.querySelector(selector)) {
      return; // Skip if already exists
    }
    
    // Create and configure link element
    const hint = document.createElement('link');
    hint.rel = type;
    
    // Add all attributes
    Object.keys(attributes).forEach(key => {
      hint.setAttribute(key, attributes[key]);
    });
    
    // Add to document head
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(hint);
  }
  
  /**
   * Initialize all resource hints
   */
  function initResourceHints() {
    // Add preconnect hints
    config.preconnect.forEach(url => {
      addResourceHint('preconnect', { href: url, crossorigin: 'anonymous' });
    });
    
    // Add DNS prefetch hints
    config.dnsPrefetch.forEach(url => {
      addResourceHint('dns-prefetch', { href: url });
    });
    
    // Add global preload hints
    config.preload.global.forEach(item => {
      addResourceHint('preload', item);
    });
    
    // Add prefetch hints (delayed to not compete with critical resources)
    setTimeout(() => {
      config.prefetch.forEach(item => {
        addResourceHint('prefetch', item);
      });
    }, 1000);
    
    // Add prerender hints (very delayed)
    setTimeout(() => {
      config.prerender.forEach(url => {
        addResourceHint('prerender', { href: url });
      });
    }, 3000);
  }
  
  /**
   * Add route-specific resource hints
   * @param {string} routeName - Name of the current route
   */
  function addRouteSpecificHints(routeName) {
    if (config.preload.routes[routeName]) {
      config.preload.routes[routeName].forEach(item => {
        addResourceHint('preload', item);
      });
    }
  }
  
  /**
   * Listen for route changes in SPA
   */
  function listenForRouteChanges() {
    // For Vue Router or similar
    if (window.history && window.history.pushState) {
      // Listen for popstate
      window.addEventListener('popstate', event => {
        const path = window.location.pathname;
        const routeName = getRouteNameFromPath(path);
        if (routeName) {
          addRouteSpecificHints(routeName);
        }
      });
    }
  }
  
  /**
   * Get route name from path
   * This is a simple example - adjust based on your routing structure
   * @param {string} path - Current path
   * @return {string|null} Route name or null
   */
  function getRouteNameFromPath(path) {
    // Simple mapping example - replace with your logic
    const routes = {
      '/': 'home',
      '/invoice': 'invoice',
      '/login': 'login',
      '/register': 'register'
    };
    
    return routes[path] || null;
  }
  
  /**
   * Initialize everything
   */
  function init() {
    initResourceHints();
    
    // Add current route-specific hints
    const path = window.location.pathname;
    const routeName = getRouteNameFromPath(path);
    if (routeName) {
      addRouteSpecificHints(routeName);
    }
    
    // Listen for route changes
    listenForRouteChanges();
    
    // Expose public API
    window.resourceHints = {
      addRouteSpecificHints,
      addResourceHint
    };
  }
  
  // Start when DOM is ready
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})(); 