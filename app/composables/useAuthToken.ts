// Shared auth token cookie
export const useAuthToken = () => {
    return useCookie('auth-token', {
        secure: false, // Set to false for development (HTTP)
        sameSite: 'lax', // More permissive for development
        maxAge: 60 * 60 * 24 * 7, // 7 days
        default: () => null,
        httpOnly: false // Ensure JavaScript can access it
    })
}