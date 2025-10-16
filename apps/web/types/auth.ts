export interface User {
  id: number
  name: string
  first_name?: string
  last_name?: string
  email: string
  avatar?: string
  preferred_language: string
  timezone: string
  writing_goal_daily: number
  email_verified_at?: string
  created_at: string
  updated_at: string
}

export interface LoginCredentials {
  email: string
  password: string
  remember?: boolean
}

export interface RegisterData {
  name: string
  first_name?: string
  last_name?: string
  email: string
  password: string
  password_confirmation: string
  writing_goal_daily?: number
  preferred_language?: string
}

export interface AuthResponse {
  message: string
  user: User
  token: string
}

export interface ProfileUpdateData {
  first_name?: string
  last_name?: string
  preferred_language?: string
  timezone?: string
  writing_goal_daily?: number
}

export interface AuthError {
  message: string
  errors?: Record<string, string[]>
}
