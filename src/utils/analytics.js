/**
 * Utility functions for Google Analytics event tracking
 */

// Store the measurement ID from the main.js config
let GA_MEASUREMENT_ID = 'G-97KBR0Q41J'; // Default ID, will be updated when available

/**
 * Initialize the analytics module with the measurement ID
 * @param {string} measurementId - The Google Analytics measurement ID
 */
export function initAnalytics(measurementId) {
  GA_MEASUREMENT_ID = measurementId;
}

/**
 * Track an event in Google Analytics
 * @param {string} action - The action name (e.g., 'download_invoice')
 * @param {string} category - The event category (e.g., 'invoice')
 * @param {string} label - The event label (e.g., 'Invoice PDF Download')
 * @param {string|number} value - The event value (optional)
 */
export function trackEvent(action, category, label, value) {
  // Check if gtag is available globally
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  } else {
    console.debug('[Analytics] gtag not available', { action, category, label, value });
  }
}

/**
 * Track a page view in Google Analytics
 * @param {string} pagePath - The page path
 * @param {string} pageTitle - The page title
 */
export function trackPageView(pagePath, pageTitle) {
  if (window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle
    });
  } else {
    console.debug('[Analytics] gtag not available for page view', { pagePath, pageTitle });
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
  }
}; 