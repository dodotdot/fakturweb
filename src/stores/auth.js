import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'
import { userEvents } from '../utils/analytics'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const userRole = ref('user')
  const isLoading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!user.value)
  const isSuperAdmin = computed(() => userRole.value === 'superadmin')

  async function initialize() {
    try {
      isLoading.value = true
      const { data } = await supabase.auth.getSession()
      user.value = data.session?.user || null
      
      if (user.value) {
        await fetchUserRole()
      }
    } catch (err) {
      error.value = err.message
      console.error('Error initializing auth:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchUserRole() {
    try {
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.value.id)
        .single()
      
      if (fetchError) throw fetchError
      
      userRole.value = data.role || 'user'
    } catch (err) {
      console.error('Error fetching user role:', err)
      userRole.value = 'user'
    }
  }

  async function register(email, password) {
    try {
      isLoading.value = true
      error.value = null
      
      console.log('Starting registration process with Supabase', { email })
      
      // Set up metadata for the user
      const userData = {
        email,
        password,
        options: {
          data: {
            email: email,
            full_name: '',  // Can be updated later
          }
        }
      }
      
      const { data, error: signUpError } = await supabase.auth.signUp(userData)
      
      console.log('Supabase registration response:', { 
        success: !signUpError, 
        user: data?.user ? 'user data received' : 'no user data',
        error: signUpError ? signUpError.message : 'none'
      })
      
      if (signUpError) throw signUpError
      
      // Check if user was actually created
      if (!data.user) {
        throw new Error('No user data returned from Supabase')
      }
      
      // Ensure user entry exists in users table
      try {
        const { error: userTableError } = await supabase
          .from('users')
          .upsert({
            id: data.user.id,
            email: email,
            full_name: data.user.user_metadata?.full_name || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }, { onConflict: 'id' })
          
        if (userTableError) {
          console.error('Error ensuring user record:', userTableError)
          // Don't throw, continue with sign up process
        }
      } catch (userTableErr) {
        console.error('Failed to ensure user record in database:', userTableErr)
        // Don't throw, continue with sign up process
      }
      
      user.value = data.user
      
      // Track registration event
      userEvents.register('email')
      
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
      
      // Fetch user role after login
      await fetchUserRole()
      
      // Track login event
      userEvents.login('email')
      
      return data
    } catch (err) {
      error.value = err.message
      console.error('Login error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function signInWithGoogle() {
    try {
      isLoading.value = true
      error.value = null
      
      const { data, error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      
      if (signInError) throw signInError
      
      // Note: We don't track the event here because the user will be redirected
      // This should be tracked in the callback component after successful auth
      
      return data
    } catch (err) {
      error.value = err.message
      console.error('Google sign-in error:', err)
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
      userRole.value = 'user'
    } catch (err) {
      error.value = err.message
      console.error('Logout error:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function requestPasswordReset(email) {
    try {
      isLoading.value = true
      error.value = null
      
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password/confirm`,
      })
      
      if (resetError) throw resetError
      
      return true
    } catch (err) {
      error.value = err.message
      console.error('Password reset request error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function updatePassword(newPassword) {
    try {
      isLoading.value = true
      error.value = null
      
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      })
      
      if (updateError) throw updateError
      
      return true
    } catch (err) {
      error.value = err.message
      console.error('Password update error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    userRole,
    isLoading,
    error,
    isAuthenticated,
    isSuperAdmin,
    supabase,
    initialize,
    register,
    login,
    signInWithGoogle,
    logout,
    requestPasswordReset,
    updatePassword
  }
}) 