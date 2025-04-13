import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!user.value)

  async function initialize() {
    try {
      isLoading.value = true
      const { data } = await supabase.auth.getSession()
      user.value = data.session?.user || null
    } catch (err) {
      error.value = err.message
      console.error('Error initializing auth:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function register(email, password) {
    try {
      isLoading.value = true
      error.value = null
      
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })
      
      if (signUpError) throw signUpError
      
      user.value = data.user
      return data
    } catch (err) {
      error.value = err.message
      console.error('Registration error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function login(email, password) {
    try {
      isLoading.value = true
      error.value = null
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (signInError) throw signInError
      
      user.value = data.user
      return data
    } catch (err) {
      error.value = err.message
      console.error('Login error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    try {
      isLoading.value = true
      error.value = null
      const { error: signOutError } = await supabase.auth.signOut()
      
      if (signOutError) throw signOutError
      
      user.value = null
    } catch (err) {
      error.value = err.message
      console.error('Logout error:', err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    initialize,
    register,
    login,
    logout
  }
}) 