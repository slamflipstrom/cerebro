import { writable } from 'svelte/store'
import { pb } from '../pocketbase'
import type { User } from '../types'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

const createAuthStore = () => {
  const { subscribe, set, update } = writable<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  })

  return {
    subscribe,
    
    async init() {
      try {
        // Check if user is already authenticated
        if (pb.authStore.isValid) {
          const user = pb.authStore.model as User
          set({
            user,
            isLoading: false,
            isAuthenticated: true
          })
        } else {
          set({
            user: null,
            isLoading: false,
            isAuthenticated: false
          })
        }
      } catch (error) {
        console.error('Auth init error:', error)
        set({
          user: null,
          isLoading: false,
          isAuthenticated: false
        })
      }
    },

    async login(email: string, password: string) {
      try {
        const authData = await pb.collection('users').authWithPassword(email, password)
        const user = authData.record as User
        
        set({
          user,
          isLoading: false,
          isAuthenticated: true
        })
        
        return { success: true, user }
      } catch (error) {
        console.error('Login error:', error)
        return { success: false, error: error.message }
      }
    },

    async register(email: string, password: string, passwordConfirm: string, username?: string) {
      try {
        const userData = {
          email,
          password,
          passwordConfirm,
          username: username || email.split('@')[0]
        }
        
        const user = await pb.collection('users').create(userData)
        
        // Auto-login after registration
        const authResult = await this.login(email, password)
        return authResult
      } catch (error) {
        console.error('Registration error:', error)
        return { success: false, error: error.message }
      }
    },

    logout() {
      pb.authStore.clear()
      set({
        user: null,
        isLoading: false,
        isAuthenticated: false
      })
    },

    async refreshAuth() {
      try {
        if (pb.authStore.isValid) {
          await pb.collection('users').authRefresh()
          const user = pb.authStore.model as User
          update(state => ({
            ...state,
            user
          }))
        }
      } catch (error) {
        console.error('Auth refresh error:', error)
        this.logout()
      }
    }
  }
}

export const authStore = createAuthStore()

// Listen to auth changes
pb.authStore.onChange(() => {
  authStore.init()
})