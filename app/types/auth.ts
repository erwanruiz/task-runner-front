import type { ApiResponse } from './api'

// User model
export interface User {
  id: number
  name: string
  email: string
  avatar_url?: string
  provider?: string
  provider_id?: string
  is_social_user?: boolean
  email_verified_at?: string
  created_at: string
  updated_at: string
}

// SSO provider types
export type SocialProvider = 'google' | 'github'

// SSO redirect response
export interface SsoRedirectResponse {
  url: string
  provider: SocialProvider
}

// SSO callback response
export interface SsoCallbackResponse {
  user: User
  token: string
  token_type: string
  expires_in: number
}

// Login request
export interface LoginRequest {
  email: string
  password: string
  remember?: boolean
}

// Register request
export interface RegisterRequest {
  name: string
  email: string
  password: string
  password_confirmation: string
}

// Password reset request
export interface PasswordResetRequest {
  email: string
}

// Password reset confirm request
export interface PasswordResetConfirmRequest {
  token: string
  email: string
  password: string
  password_confirmation: string
}

// SSO callback request
export interface SsoCallbackRequest {
  code: string
  state?: string
}

// Auth response types
export type AuthResponse = ApiResponse<{
  user: User
  token: string
  token_type: string
  expires_in: number
}>

export type UserResponse = ApiResponse<User>
export type SsoRedirectApiResponse = ApiResponse<SsoRedirectResponse>
export type SsoCallbackApiResponse = ApiResponse<SsoCallbackResponse>

// Auth state interface for composables
export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}