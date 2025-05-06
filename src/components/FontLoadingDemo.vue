<template>
  <div class="font-loading-demo">
    <h2>Font Loading Demonstration</h2>
    
    <div class="status-panel">
      <div class="status-item">
        <span class="status-label">Font Loading Status:</span>
        <span 
          class="status-value" 
          :class="{ 
            'status-loading': isLoading, 
            'status-loaded': isLoaded,
            'status-error': hasError
          }"
        >
          {{ fontStatus }}
        </span>
      </div>
      
      <div class="status-item">
        <span class="status-label">Loading Time:</span>
        <span class="status-value">{{ loadingTime }}</span>
      </div>
    </div>
    
    <div class="font-examples">
      <h3>Font Samples</h3>
      
      <div class="font-sample">
        <h4>Primary Font (Inter)</h4>
        <div class="sample-container">
          <p class="sample-text sample-regular">Regular: The quick brown fox jumps over the lazy dog.</p>
          <p class="sample-text sample-medium">Medium: The quick brown fox jumps over the lazy dog.</p>
          <p class="sample-text sample-semibold">Semibold: The quick brown fox jumps over the lazy dog.</p>
          <p class="sample-text sample-bold">Bold: The quick brown fox jumps over the lazy dog.</p>
        </div>
      </div>
      
      <div class="font-sample">
        <h4>Secondary Font (Plus Jakarta Sans)</h4>
        <div class="sample-container">
          <p class="sample-text jakarta sample-regular">Regular: The quick brown fox jumps over the lazy dog.</p>
          <p class="sample-text jakarta sample-medium">Medium: The quick brown fox jumps over the lazy dog.</p>
          <p class="sample-text jakarta sample-semibold">Semibold: The quick brown fox jumps over the lazy dog.</p>
          <p class="sample-text jakarta sample-bold">Bold: The quick brown fox jumps over the lazy dog.</p>
        </div>
      </div>
    </div>
    
    <div class="performance-metrics" v-if="metrics">
      <h3>Performance Metrics</h3>
      <table class="metrics-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in filteredMetrics" :key="key">
            <td>{{ formatMetricName(key) }}</td>
            <td>{{ formatMetricValue(key, value) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="actions">
      <button @click="reloadPage" class="action-button">Reload Page</button>
      <button @click="clearFontCache" class="action-button">Clear Font Cache</button>
      <button @click="refreshMetrics" class="action-button">Refresh Metrics</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { getPerformanceMetrics } from '../utils/performance';

export default {
  name: 'FontLoadingDemo',
  
  setup() {
    const isLoading = ref(true);
    const isLoaded = ref(false);
    const hasError = ref(false);
    const loadTime = ref(null);
    const metrics = ref(null);
    
    // Computed properties
    const fontStatus = computed(() => {
      if (isLoaded.value) return 'Loaded';
      if (hasError.value) return 'Error';
      return 'Loading...';
    });
    
    const loadingTime = computed(() => {
      if (loadTime.value === null) return 'Not measured yet';
      return `${loadTime.value}ms`;
    });
    
    const filteredMetrics = computed(() => {
      if (!metrics.value) return {};
      
      // Filter out null values and format others
      const filtered = {};
      Object.entries(metrics.value).forEach(([key, value]) => {
        if (value !== null) {
          filtered[key] = value;
        }
      });
      
      return filtered;
    });
    
    // Methods
    const checkFontStatus = () => {
      isLoaded.value = document.documentElement.classList.contains('fonts-loaded');
      isLoading.value = document.documentElement.classList.contains('fonts-loading');
      hasError.value = !isLoaded.value && !isLoading.value;
      
      // Get metrics
      refreshMetrics();
    };
    
    const reloadPage = () => {
      window.location.reload();
    };
    
    const clearFontCache = () => {
      try {
        sessionStorage.removeItem('fonts-loaded');
        localStorage.removeItem('fonts-loaded');
        reloadPage();
      } catch (e) {
        console.error('Failed to clear font cache:', e);
      }
    };
    
    const refreshMetrics = () => {
      metrics.value = getPerformanceMetrics();
      // Extract font loading time if available
      if (metrics.value.fontLoadEnd && metrics.value.fontLoadStart) {
        loadTime.value = Math.round(metrics.value.fontLoadEnd - metrics.value.fontLoadStart);
      }
    };
    
    const formatMetricName = (key) => {
      // Convert camelCase to Title Case with spaces
      return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
    };
    
    const formatMetricValue = (key, value) => {
      // Format based on metric type
      if (key.toLowerCase().includes('time') || 
          key.toLowerCase().includes('paint') || 
          key.toLowerCase().includes('delay')) {
        return `${value}ms`;
      }
      return value;
    };
    
    // Setup lifecycle hooks
    onMounted(() => {
      checkFontStatus();
      
      // Check again after a short delay to account for possible font loading that happened earlier
      setTimeout(checkFontStatus, 100);
      
      // If fonts are still loading, add a listener to detect when they're done
      if (isLoading.value) {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class' && 
                mutation.target === document.documentElement) {
              checkFontStatus();
            }
          });
        });
        
        observer.observe(document.documentElement, { attributes: true });
        
        // Set a timeout to check one last time
        setTimeout(() => {
          checkFontStatus();
          observer.disconnect();
        }, 5000);
      }
    });
    
    return {
      isLoading,
      isLoaded,
      hasError,
      fontStatus,
      loadingTime,
      metrics,
      filteredMetrics,
      reloadPage,
      clearFontCache,
      refreshMetrics,
      formatMetricName,
      formatMetricValue
    };
  }
}
</script>

<style scoped>
.font-loading-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

h2 {
  margin-top: 0;
  color: #333;
}

.status-panel {
  background-color: #f5f7fa;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 2rem;
}

.status-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.status-label {
  font-weight: 500;
}

.status-value {
  font-weight: 600;
}

.status-loading {
  color: #f59e0b;
}

.status-loaded {
  color: #10b981;
}

.status-error {
  color: #ef4444;
}

.font-examples {
  margin-bottom: 2rem;
}

.font-sample {
  margin-bottom: 1.5rem;
}

.sample-container {
  background-color: #f5f7fa;
  border-radius: 6px;
  padding: 1rem;
}

.sample-text {
  margin: 0.5rem 0;
}

.sample-regular {
  font-weight: 400;
}

.sample-medium {
  font-weight: 500;
}

.sample-semibold {
  font-weight: 600;
}

.sample-bold {
  font-weight: 700;
}

.jakarta {
  font-family: 'Plus Jakarta Sans', var(--font-sans);
}

.performance-metrics {
  margin-bottom: 2rem;
}

.metrics-table {
  width: 100%;
  border-collapse: collapse;
}

.metrics-table th,
.metrics-table td {
  text-align: left;
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.metrics-table th {
  background-color: #f5f7fa;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 1rem;
}

.action-button {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-button:hover {
  background-color: #2563eb;
}
</style> 