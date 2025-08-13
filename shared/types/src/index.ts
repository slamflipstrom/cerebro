// Shared types for spaced repetition trainer
// Used by both frontend (UI) and backend (PocketBase)

export interface User {
  id: string
  email: string
  username: string
  name?: string
  avatar?: string
  created: string
  updated: string
}

export interface Deck {
  id: string
  name: string
  description?: string
  user: string
  created: string
  updated: string
}

export interface Card {
  id: string
  deck: string
  front: string
  back: string
  tags?: string[]
  created: string
  updated: string
}

export interface Review {
  id: string
  card: string
  user: string
  rating: number // 1-4 (Again, Hard, Good, Easy)
  duration: number // milliseconds spent reviewing
  created: string
}

// FSRS scheduling data
export interface CardSchedule {
  id: string
  card: string
  due: string
  stability: number
  difficulty: number
  elapsed_days: number
  scheduled_days: number
  reps: number
  lapses: number
  state: 'new' | 'learning' | 'review' | 'relearning'
  last_review?: string
  created: string
  updated: string
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Authentication types
export interface AuthData {
  token: string
  user: User
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  passwordConfirm: string
  username: string
  name?: string
}