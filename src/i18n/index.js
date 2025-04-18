import { createI18n } from 'vue-i18n'

// Pesan yang akan diterjemahkan dikelompokkan berdasarkan namespace
const messages = {
  id: {
    // UI elements
    ui: {
      fillData: 'Isi Data',
      chooseTheme: 'Pilih Tema',
      downloadPDF: 'Unduh PDF',
      createInvoiceMessage: 'Buat dan unduh faktur sekali pakai tanpa perlu mendaftar',
      preview: 'Preview'
    },
    // Invoice content
    invoice: {
      uploadLogo: 'Unggah Logo',
      date: 'Tanggal',
      dueDate: 'Jatuh Tempo',
      from: 'Dari',
      billTo: 'Tagih Kepada',
      items: 'Item',
      addItem: 'Tambah Item',
      description: 'Deskripsi',
      quantity: 'Jumlah',
      price: 'Harga',
      total: 'Total',
      subtotal: 'Subtotal',
      taxRate: 'Persentase Pajak',
      taxAmount: 'Jumlah Pajak',
      notes: 'Catatan',
      nameCompanyPlaceholder: 'Nama Anda / Perusahaan',
      addressPlaceholder: 'Alamat Anda',
      email: 'Email',
      phone: 'Telepon',
      clientNamePlaceholder: 'Nama Klien',
      clientAddressPlaceholder: 'Alamat Klien',
      itemDescriptionPlaceholder: 'Deskripsi item',
      notesPlaceholder: 'Tambahkan catatan atau syarat pembayaran...'
    }
  },
  en: {
    // UI elements (keep the same as Indonesian for now)
    ui: {
      fillData: 'Isi Data',
      chooseTheme: 'Pilih Tema',
      downloadPDF: 'Unduh PDF',
      createInvoiceMessage: 'Buat dan unduh faktur sekali pakai tanpa perlu mendaftar',
      preview: 'Preview'
    },
    // Invoice content (translatable)
    invoice: {
      uploadLogo: 'Upload Logo',
      date: 'Date',
      dueDate: 'Due Date',
      from: 'From',
      billTo: 'Bill To',
      items: 'Items',
      addItem: 'Add Item',
      description: 'Description',
      quantity: 'Qty',
      price: 'Price',
      total: 'Total',
      subtotal: 'Subtotal',
      taxRate: 'Tax Rate',
      taxAmount: 'Tax Amount',
      notes: 'Notes',
      nameCompanyPlaceholder: 'Your Name / Company',
      addressPlaceholder: 'Your Address',
      email: 'Email',
      phone: 'Phone',
      clientNamePlaceholder: 'Client Name',
      clientAddressPlaceholder: 'Client Address',
      itemDescriptionPlaceholder: 'Item description',
      notesPlaceholder: 'Add notes or payment terms...'
    }
  }
}

// Mendapatkan bahasa yang disimpan atau menggunakan default
let savedLocale = 'id'
try {
  // Check if localStorage is available in this environment
  if (typeof localStorage !== 'undefined') {
    const storedLocale = localStorage.getItem('preferred_language')
    if (storedLocale && ['id', 'en'].includes(storedLocale)) {
      savedLocale = storedLocale
      console.log('i18n: Using stored locale from localStorage:', savedLocale)
    } else {
      console.log('i18n: No valid locale in localStorage, using default:', savedLocale)
    }
  } else {
    console.warn('i18n: localStorage is not available in this environment')
  }
} catch (e) {
  console.warn('i18n: Failed to access localStorage for language preference:', e)
}

// Buat instance i18n
const i18n = createI18n({
  legacy: false, // Gunakan Composition API
  locale: savedLocale, // Default language
  fallbackLocale: 'id', // Fallback language
  messages,
  // Enable logging in development mode
  silentTranslationWarn: process.env.NODE_ENV === 'production',
  silentFallbackWarn: process.env.NODE_ENV === 'production',
  missingWarn: process.env.NODE_ENV !== 'production',
  fallbackWarn: process.env.NODE_ENV !== 'production'
})

export default i18n 