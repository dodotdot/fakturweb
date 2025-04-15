import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabase'

// Import pages
const Home = () => import('../views/Home.vue')
const Login = () => import('../views/Login.vue')
const Register = () => import('../views/Register.vue')
const Dashboard = () => import('../views/Dashboard.vue')
const InvoiceEditor = () => import('../views/InvoiceEditor.vue')
const InvoiceDetail = () => import('../views/InvoiceDetail.vue')
const InvoiceList = () => import('../views/InvoiceList.vue')
const NotFound = () => import('../views/NotFound.vue')
const AuthCallback = () => import('../views/AuthCallback.vue')
const Profile = () => import('../views/Profile.vue')
const Settings = () => import('../views/Settings.vue')
const InvoicePreview = () => import('../views/InvoicePreview.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false, hideForAuth: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: false, hideForAuth: true }
  },
  {
    path: '/auth/callback',
    name: 'AuthCallback',
    component: AuthCallback,
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true }
  },
  {
    path: '/invoices',
    name: 'InvoiceList',
    component: InvoiceList,
    meta: { requiresAuth: true }
  },
  {
    path: '/invoices/new',
    name: 'NewInvoice',
    component: InvoiceEditor,
    meta: { requiresAuth: false }
  },
  {
    path: '/invoices/:id',
    name: 'InvoiceDetail',
    component: InvoiceDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/invoices/:id/edit',
    name: 'EditInvoice',
    component: InvoiceEditor,
    meta: { requiresAuth: true }
  },
  {
    path: '/guest-invoice',
    name: 'GuestInvoice',
    component: () => import('../views/GuestInvoice.vue')
  },
  {
    path: '/invoice-preview',
    name: 'InvoicePreview',
    component: InvoicePreview,
    meta: { requiresAuth: false }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Route guard for auth
router.beforeEach(async (to, from, next) => {
  // Check if the route requires authentication
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const hideForAuth = to.matched.some(record => record.meta.hideForAuth)
  
  // Get the current user session
  const { data } = await supabase.auth.getSession()
  const isAuthenticated = !!data.session

  if (requiresAuth && !isAuthenticated) {
    // Redirect to login if authentication is required but user is not logged in
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (hideForAuth && isAuthenticated) {
    // Redirect to dashboard if the page should be hidden for authenticated users
    next({ name: 'Dashboard' })
  } else {
    // For NewInvoice route - attach a flag to indicate guest mode if not authenticated
    if (to.name === 'NewInvoice' && !isAuthenticated) {
      to.params.guestMode = true
    }
    
    // Continue to the requested route
    next()
  }
})

export default router 