<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="border border-dashed border-border rounded-lg p-8">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-foreground mb-4">
            {{ t('pages.home.title') }}
          </h1>
          <p class="text-lg text-muted-foreground mb-8">
            Hello {{ user?.name }}! {{ t('pages.home.subtitle') }}
          </p>

          <UiCard class="max-w-md mx-auto">
            <UiCardContent class="p-6">
              <h3 class="text-lg font-semibold text-foreground mb-4">{{ t('profile.title') }}</h3>
              <div class="space-y-3 text-left">
                <div class="flex items-center justify-between">
                  <span class="font-medium text-muted-foreground">{{ t('profile.name') }}</span>
                  <span class="text-foreground">{{ user?.name }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="font-medium text-muted-foreground">{{ t('profile.email') }}</span>
                  <span class="text-foreground">{{ user?.email }}</span>
                </div>
                <div v-if="user?.provider_name" class="flex items-center justify-between">
                  <span class="font-medium text-muted-foreground">{{ t('profile.provider') }}</span>
                  <span class="text-foreground capitalize">{{ user.provider_name }}</span>
                </div>
              </div>
            </UiCardContent>
          </UiCard>

          <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <UiCard class="cursor-pointer hover:bg-accent transition-colors" @click="$router.push('/tasks')">
              <UiCardContent class="p-6 text-center">
                <svg class="w-8 h-8 mx-auto mb-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <h3 class="font-semibold text-foreground">{{ t('nav.tasks') }}</h3>
                <p class="text-sm text-muted-foreground mt-1">{{ t('pages.home.subtitle') }}</p>
              </UiCardContent>
            </UiCard>

            <UiCard class="cursor-pointer hover:bg-accent transition-colors" @click="$router.push('/calendar')">
              <UiCardContent class="p-6 text-center">
                <svg class="w-8 h-8 mx-auto mb-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 class="font-semibold text-foreground">{{ t('nav.calendar') }}</h3>
                <p class="text-sm text-muted-foreground mt-1">{{ t('pages.calendar.title') }}</p>
              </UiCardContent>
            </UiCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = useAuth()
const { t } = useI18n()

definePageMeta({
  middleware: 'auth'
})
</script>