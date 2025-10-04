export default defineNuxtRouteMiddleware(async (to, from) => {
  // Skip auth check for public routes
  const publicRoutes = ['/login', '/auth/callback/google', '/auth/callback/github']

  if (publicRoutes.includes(to.path)) {
    return
  }

  // Only run on client side to avoid SSR issues
  if (process.server) {
    return
  }

  const { user, token, isAuthenticated, fetchUser } = useAuth()

  // Wait for Vue reactivity to settle
  await nextTick()

  // Case 1: User is already authenticated
  if (isAuthenticated.value) {
    return
  }

  // Case 2: Token exists but no user - try to fetch user
  if (token.value && !user.value) {
    try {
      await fetchUser()

      // If fetchUser succeeded and user is now set
      if (user.value) {
        return
      }
    } catch (error: any) {
      // If fetch fails (401, network error, etc.)
      console.error('Failed to fetch user:', error)
    }
  }

  // Case 3: No token or token invalid - redirect to login
  return navigateTo('/login')
})