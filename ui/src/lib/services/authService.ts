import { pb } from '../pocketbase'
import type { User } from '../types'

export class AuthService {
  async getCurrentUser(): Promise<User | null> {
    if (!pb.authStore.isValid) {
      return null
    }
    return pb.authStore.model as User
  }

  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password)
      return { success: true, user: authData.record as User }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  async register(data: {
    email: string
    password: string
    passwordConfirm: string
    username?: string
    name?: string
  }): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const userData = {
        ...data,
        username: data.username || data.email.split('@')[0]
      }
      
      const user = await pb.collection('users').create<User>(userData)
      
      // Send verification email
      await pb.collection('users').requestVerification(data.email)
      
      return { success: true, user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  async logout(): Promise<void> {
    pb.authStore.clear()
  }

  async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      await pb.collection('users').requestPasswordReset(email)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  async updateProfile(data: Partial<Pick<User, 'name' | 'username'>>): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      if (!pb.authStore.model?.id) {
        throw new Error('No authenticated user')
      }
      
      const user = await pb.collection('users').update<User>(pb.authStore.model.id, data)
      return { success: true, user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  isAuthenticated(): boolean {
    return pb.authStore.isValid
  }

  getUserId(): string | null {
    return pb.authStore.model?.id || null
  }
}

export const authService = new AuthService()