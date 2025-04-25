/**
 * Utility functions for Google Analytics event tracking
 */

// Store the measurement ID from the main.js config
let GA_MEASUREMENT_ID = 'G-97KBR0Q41J'; // Default ID, will be updated when available
let isInitialized = false;
let eventQueue = [];

/**
 * Initialize the analytics module with the measurement ID
 * @param {string} measurementId - The Google Analytics measurement ID
 */
export function initAnalytics(measurementId) {
  GA_MEASUREMENT_ID = measurementId;
  
  // Check if gtag script is already loaded
  if (!window.gtag) {
    // Wait for DOM to be ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      loadGtagScript();
    } else {
      document.addEventListener('DOMContentLoaded', loadGtagScript);
    }
  } else {
    isInitialized = true;
    processEventQueue();
  }
}

/**
 * Load the Google Analytics script dynamically
 */
function loadGtagScript() {
  if (window.gtag) {
    isInitialized = true;
    return;
  }
  
  // Create gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  
  window.gtag('js', new Date());
  
  // Create and add the script element
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  
  script.onload = () => {
    isInitialized = true;
    console.debug('[Analytics] GA script loaded successfully');
    processEventQueue();
  };
  
  script.onerror = (error) => {
    console.error('[Analytics] Failed to load GA script:', error);
  };
  
  document.head.appendChild(script);
}

/**
 * Process any events that were queued before GA was initialized
 */
function processEventQueue() {
  if (!isInitialized || !window.gtag || eventQueue.length === 0) return;
  
  console.debug(`[Analytics] Processing ${eventQueue.length} queued events`);
  
  eventQueue.forEach(event => {
    const { type, args } = event;
    if (type === 'event') {
      const [action, params] = args;
      window.gtag('event', action, params);
    } else if (type === 'config') {
      const [id, params] = args;
      window.gtag('config', id, params);
    }
  });
  
  // Clear the queue
  eventQueue = [];
}

/**
 * Track an event in Google Analytics
 * @param {string} action - The action name (e.g., 'download_invoice')
 * @param {string} category - The event category (e.g., 'invoice')
 * @param {string} label - The event label (e.g., 'Invoice PDF Download')
 * @param {string|number} value - The event value (optional)
 * @param {Object} additionalParams - Additional parameters to include in the event (optional)
 */
export function trackEvent(action, category, label, value, additionalParams = {}) {
  const params = {
    event_category: category,
    event_label: label,
    ...additionalParams
  };
  
  if (value !== undefined && value !== null) {
    params.value = value;
  }
  
  if (isInitialized && window.gtag) {
    window.gtag('event', action, params);
  } else {
    // Queue the event if GA is not yet initialized
    eventQueue.push({
      type: 'event',
      args: [action, params]
    });
  }
}

/**
 * Track a page view in Google Analytics
 * @param {string} pagePath - The page path
 * @param {string} pageTitle - The page title
 */
export function trackPageView(pagePath, pageTitle) {
  const params = {
    page_path: pagePath,
    page_title: pageTitle,
    page_location: window.location.href
  };
  
  if (window.gtag && isInitialized) {
    window.gtag('config', GA_MEASUREMENT_ID, params);
  } else {
    console.debug('[Analytics] Queueing page view for later processing', { pagePath, pageTitle });
    eventQueue.push({ 
      type: 'config', 
      args: [GA_MEASUREMENT_ID, params]
    });
    
    // Try to initialize if it hasn't been done yet
    if (!isInitialized) {
      initAnalytics(GA_MEASUREMENT_ID);
    }
  }
}

/**
 * Track user events
 */
export const userEvents = {
  /**
   * Track user login events
   * @param {string} method - The login method (e.g., 'email', 'google')
   */
  login(method) {
    trackEvent('login', 'user', `Login via ${method}`);
  },
  
  /**
   * Track user registration events
   * @param {string} method - The registration method (e.g., 'email', 'google') 
   */
  register(method) {
    trackEvent('register', 'user', `Registration via ${method}`);
  }
};

/**
 * Track invoice events
 */
export const invoiceEvents = {
  /**
   * Track invoice creation
   * @param {string} invoiceTitle - The invoice title
   * @param {number} invoiceTotal - The invoice total amount
   */
  create(invoiceTitle, invoiceTotal) {
    trackEvent('create_invoice', 'invoice', `Invoice Created: ${invoiceTitle}`, invoiceTotal);
  },
  
  /**
   * Track invoice download
   * @param {string} invoiceTitle - The invoice title
   * @param {number} invoiceTotal - The invoice total amount
   */
  download(invoiceTitle, invoiceTotal) {
    trackEvent('download_invoice', 'invoice', `Invoice PDF Download: ${invoiceTitle}`, invoiceTotal);
  },
  
  /**
   * Track invoice update
   * @param {string} invoiceTitle - The invoice title
   */
  update(invoiceTitle) {
    trackEvent('update_invoice', 'invoice', `Invoice Updated: ${invoiceTitle}`);
  },
  
  /**
   * Track invoice view events
   * @param {string} viewType - The type of view (e.g., 'registration_modal')
   * @param {Object} params - Additional parameters for the view event
   */
  view(viewType, params = {}) {
    trackEvent('view_invoice', 'invoice', `Invoice View: ${viewType}`, null, params);
  }
}; 