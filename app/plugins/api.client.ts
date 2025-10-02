import type {CookieRef} from "#app";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = async (endpoint: string, options: any = {}) => {
    const { showError } = useNotifications()

    // Use shared auth token cookie
    const tokenCookie: CookieRef<any> = useAuthToken()
    const token = tokenCookie.value

    const defaultOptions = {
      baseURL: config.public.apiUrl,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      ...options
    }

    try {
      return await $fetch(endpoint, defaultOptions)
    } catch (error: any) {
      if (error.status === 401) {
        // Clear token and redirect to login for 401 errors
        tokenCookie.value = null
        await navigateTo('/login')
      } else {
        // Show notification for other errors
        const message = error.data?.message || error.message || 'An unexpected error occurred'
        showError(message)
      }
      throw error
    }
  }

  return {
    provide: {
      api
    }
  }
})