import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { initAnalytics, trackPageView } from './utils/analytics'
import i18n from './i18n'

// Import CSS
import './assets/main.css'

// Google Analytics measurement ID
const GA_MEASUREMENT_ID = 'G-97KBR0Q41J'

// Initialize our analytics utility with the measurement ID early
// This will trigger script loading if needed
initAnalytics(GA_MEASUREMENT_ID)

const app = createApp(App)
const pinia = createPinia()

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

// Import and initialize auth store
import { useAuthStore } from './stores/auth'

// Initialize the app and mount after auth is checked
const init = async () => {
  const authStore = useAuthStore()
  await authStore.initialize()
  app.mount('#app')
}

init()
