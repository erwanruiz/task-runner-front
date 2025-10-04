<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8 text-center">
      <div v-if="loading">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <h2 class="mt-4 text-xl font-semibold text-gray-900">
          Completing sign in...
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Please wait while we complete your authentication.
        </p>
      </div>

      <div v-else-if="error" class="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h2 class="text-xl font-semibold text-red-900 mb-2">
          Authentication Failed
        </h2>
        <p class="text-sm text-red-600 mb-4">{{ error }}</p>
        <button
          @click="navigateTo('/login')"
          class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type {LaravelResponse} from "~/types";

const route = useRoute()
const { $api } = useNuxtApp()
const { login } = useAuth()
const { showError } = useNotifications()

const loading = ref(true)
const error = ref<string | null>(null)

const handleCallback = async () => {
  try {
    const provider = route.params.provider as string
    const code = route.query.code as string
    const state = route.query.state as string
    const errorParam = route.query.error as string

    if (errorParam) {
      throw new Error(`OAuth error: ${errorParam}`)
    }

    if (!code) {
      throw new Error('Authorization code not found')
    }

    const response = await $api(`auth/callback/${provider}`, {
      method: 'POST',
      body: { code, state }
    }) as LaravelResponse;

    await login(response.data.token)
    await navigateTo('/')
  } catch (err: any) {
    // Show error notification and redirect to login
    const message = err.message || 'An error occurred during authentication'
    showError(message, 0) // 0 timeout means it won't auto-dismiss
    error.value = message
    loading.value = false

    // Redirect to login after a short delay
    setTimeout(() => {
      navigateTo('/login')
    }, 3000)
  }
}

onMounted(() => {
  handleCallback()
})

definePageMeta({
  layout: false
})
</script>