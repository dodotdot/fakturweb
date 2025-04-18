import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { initAnalytics, trackPageView } from './utils/analytics'
import i18n from './i18n'

// Import Toast
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// Import CSS
import './assets/main.css'

// Google Analytics measurement ID
const GA_MEASUREMENT_ID = 'G-97KBR0Q41J'

// Initialize our analytics utility with the measurement ID early
// This will trigger script loading if needed
initAnalytics(GA_MEASUREMENT_ID)

const app = createApp(App)
const pinia = createPinia()

// Configure toast options
const toastOptions = {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
};

// Set document title based on route and track page views
router.beforeEach((to, from, next) => {
  // Update page title
  document.title = to.meta.title || 'Faktur.web.id'
  next()
})

// Track page views after navigation is complete
router.afterEach((to) => {
  // Track page view using our utility
  trackPageView(to.path, to.meta.title || 'Faktur.web.id')
})

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(Toast, toastOptions)

// Import and initialize auth store
import { useAuthStore } from './stores/auth'

// Check if localStorage is available
function isLocalStorageAvailable() {
  try {
    const testKey = '__test_key__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.warn('localStorage is not available:', e);
    return false;
  }
}

// Initialize the app and mount after auth is checked
const init = async () => {
  try {
    // First initialize auth
    const authStore = useAuthStore()
    await authStore.initialize()
    
    // Initialize i18n with stored preference if available
    if (isLocalStorageAvailable()) {
      try {
        const storedLocale = localStorage.getItem('preferred_language')
        if (storedLocale && ['id', 'en'].includes(storedLocale)) {
          i18n.global.locale.value = storedLocale
          console.log('Setting global locale from localStorage:', storedLocale)
        } else {
          // If no valid language in localStorage, set a default
          console.log('No valid language in localStorage, using default: id')
          i18n.global.locale.value = 'id'
          // Try to save the default to localStorage
          localStorage.setItem('preferred_language', 'id')
        }
      } catch (e) {
        console.warn('Failed to initialize locale from localStorage:', e)
        // Set default locale if localStorage access fails
        i18n.global.locale.value = 'id'
      }
    } else {
      console.log('localStorage not available, using default locale: id')
      i18n.global.locale.value = 'id'
    }
    
    // Mount the app
    app.mount('#app')
    console.log('App mounted successfully with locale:', i18n.global.locale.value)
    
  } catch (error) {
    console.error('Error initializing app:', error)
    // Mount anyway to show error state
    app.mount('#app')
  }
}

init()
