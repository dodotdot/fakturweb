import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Import CSS
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Import and initialize auth store
import { useAuthStore } from './stores/auth'

// Initialize the app and mount after auth is checked
const init = async () => {
  const authStore = useAuthStore()
  await authStore.initialize()
  app.mount('#app')
}

init()
