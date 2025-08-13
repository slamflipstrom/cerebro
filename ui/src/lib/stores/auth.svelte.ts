import { pb } from '../pocketbase'
import type { User } from '../types'

class AuthStore {
  user = $state<User | null>(null)
  isLoading = $state(true)
  isAuthenticated = $state(false)

  async init() {
    try {
      // Check if user is already authenticated
      if (pb.authStore.isValid) {
        this.user = pb.authStore.model as User
        this.isAuthenticated = true
      } else {
        this.user = null
        this.isAuthenticated = false
      }
    } catch (error) {
      console.error('Auth init error:', error)
      this.user = null
      this.isAuthenticated = false
    } finally {
      this.isLoading = false
    }
  }

  async login(email: string, password: string) {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password)
      this.user = authData.record as User
      this.isAuthenticated = true
      this.isLoading = false
      
      return { success: true, user: this.user }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: error.message }
    }
  }

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
  }

  logout() {
    pb.authStore.clear()
    this.user = null
    this.isAuthenticated = false
    this.isLoading = false
  }

  async refreshAuth() {
    try {
      if (pb.authStore.isValid) {
        await pb.collection('users').authRefresh()
        this.user = pb.authStore.model as User
      }
    } catch (error) {
      console.error('Auth refresh error:', error)
      this.logout()
    }
  }
}

export const authStore = new AuthStore()

// Listen to auth changes
pb.authStore.onChange(() => {
  authStore.init()
})