import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'

export const useInvoiceStore = defineStore('invoice', () => {
  const invoices = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const currentInvoice = ref({
    title: 'INVOICE #001',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
    from: {
      name: 'Your Name / Company',
      address: 'Your Address\nCity, State ZIP',
      email: 'your@email.com',
      phone: '(123) 456-7890'
    },
    to: {
      name: 'Client Name',
      address: 'Client Address\nCity, State ZIP',
      email: 'client@email.com',
      phone: '(098) 765-4321'
    },
    items: [
      {
        description: 'Service / Product',
        quantity: 1,
        unitPrice: 100,
        total: 100
      }
    ],
    taxRate: 10,
    notes: 'Payment is due within 30 days. Thank you for your business!'
  })

  const subtotal = computed(() => {
    return currentInvoice.value.items.reduce((sum, item) => sum + item.total, 0)
  })

  const taxAmount = computed(() => {
    return subtotal.value * (currentInvoice.value.taxRate / 100)
  })

  const total = computed(() => {
    return subtotal.value + taxAmount.value
  })

  function calculateItemTotal(index) {
    const item = currentInvoice.value.items[index]
    item.total = item.quantity * item.unitPrice
  }

  function calculateTotals() {
    currentInvoice.value.items.forEach((item, index) => {
      calculateItemTotal(index)
    })
  }

  function addItem() {
    currentInvoice.value.items.push({
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    })
  }

  function deleteItem(index) {
    if (currentInvoice.value.items.length > 1) {
      currentInvoice.value.items.splice(index, 1)
      calculateTotals()
    }
  }

  function resetInvoice() {
    currentInvoice.value = {
      title: 'INVOICE #001',
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      from: {
        name: 'Your Name / Company',
        address: 'Your Address\nCity, State ZIP',
        email: 'your@email.com',
        phone: '(123) 456-7890'
      },
      to: {
        name: 'Client Name',
        address: 'Client Address\nCity, State ZIP',
        email: 'client@email.com',
        phone: '(098) 765-4321'
      },
      items: [
        {
          description: 'Service / Product',
          quantity: 1,
          unitPrice: 100,
          total: 100
        }
      ],
      taxRate: 10,
      notes: 'Payment is due within 30 days. Thank you for your business!'
    }
  }

  async function saveInvoice() {
    try {
      isLoading.value = true
      error.value = null
      
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error('User not authenticated')
      
      const invoiceData = {
        ...currentInvoice.value,
        user_id: userData.user.id,
        created_at: new Date().toISOString()
      }
      
      const { data, error: saveError } = await supabase
        .from('invoices')
        .insert(invoiceData)
        .select('id')
        .single()
      
      if (saveError) throw saveError
      
      // Add the newly created invoice to the list
      invoices.value.push({
        id: data.id,
        ...currentInvoice.value
      })
      
      return data.id
    } catch (err) {
      error.value = err.message
      console.error('Save invoice error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function fetchUserInvoices() {
    try {
      isLoading.value = true
      error.value = null
      
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error('User not authenticated')
      
      const { data, error: fetchError } = await supabase
        .from('invoices')
        .select('*')
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: false })
      
      if (fetchError) throw fetchError
      
      invoices.value = data
      return data
    } catch (err) {
      error.value = err.message
      console.error('Fetch invoices error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function getInvoice(id) {
    try {
      isLoading.value = true
      error.value = null
      
      // First check if it's in local state
      const existingInvoice = invoices.value.find(inv => inv.id === id)
      if (existingInvoice) {
        currentInvoice.value = existingInvoice
        return existingInvoice
      }
      
      // Otherwise fetch from API
      const { data, error: fetchError } = await supabase
        .from('invoices')
        .select('*')
        .eq('id', id)
        .single()
      
      if (fetchError) throw fetchError
      
      currentInvoice.value = data
      return data
    } catch (err) {
      error.value = err.message
      console.error('Get invoice error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    invoices,
    currentInvoice,
    isLoading,
    error,
    subtotal,
    taxAmount,
    total,
    calculateItemTotal,
    calculateTotals,
    addItem,
    deleteItem,
    resetInvoice,
    saveInvoice,
    fetchUserInvoices,
    getInvoice
  }
}) 