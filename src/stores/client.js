import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../lib/supabase'

export const useClientStore = defineStore('client', () => {
  const clients = ref([])
  const currentClient = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  // Reset current client
  function resetClient() {
    currentClient.value = {
      name: '',
      address: '',
      email: '',
      phone: ''
    }
  }

  // Fetch all clients for the authenticated user
  async function fetchClients() {
    try {
      isLoading.value = true
      error.value = null
      
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error('User not authenticated')
      
      const { data, error: fetchError } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', userData.user.id)
        .order('name', { ascending: true })
      
      if (fetchError) throw fetchError
      
      clients.value = data
      return clients.value
    } catch (err) {
      error.value = err.message
      console.error('Fetch clients error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Get a specific client by ID
  async function getClient(id) {
    try {
      isLoading.value = true
      error.value = null
      
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error('User not authenticated')
      
      const { data, error: fetchError } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .eq('user_id', userData.user.id)
        .single()
      
      if (fetchError) throw fetchError
      
      currentClient.value = data
      return currentClient.value
    } catch (err) {
      error.value = err.message
      console.error('Get client error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Create a new client
  async function createClient(clientData) {
    try {
      isLoading.value = true
      error.value = null
      
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error('User not authenticated')
      
      const newClient = {
        ...clientData,
        user_id: userData.user.id
      }
      
      const { data, error: insertError } = await supabase
        .from('clients')
        .insert(newClient)
        .select()
        .single()
      
      if (insertError) throw insertError
      
      // Add the newly created client to the list
      clients.value.push(data)
      
      return data
    } catch (err) {
      error.value = err.message
      console.error('Create client error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Update an existing client
  async function updateClient(id, clientData) {
    try {
      isLoading.value = true
      error.value = null
      
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error('User not authenticated')
      
      const { data, error: updateError } = await supabase
        .from('clients')
        .update(clientData)
        .eq('id', id)
        .eq('user_id', userData.user.id)
        .select()
        .single()
      
      if (updateError) throw updateError
      
      // Update the client in the list
      const index = clients.value.findIndex(client => client.id === id)
      if (index !== -1) {
        clients.value[index] = data
      }
      
      currentClient.value = data
      return data
    } catch (err) {
      error.value = err.message
      console.error('Update client error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Delete a client
  async function deleteClient(id) {
    try {
      isLoading.value = true
      error.value = null
      
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error('User not authenticated')
      
      const { error: deleteError } = await supabase
        .from('clients')
        .delete()
        .eq('id', id)
        .eq('user_id', userData.user.id)
      
      if (deleteError) throw deleteError
      
      // Remove from local array
      clients.value = clients.value.filter(client => client.id !== id)
      
      return true
    } catch (err) {
      error.value = err.message
      console.error('Delete client error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Initialize the store
  resetClient()

  return {
    clients,
    currentClient,
    isLoading,
    error,
    resetClient,
    fetchClients,
    getClient,
    createClient,
    updateClient,
    deleteClient
  }
}) 