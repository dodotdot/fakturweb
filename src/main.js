import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createGtag } from 'vue-gtag'
import { initAnalytics, trackPageView } from './utils/analytics'

// Import CSS
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

// Google Analytics measurement ID
const GA_MEASUREMENT_ID = 'G-97KBR0Q41J'

// Initialize our analytics utility with the measurement ID
initAnalytics(GA_MEASUREMENT_ID)

// Configure Google Analytics
app.use(createGtag, {
  config: {
    id: GA_MEASUREMENT_ID,
    params: {
      send_page_view: false // We'll handle this manually on route changes
    }
  },
  enabled: process.env.NODE_ENV === 'production', // Only enable in production by default
  bootstrap: true,
  appName: 'Faktur.web.id',
  pageTrackerScreenviewEnabled: true,
  pageTrackerTemplate(to) {
    return {
      page_title: to.meta.title || 'Faktur.web.id',
      page_path: to.path,
      page_location: window.location.href
    }
  }
}, router)

app.use(pinia)
app.use(router)

// Set document title based on route and track page views
router.beforeEach((to, from, next) => {
  // Update page title
  document.title = to.meta.title || 'Faktur.web.id'
  
  // Track page view using our utility (only in production)
  if (process.env.NODE_ENV === 'production') {
    trackPageView(to.path, to.meta.title || 'Faktur.web.id')
  }
  
  next()
})

// Import and initialize auth store
import { useAuthStore } from './stores/auth'

// Initialize the app and mount after auth is checked
const init = async () => {
  const authStore = useAuthStore()
  await authStore.initialize()
  app.mount('#app')
}

init()
