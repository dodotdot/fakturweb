import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'

export const useInvoiceStore = defineStore('invoice', () => {
  const invoices = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const isGuestMode = ref(false)
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
    notes: 'Payment is due within 30 days. Thank you for your business!',
    logo: null
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
      notes: 'Payment is due within 30 days. Thank you for your business!',
      logo: null
    }
  }

  async function saveInvoice() {
    try {
      isLoading.value = true
      error.value = null
      
      // Check if user is authenticated
      const { data: userData } = await supabase.auth.getUser()
      
      // If no user is found, we're in guest mode
      if (!userData.user) {
        isGuestMode.value = true
        // In guest mode, we don't save to database
        // Here you could implement local storage saving instead
        return 'guest-mode'
      }
      
      // Map our JS camelCase properties to the DB's snake_case columns
      const invoiceData = {
        title: currentInvoice.value.title,
        date: currentInvoice.value.date,
        due_date: currentInvoice.value.dueDate, // Map dueDate to due_date
        from_details: currentInvoice.value.from,
        to_details: currentInvoice.value.to,
        items: currentInvoice.value.items,
        tax_rate: currentInvoice.value.taxRate,
        notes: currentInvoice.value.notes,
        logo: currentInvoice.value.logo,
        user_id: userData.user.id,
        created_at: new Date().toISOString(),
        status: 'draft'
      }
      
      console.log('Saving invoice with data:', invoiceData);
      
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
      
      // Map DB snake_case to JS camelCase
      invoices.value = data.map(invoice => ({
        id: invoice.id,
        title: invoice.title,
        date: invoice.date,
        dueDate: invoice.due_date,
        from: invoice.from_details,
        to: invoice.to_details,
        items: invoice.items,
        taxRate: invoice.tax_rate,
        notes: invoice.notes,
        logo: invoice.logo,
        status: invoice.status,
        created_at: invoice.created_at,
        updated_at: invoice.updated_at
      }))
      
      return invoices.value
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
      
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error('User not authenticated')
      
      const { data, error: fetchError } = await supabase
        .from('invoices')
        .select('*')
        .eq('id', id)
        .eq('user_id', userData.user.id)
        .single()
      
      if (fetchError) throw fetchError
      
      // Map DB snake_case to JS camelCase
      currentInvoice.value = {
        id: data.id,
        title: data.title,
        date: data.date,
        dueDate: data.due_date,
        from: data.from_details,
        to: data.to_details,
        items: data.items,
        taxRate: data.tax_rate,
        notes: data.notes,
        logo: data.logo,
        status: data.status,
        created_at: data.created_at,
        updated_at: data.updated_at
      }
      
      return currentInvoice.value
    } catch (err) {
      error.value = err.message
      console.error('Get invoice error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Add a download PDF function for guest mode
  function downloadPDF(element) {
    // This function would be implemented with html2pdf
    // Could be implemented here or in the component
  }

  function setGuestMode(isGuest) {
    isGuestMode.value = isGuest
  }

  async function deleteInvoice(id) {
    try {
      isLoading.value = true
      error.value = null
      
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error('User not authenticated')
      
      const { error: deleteError } = await supabase
        .from('invoices')
        .delete()
        .eq('id', id)
        .eq('user_id', userData.user.id)
      
      if (deleteError) throw deleteError
      
      // Remove from local array
      invoices.value = invoices.value.filter(invoice => invoice.id !== id)
      
      return true
    } catch (err) {
      error.value = err.message
      console.error('Delete invoice error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function generateShareLink(invoiceId) {
    try {
      isLoading.value = true
      error.value = null
      
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error('User not authenticated')
      
      // First check if the invoice exists and belongs to this user
      const { data: invoiceData, error: fetchError } = await supabase
        .from('invoices')
        .select('id, is_public')
        .eq('id', invoiceId)
        .eq('user_id', userData.user.id)
        .single()
      
      if (fetchError) throw fetchError
      
      // Update the invoice to make it public if it's not already
      if (!invoiceData.is_public) {
        const { error: updateError } = await supabase
          .from('invoices')
          .update({ is_public: true })
          .eq('id', invoiceId)
          .eq('user_id', userData.user.id)
        
        if (updateError) throw updateError
      }
      
      // Generate the share link
      const baseUrl = window.location.origin
      const shareLink = `${baseUrl}/invoice/public/${invoiceId}`
      
      return shareLink
    } catch (err) {
      error.value = err.message
      console.error('Generate share link error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function updateInvoice(updatedInvoice) {
    try {
      isLoading.value = true;
      error.value = null;

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('User not authenticated');

      // Map our JS camelCase properties to the DB's snake_case columns
      const invoiceData = {
        title: updatedInvoice.title,
        date: updatedInvoice.date,
        due_date: updatedInvoice.dueDate,
        from_details: updatedInvoice.from,
        to_details: updatedInvoice.to,
        items: updatedInvoice.items,
        tax_rate: updatedInvoice.taxRate,
        notes: updatedInvoice.notes,
        logo: updatedInvoice.logo,
        updated_at: new Date().toISOString()
      };

      const { error: updateError } = await supabase
        .from('invoices')
        .update(invoiceData)
        .eq('id', updatedInvoice.id)
        .eq('user_id', userData.user.id);

      if (updateError) throw updateError;

      // Update the current invoice in the store
      currentInvoice.value = updatedInvoice;

      // Update the invoice in the invoices list
      const index = invoices.value.findIndex(inv => inv.id === updatedInvoice.id);
      if (index !== -1) {
        invoices.value[index] = updatedInvoice;
      }

      return updatedInvoice.id;
    } catch (err) {
      error.value = err.message;
      console.error('Update invoice error:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function updateInvoiceStatus(invoiceId, status) {
    try {
      isLoading.value = true;
      error.value = null;

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('User not authenticated');

      // Update only the status field
      const { error: updateError } = await supabase
        .from('invoices')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', invoiceId)
        .eq('user_id', userData.user.id);

      if (updateError) throw updateError;

      // Update the current invoice status if it's the active one
      if (currentInvoice.value && currentInvoice.value.id === invoiceId) {
        currentInvoice.value.status = status;
      }

      // Update the invoice in the invoices list
      const index = invoices.value.findIndex(inv => inv.id === invoiceId);
      if (index !== -1) {
        invoices.value[index].status = status;
      }

      return true;
    } catch (err) {
      error.value = err.message;
      console.error('Update invoice status error:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    invoices,
    currentInvoice,
    isLoading,
    error,
    isGuestMode,
    subtotal,
    taxAmount,
    total,
    calculateItemTotal,
    calculateTotals,
    addItem,
    deleteItem,
    resetInvoice,
    saveInvoice,
    updateInvoice,
    updateInvoiceStatus,
    fetchUserInvoices,
    getInvoice,
    deleteInvoice,
    setGuestMode,
    downloadPDF,
    generateShareLink
  }
}) 