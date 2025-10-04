<template>
    <!-- Theme toggle -->
    <div class="absolute top-4 right-4">
      <ThemeToggle />
    </div>

  <div class="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight">
          {{ t('auth.signInTitle') }}
        </h2>
        <p class="mt-2 text-sm text-muted-foreground">
          {{ t('auth.signInSubtitle') }}
        </p>
      </div>

      <UiCard>
        <UiCardContent class="p-6">
          <!-- Email/Password Form -->
          <form @submit.prevent="signInWithCredentials" class="space-y-4">
          <div class="space-y-2">
            <UiLabel for="email" :error="!!errors.email">{{ t('auth.email') }}</UiLabel>
            <UiInput
              id="email"
              v-model="form.email"
              type="email"
              required
              :placeholder="t('auth.enterEmail')"
              :error="!!errors.email"
            />
            <span v-if="errors.email" class="text-sm text-destructive">{{ errors.email[0] }}</span>
          </div>

          <div class="space-y-2">
            <UiLabel for="password" :error="!!errors.password">{{ t('auth.password') }}</UiLabel>
            <UiInput
              id="password"
              v-model="form.password"
              type="password"
              required
              :placeholder="t('auth.enterPassword')"
              :error="!!errors.password"
            />
            <span v-if="errors.password" class="text-sm text-destructive">{{ errors.password[0] }}</span>
          </div>

          <UiButton
            type="submit"
            :disabled="loading === 'credentials'"
            class="w-full"
          >
            {{ loading === "credentials" ? t('auth.signingIn') : t('auth.signInWithEmail') }}
          </UiButton>
        </form>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t" />
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-card px-2 text-muted-foreground">{{ t('auth.orContinueWith') }}</span>
          </div>
        </div>

        <!-- Social Auth Buttons -->
        <div class="space-y-3">
          <UiButton
            @click="signInWithProvider('google')"
            :disabled="!!loading"
            variant="outline"
            class="w-full"
          >
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {{ loading === "google" ? t('auth.signingIn') : t('auth.continueWithGoogle') }}
          </UiButton>

          <UiButton
            @click="signInWithProvider('github')"
            :disabled="!!loading"
            variant="outline"
            class="w-full"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            {{ loading === "github" ? t('auth.signingIn') : t('auth.continueWithGithub') }}
          </UiButton>
        </div>
        </UiCardContent>
      </UiCard>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type {ApiResponse} from "~/types";

const { $api } = useNuxtApp()
const router = useRouter()
const { isAuthenticated, initAuth, login } = useAuth()
const { t } = useI18n()

const loading = ref<string | null>(null)
const currentProvider = ref<string | null>(null)

// Form data
const form = ref({
  email: "",
  password: ""
})

const errors = ref<Record<string, string[]>>({})

// Check if user is already authenticated and redirect to home
onMounted(async () => {
  await initAuth()
  if (isAuthenticated.value) {
    await navigateTo("/")
  }
})

// Classic email/password sign in
const signInWithCredentials = async () => {
  try {
    loading.value = "credentials"
    errors.value = {}

    const response = await $api("/auth/login", {
      method: "POST",
      body: {
        email: form.value.email,
        password: form.value.password
      }
    }) as ApiResponse

    // Login with the received token
    await login(response.data.token)

    // Redirect to home
    await navigateTo("/")
  } catch (error: any) {
    if (error.status === 422 && error.data?.errors) {
      errors.value = error.data.errors
    }
    // API plugin will handle showing error notifications
  } finally {
    loading.value = null
  }
}

const signInWithProvider = async (provider: "google" | "github") => {
  try {
    loading.value = provider
    currentProvider.value = provider

    const response: ApiResponse = await $api(`/auth/redirect/${provider}`) as ApiResponse;

    if (response.data.url) {
      window.location.href = response.data.url;
    }
  } catch (err: any) {
    // API plugin will handle showing notifications for errors
    // Just reset loading state here
    loading.value = null
    currentProvider.value = null
  }
}
</script>
