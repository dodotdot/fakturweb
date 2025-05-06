import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../stores/auth'

// Import pages
const Home = () => import('../views/Home.vue')
const Login = () => import('../views/Login.vue')
const Register = () => import('../views/Register.vue')
const ResetPassword = () => import('../views/ResetPassword.vue')
const ResetPasswordConfirm = () => import('../views/ResetPasswordConfirm.vue')
const Dashboard = () => import('../views/Dashboard.vue')
const InvoiceEditor = () => import('../views/InvoiceEditor.vue')
const InvoiceDetail = () => import('../views/InvoiceDetail.vue')
const InvoiceList = () => import('../views/InvoiceList.vue')
const NotFound = () => import('../views/NotFound.vue')
const AuthCallback = () => import('../views/AuthCallback.vue')
const Profile = () => import('../views/Profile.vue')
const Settings = () => import('../views/Settings.vue')
const InvoicePreview = () => import('../views/InvoicePreview.vue')
const AdminDashboard = () => import('../views/AdminDashboard.vue')
const AdminUsers = () => import('../views/admin/AdminUsers.vue')
const AdminInvoices = () => import('../views/admin/AdminInvoices.vue')
const AdminSettings = () => import('../views/admin/AdminSettings.vue')
const PublicInvoiceDetail = () => import('../views/PublicInvoiceDetail.vue')
const ClientList = () => import('../views/ClientList.vue')
const ClientEditor = () => import('../views/ClientEditor.vue')
const BusinessProfile = () => import('../views/BusinessProfile.vue')
const BetaTesterRegister = () => import('../views/BetaTesterRegister.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Faktur.web.id - Solusi Faktur Online Terbaik untuk UMKM Indonesia',
      description: 'Buat faktur profesional dengan mudah menggunakan faktur.web.id. Platform faktur online terbaik untuk UMKM Indonesia.',
      keywords: 'faktur online, invoice generator, buat faktur, faktur gratis, aplikasi faktur, faktur umkm, faktur pajak, invoice umkm, indonesia',
      requiresAuth: false,
      noSidebar: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login - Akses Akun Faktur Online Anda',
      description: 'Login ke akun faktur.web.id Anda untuk membuat dan mengelola faktur online bisnis Anda.',
      keywords: 'login faktur online, masuk akun faktur, akses faktur, faktur umkm login',
      requiresAuth: false,
      noSidebar: true
    }
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: {
      title: 'Reset Password - Faktur.web.id',
      description: 'Reset password akun faktur.web.id Anda.',
      keywords: 'reset password, lupa password, ganti password, reset akun faktur',
      requiresAuth: false,
      noSidebar: true
    }
  },
  {
    path: '/reset-password/confirm',
    name: 'ResetPasswordConfirm',
    component: ResetPasswordConfirm,
    meta: {
      title: 'Konfirmasi Reset Password - Faktur.web.id',
      description: 'Buat password baru untuk akun faktur.web.id Anda.',
      keywords: 'konfirmasi reset password, password baru, ganti password',
      requiresAuth: false,
      noSidebar: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Register - Buat Akun Faktur Online Baru',
      description: 'Daftar dan buat akun faktur online gratis untuk bisnis Anda sekarang di faktur.web.id.',
      keywords: 'daftar faktur online, buat akun faktur, register faktur gratis, akun faktur bisnis',
      requiresAuth: false,
      noSidebar: true
    }
  },
  {
    path: '/beta',
    name: 'BetaTesterRegister',
    component: BetaTesterRegister,
    meta: {
      title: 'Program Beta Tester - Dapatkan Akses Premium Gratis',
      description: 'Bergabunglah dengan program beta tester kami dan dapatkan akses premium gratis serta diskon 50% seumur hidup.',
      keywords: 'beta tester faktur, program beta, diskon premium, akses gratis, faktur online',
      requiresAuth: false,
      noSidebar: true,
      hideForAuth: true
    }
  },
  {
    path: '/auth/callback',
    name: 'AuthCallback',
    component: AuthCallback,
    meta: {
      title: 'Authentication - Processing Login',
      description: 'Processing your authentication, please wait while we redirect you.',
      requiresAuth: false,
      hideNavbar: true,
      noSidebar: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard - Ringkasan Bisnis Anda',
      description: 'Pantau dan kelola seluruh faktur dan keuangan bisnis Anda dalam satu dashboard.',
      keywords: 'dashboard faktur, ringkasan bisnis, manajemen faktur, laporan faktur umkm',
      requiresAuth: true
    }
  },
  {
    path: '/invoice',
    name: 'InvoiceList',
    component: InvoiceList,
    meta: {
      title: 'Daftar Faktur - Kelola Semua Faktur Anda',
      description: 'Lihat dan kelola semua faktur Anda dengan mudah dalam satu tampilan.',
      keywords: 'daftar faktur, kelola faktur, riwayat faktur, manajemen faktur online',
      requiresAuth: true
    }
  },
  {
    path: '/invoice/new',
    name: 'NewInvoice',
    component: InvoiceEditor,
    meta: {
      title: 'Buat Faktur Baru - Faktur Profesional',
      description: 'Buat faktur baru untuk klien Anda dengan mudah dan cepat menggunakan template profesional.',
      keywords: 'buat faktur baru, generasi faktur, faktur profesional, template faktur',
      requiresAuth: true
    }
  },
  {
    path: '/invoice/:id',
    name: 'InvoiceDetail',
    component: InvoiceDetail,
    meta: {
      title: 'Detail Faktur - Informasi Faktur Lengkap',
      description: 'Lihat detail lengkap faktur Anda termasuk pembayaran dan riwayat.',
      keywords: 'detail faktur, info faktur lengkap, status faktur, riwayat faktur',
      requiresAuth: true
    }
  },
  {
    path: '/invoice/public/:id',
    name: 'PublicInvoiceDetail',
    component: PublicInvoiceDetail,
    meta: {
      title: 'Invoice - View & Download',
      description: 'View and download shared invoice.',
      keywords: 'view invoice, share invoice, download invoice, public invoice',
      requiresAuth: false,
      noSidebar: true,
      hideNavbar: true
    }
  },
  {
    path: '/invoice/:id/edit',
    name: 'EditInvoice',
    component: InvoiceEditor,
    meta: {
      title: 'Edit Faktur - Perbarui Faktur Anda',
      description: 'Edit dan perbarui informasi pada faktur yang sudah dibuat.',
      keywords: 'edit faktur, update faktur, perbarui faktur, revisi faktur',
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Profil Pengguna - Faktur.web.id',
      description: 'Lihat dan edit informasi profil Anda. Kelola detail bisnis dan pengaturan akun Anda.',
      keywords: 'profil pengguna, edit profil, kelola bisnis, pengaturan akun',
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    redirect: '/settings/general',
    meta: {
      title: 'Pengaturan Akun - Faktur.web.id',
      description: 'Sesuaikan pengaturan faktur, notifikasi, dan preferensi akun Anda untuk pengalaman yang lebih baik.',
      keywords: 'pengaturan akun, faktur, notifikasi, preferensi',
      requiresAuth: true
    }
  },
  {
    path: '/settings/:tab',
    name: 'SettingsTab',
    component: Settings,
    props: true,
    meta: {
      title: 'Pengaturan Akun - Faktur.web.id',
      description: 'Sesuaikan pengaturan faktur, notifikasi, dan preferensi akun Anda untuk pengalaman yang lebih baik.',
      keywords: 'pengaturan akun, faktur, notifikasi, preferensi',
      requiresAuth: true
    }
  },
  {
    path: '/clients',
    name: 'ClientList',
    component: ClientList,
    meta: {
      title: 'Client Management - Faktur.web.id',
      description: 'Manage your clients - add, edit, and delete client information.',
      keywords: 'client management, customer management, client database',
      requiresAuth: true
    }
  },
  {
    path: '/clients/new',
    name: 'NewClient',
    component: ClientEditor,
    meta: {
      title: 'Add New Client - Faktur.web.id',
      description: 'Add a new client to your client database.',
      keywords: 'add client, new client, create client',
      requiresAuth: true
    }
  },
  {
    path: '/clients/:id/edit',
    name: 'EditClient',
    component: ClientEditor,
    meta: {
      title: 'Edit Client - Faktur.web.id',
      description: 'Edit existing client information.',
      keywords: 'edit client, update client, client details',
      requiresAuth: true
    }
  },
  {
    path: '/invoice/guest',
    name: 'GuestInvoice',
    component: () => import('../views/GuestInvoice.vue'),
    meta: {
      title: 'Faktur - Buat Faktur Online Gratis',
      description: 'Buat faktur online gratis untuk pelanggan Anda dengan mudah dan cepat.',
      keywords: 'buat faktur online, faktur gratis, faktur online gratis, faktur online gratis untuk pelanggan',
      requiresAuth: false,
      hideNavbar: false,
      noSidebar: true
    }
  },
  {
    path: '/invoice/preview',
    name: 'InvoicePreview',
    component: () => import('../views/InvoicePreview.vue'),
    meta: {
      title: 'Preview Faktur Online - Faktur.web.id',
      description: 'Lihat preview faktur Anda sebelum diunduh. Pastikan semua detail sudah benar dan siap dikirim ke klien Anda.',
      keywords: 'preview faktur, lihat preview, unduh faktur, klien faktur',
      requiresAuth: false,
      hideNavbar: false,
      noSidebar: true
    }
  },
  {
    path: '/terms-of-service',
    name: 'TermsOfService',
    component: () => import('../views/TermsOfService.vue'),
    meta: {
      title: 'Syarat dan Ketentuan - Faktur.web.id',
      description: 'Syarat dan ketentuan penggunaan layanan Faktur.web.id',
      keywords: 'syarat ketentuan, terms of service, faktur online, ketentuan layanan'
    }
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('../views/PrivacyPolicy.vue'),
    meta: {
      title: 'Kebijakan Privasi - Faktur.web.id',
      description: 'Kebijakan privasi penggunaan layanan Faktur.web.id',
      keywords: 'kebijakan privasi, privacy policy, keamanan data, perlindungan data'
    }
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: {
      title: 'Admin Dashboard - System Monitoring',
      description: 'Administrator dashboard for monitoring system usage and managing users',
      keywords: 'admin dashboard, super admin, system management, user management',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: AdminUsers,
    meta: {
      title: 'User Management - Admin',
      description: 'Manage system users, roles and permissions',
      keywords: 'admin users, user management, system management, user roles',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/admin/invoices',
    name: 'AdminInvoices',
    component: AdminInvoices,
    meta: {
      title: 'Invoice Analytics - Admin',
      description: 'View invoice analytics and reports across all users',
      keywords: 'admin invoices, invoice analytics, invoice reporting, system analytics',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/admin/settings',
    name: 'AdminSettings',
    component: AdminSettings,
    meta: {
      title: 'System Settings - Admin',
      description: 'Configure system-wide settings and preferences',
      keywords: 'admin settings, system settings, global configuration, admin console',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/business-profile',
    name: 'business-profile',
    component: BusinessProfile,
    meta: {
      requiresAuth: true,
      title: 'Business Profile - Faktur'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '404 - Halaman Tidak Ditemukan',
      description: 'Halaman yang Anda cari tidak ditemukan atau telah dipindahkan.',
      requiresAuth: false,
      hideNavbar: true,
      noSidebar: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Route guard for auth
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const hideForAuth = to.matched.some(record => record.meta.hideForAuth)
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)
  
  // Initialize auth store if not already initialized
  if (!authStore.initialized) {
    authStore.initialize()
  }

  // Get the current user session
  const { data } = await supabase.auth.getSession()
  const isAuthenticated = !!data.session

  if (requiresAuth && !isAuthenticated) {
    // Redirect to login if authentication is required but user is not logged in
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (hideForAuth && isAuthenticated) {
    // Redirect to dashboard if the page should be hidden for authenticated users
    next({ name: 'Dashboard' })
  } else if (requiresAdmin && !authStore.isSuperAdmin) {
    // Redirect non-admin users to dashboard
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