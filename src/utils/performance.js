/**
 * Performance Tracking Utility
 * 
 * Provides functions to measure and report various performance metrics:
 * - Font loading time
 * - Navigation timing
 * - First contentful paint
 * - Core Web Vitals where available
 */

// Initialize metrics collection
const metrics = {
  navigationStart: performance.now(),
  fontLoadStart: performance.now(),
  fontLoadEnd: null,
  firstContentfulPaint: null,
  largestContentfulPaint: null,
  firstInputDelay: null,
  cumulativeLayoutShift: null,
  pageLoaded: null
};

/**
 * Track the font loading time
 * @param {boolean} complete - Whether font loading is complete
 * @returns {number} - Time taken to load fonts in ms
 */
export function trackFontLoading(complete = false) {
  if (complete && !metrics.fontLoadEnd) {
    metrics.fontLoadEnd = performance.now();
    const duration = Math.round(metrics.fontLoadEnd - metrics.fontLoadStart);
    
    // Log and potentially send to analytics
    console.log(`Fonts loaded in ${duration}ms`);
    
    // Return duration for further use
    return duration;
  }
  return 0;
}

/**
 * Track page navigation timing
 * @param {string} routeName - Name of the route navigated to
 * @returns {number} - Time taken for navigation in ms
 */
export function trackNavigation(routeName) {
  const navigationEnd = performance.now();
  const duration = Math.round(navigationEnd - metrics.navigationStart);
  
  // Log and potentially send to analytics
  console.log(`Navigation to ${routeName} completed in ${duration}ms`);
  
  // Reset navigation start time for next navigation
  metrics.navigationStart = performance.now();
  
  return duration;
}

/**
 * Initialize performance tracking, including Web Vitals if available
 */
export function initPerformanceTracking() {
  // Mark when the page is loaded
  window.addEventListener('load', () => {
    metrics.pageLoaded = performance.now();
    console.log(`Page loaded in ${Math.round(metrics.pageLoaded)}ms`);
    
    // Track Core Web Vitals if browser supports it
    trackWebVitals();
  });
  
  // Return the metrics object for reference
  return metrics;
}

/**
 * Track core web vitals using the Performance Observer API where available
 */
function trackWebVitals() {
  // Check for Performance Observer support
  if (!('PerformanceObserver' in window)) {
    return;
  }
  
  try {
    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        const fcp = entries[0];
        metrics.firstContentfulPaint = Math.round(fcp.startTime);
        console.log(`First Contentful Paint: ${metrics.firstContentfulPaint}ms`);
      }
      fcpObserver.disconnect();
    });
    fcpObserver.observe({ type: 'paint', buffered: true });
    
    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      metrics.largestContentfulPaint = Math.round(lastEntry.startTime);
      console.log(`Largest Contentful Paint: ${metrics.largestContentfulPaint}ms`);
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    
    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((entryList) => {
      let clsValue = 0;
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      metrics.cumulativeLayoutShift = clsValue.toFixed(3);
      console.log(`Cumulative Layout Shift: ${metrics.cumulativeLayoutShift}`);
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
    
    // First Input Delay
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      for (const entry of entries) {
        metrics.firstInputDelay = Math.round(entry.processingStart - entry.startTime);
        console.log(`First Input Delay: ${metrics.firstInputDelay}ms`);
        break;
      }
      fidObserver.disconnect();
    });
    fidObserver.observe({ type: 'first-input', buffered: true });
    
  } catch (e) {
    console.warn('Error setting up performance monitoring:', e);
  }
}

/**
 * Get the current performance metrics
 * @returns {Object} - All collected performance metrics
 */
export function getPerformanceMetrics() {
  return { ...metrics };
}

// Initialize performance tracking by default
initPerformanceTracking(); 