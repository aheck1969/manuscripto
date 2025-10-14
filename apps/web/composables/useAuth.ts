import type { User } from '~/types/auth'

export const useAuth = () => {
  const { get, post, put } = useApi()
  
  // Reactive state
  const user = useState<User | null>('auth.user', () => null)
  const token = useCookie<string | null>('auth-token', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: true,
    sameSite: 'strict'
  })
  
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isLoading = ref(false)

  /**
   * Initialize authentication state
   */
  const initAuth = async () => {
    if (token.value && !user.value) {
      try {
        isLoading.value = true
        const response = await get('/auth/me')
        user.value = response.user
      } catch (error) {
        // Token is invalid, clear it
        token.value = null
        user.value = null
      } finally {
        isLoading.value = false
      }
    }
  }

  /**
   * Login user
   */
  const login = async (credentials: { email: string; password: string; remember?: boolean }) => {
    try {
      isLoading.value = true
      const response = await post('/auth/login', credentials)
      
      token.value = response.token
      user.value = response.user
      
      return { success: true, user: response.user }
    } catch (error: any) {
      return { 
        success: false, 
        error: error.data?.message || 'Login failed' 
      }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Register user
   */
  const register = async (userData: {
    name: string
    first_name?: string
    last_name?: string
    email: string
    password: string
    password_confirmation: string
    writing_goal_daily?: number
    preferred_language?: string
  }) => {
    try {
      isLoading.value = true
      const response = await post('/auth/register', userData)
      
      token.value = response.token
      user.value = response.user
      
      return { success: true, user: response.user }
    } catch (error: any) {
      return { 
        success: false, 
        error: error.data?.message || 'Registration failed',
        errors: error.data?.errors || {}
      }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Logout user
   */
  const logout = async (logoutAll = false) => {
    try {
      if (token.value) {
        const endpoint = logoutAll ? '/auth/logout-all' : '/auth/logout'
        await post(endpoint)
      }
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API error:', error)
    } finally {
      token.value = null
      user.value = null
      
      // Redirect to login page
      await navigateTo('/auth/login')
    }
  }

  /**
   * Update user profile
   */
  const updateProfile = async (profileData: {
    first_name?: string
    last_name?: string
    preferred_language?: string
    timezone?: string
    writing_goal_daily?: number
  }) => {
    try {
      isLoading.value = true
      const response = await put('/auth/profile', profileData)
      
      user.value = response.user
      
      return { success: true, user: response.user }
    } catch (error: any) {
      return { 
        success: false, 
        error: error.data?.message || 'Profile update failed' 
      }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Refresh user data
   */
  const refreshUser = async () => {
    try {
      const response = await get('/auth/me')
      user.value = response.user
      return response.user
    } catch (error) {
      // If refresh fails, user might be logged out
      token.value = null
      user.value = null
      throw error
    }
  }

  /**
   * Check if user has specific permission
   */
  const hasPermission = (permission: string): boolean => {
    if (!user.value) return false
    // TODO: Implement permission checking when we add roles
    return true
  }

  /**
   * Get user's display name
   */
  const getDisplayName = (): string => {
    if (!user.value) return ''
    return user.value.first_name || user.value.name || user.value.email
  }

  /**
   * Get user's full name
   */
  const getFullName = (): string => {
    if (!user.value) return ''
    return user.value.first_name && user.value.last_name 
      ? `${user.value.first_name} ${user.value.last_name}`
      : user.value.name || user.value.email
  }

  return {
    // State
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    isLoading: readonly(isLoading),
    
    // Actions
    initAuth,
    login,
    register,
    logout,
    updateProfile,
    refreshUser,
    hasPermission,
    getDisplayName,
    getFullName,
  }
}

// Auto-initialize auth state on app start
if (process.client) {
  const { initAuth } = useAuth()
  initAuth()
}
