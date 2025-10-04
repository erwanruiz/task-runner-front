<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-foreground">{{ t('profile.manageProfile') }}</h1>
      </div>

      <div class="grid grid-cols-1 gap-8">
        <!-- Personal Information -->
        <div class="">
          <UiCard>
            <UiCardHeader>
              <UiCardTitle>{{ t('profile.personalInfo') }}</UiCardTitle>
            </UiCardHeader>
            <UiCardContent class="space-y-6">
              <!-- Profile Info Display -->
              <div class="flex items-center space-x-4">
                <div class="relative">
                  <img
                    v-if="user?.avatar_url"
                    :src="user.avatar_url"
                    :alt="user.name"
                    class="h-20 w-20 rounded-full border-2 border-border"
                  >
                  <div v-else class="h-20 w-20 rounded-full bg-muted flex items-center justify-center border-2 border-border">
                    <span class="text-2xl font-bold text-muted-foreground">
                      {{ user?.name?.charAt(0).toUpperCase() }}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-foreground">{{ user?.name }}</h3>
                  <p class="text-muted-foreground">{{ user?.email }}</p>
                  <p v-if="user?.provider" class="text-sm text-muted-foreground capitalize">
                    {{ t('profile.provider') }} {{ user.provider }}
                  </p>
                </div>
              </div>

              <!-- Profile Details -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="text-sm font-medium text-muted-foreground">{{ t('profile.name') }}</label>
                  <div class="text-foreground">{{ user?.name }}</div>
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium text-muted-foreground">{{ t('profile.email') }}</label>
                  <div class="text-foreground">{{ user?.email }}</div>
                </div>
                <div v-if="user?.provider" class="space-y-2">
                  <label class="text-sm font-medium text-muted-foreground">{{ t('profile.provider') }}</label>
                  <div class="text-foreground capitalize">{{ user.provider }}</div>
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium text-muted-foreground">{{ t('auth.email') }} Status</label>
                  <div class="flex items-center space-x-2">
                    <svg
                      :class="user?.email_verified_at ? 'text-green-500' : 'text-red-500'"
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path v-if="user?.email_verified_at" fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      <path v-else fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                    <span :class="user?.email_verified_at ? 'text-green-600' : 'text-red-600'" class="text-sm">
                      {{ user?.email_verified_at ? t('common.verified') : t('common.notVerified') }}
                    </span>
                  </div>
                </div>
              </div>
            </UiCardContent>
          </UiCard>
        </div>

        <div>
          <UiCard>
            <UiCardHeader>
              <UiCardTitle>{{ t('profile.accountSettings') }}</UiCardTitle>
            </UiCardHeader>
            <UiCardContent class="space-y-4">
              <div>
                <h4 class="font-medium text-foreground mb-3">{{ t('profile.changePassword') }}</h4>
                <div v-if="isSocialUser" class="p-4 bg-muted rounded-lg border border-border">
                  <div class="flex items-start space-x-3">
                    <svg class="w-5 h-5 text-muted-foreground mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                    <p class="text-sm text-muted-foreground">
                      {{ t('profile.socialAccountNote') }}
                    </p>
                  </div>
                </div>

                <!-- Password Change Form -->
                <form v-else @submit.prevent="changePassword" class="space-y-4">
                  <div class="space-y-2">
                    <UiLabel for="current_password">{{ t('profile.currentPassword') }}</UiLabel>
                    <UiInput
                      id="current_password"
                      v-model="passwordForm.current_password"
                      type="password"
                      :placeholder="t('profile.enterCurrentPassword')"
                      :error="!!passwordErrors.current_password"
                      required
                    />
                    <span v-if="passwordErrors.current_password" class="text-sm text-destructive">
                      {{ passwordErrors.current_password[0] }}
                    </span>
                  </div>

                  <div class="space-y-2">
                    <UiLabel for="new_password">{{ t('profile.newPassword') }}</UiLabel>
                    <UiInput
                      id="new_password"
                      v-model="passwordForm.new_password"
                      type="password"
                      :placeholder="t('profile.enterNewPassword')"
                      :error="!!passwordErrors.new_password"
                      required
                    />
                    <span v-if="passwordErrors.new_password" class="text-sm text-destructive">
                      {{ passwordErrors.new_password[0] }}
                    </span>
                    <p class="text-xs text-muted-foreground">{{ t('profile.passwordRequirements') }}</p>
                  </div>

                  <div class="space-y-2">
                    <UiLabel for="new_password_confirmation">{{ t('profile.confirmPassword') }}</UiLabel>
                    <UiInput
                      id="new_password_confirmation"
                      v-model="passwordForm.new_password_confirmation"
                      type="password"
                      :placeholder="t('profile.confirmNewPassword')"
                      :error="!!passwordErrors.new_password_confirmation"
                      required
                    />
                    <span v-if="passwordErrors.new_password_confirmation" class="text-sm text-destructive">
                      {{ passwordErrors.new_password_confirmation[0] }}
                    </span>
                  </div>

                  <UiButton
                    type="submit"
                    :disabled="passwordLoading"
                    class="w-full"
                  >
                    {{ passwordLoading ? t('common.loading') : t('profile.updatePassword') }}
                  </UiButton>
                </form>
              </div>
            </UiCardContent>
          </UiCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type {ApiResponse} from "~/types";

const { $api } = useNuxtApp()
const { user } = useAuth()
const { t } = useI18n()
const { addNotification } = useNotifications()

// Password change form
const passwordForm = ref({
  current_password: '',
  new_password: '',
  new_password_confirmation: ''
})

const passwordErrors = ref<Record<string, string[]>>({})
const passwordLoading = ref(false)

// Check if user is social user (can't change password)
const isSocialUser = computed(() => {
  return !!user.value?.provider
})

// Password change function
const changePassword = async () => {
  try {
    passwordLoading.value = true
    passwordErrors.value = {}

    const response = await $api('/auth/change-password', {
      method: 'PUT',
      body: {
        current_password: passwordForm.value.current_password,
        new_password: passwordForm.value.new_password,
        new_password_confirmation: passwordForm.value.new_password_confirmation
      }
    }) as ApiResponse

    // Reset form
    passwordForm.value = {
      current_password: '',
      new_password: '',
      new_password_confirmation: ''
    }

    // Show success notification
    addNotification({
      title: t('common.success'),
      message: t('profile.passwordUpdated'),
      type: 'success'
    })

  } catch (error: any) {
    if (error.status === 422 && error.data?.errors) {
      passwordErrors.value = error.data.errors
    } else if (error.status === 403) {
      passwordErrors.value = {
        current_password: ['Current password is incorrect.']
      }
    }
    // API plugin handles error notifications
  } finally {
    passwordLoading.value = false
  }
}

definePageMeta({
  middleware: 'auth'
})
</script>