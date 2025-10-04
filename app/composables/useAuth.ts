import type {LaravelResponse} from "~/types";
import type {CookieRef} from "#app";

interface User {
  id: number
  name: string
  email: string
  avatar_url?: string
  provider?: string
  email_verified_at?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export const useAuth = () => {
  const { $api } = useNuxtApp()

  const user = useState<User | null>('auth.user', () => null)
  const token: CookieRef<any> = useAuthToken()

  const isAuthenticated = computed(() => !!user.value && !!token.value)

  const login = async (authToken: string) => {
    token.value = authToken
    // Wait for cookie to sync, then use regular fetchUser
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 50))
    await fetchUser()
  }

  const logout = async () => {
    try {
      if (token.value) {
        await $api('/auth/logout', { method: 'POST' })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      token.value = null
      user.value = null
      await navigateTo('/login')
    }
  }

  const fetchUser = async () => {
    try {
      if (!token.value) {
        user.value = null
        return
      }

      const userData = await $api('/auth/user') as LaravelResponse
      user.value = userData.data
    } catch (error: any) {
      if (error.status === 401) {
        token.value = null
        user.value = null
      }
      throw error
    }
  }


  const initAuth = async () => {
    if (token.value && !user.value) {
      try {
        await fetchUser()
      } catch (error) {
        console.error('Auth initialization error:', error)
      }
    }
  }

  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    login,
    logout,
    fetchUser,
    initAuth
  }
}