<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-foreground">{{ t('pages.tasks.title') }}</h1>
        <UiButton>
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {{ t('pages.tasks.addTask') }}
        </UiButton>
      </div>

      <UiCard>
        <UiCardContent class="p-6">
          <div class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <h3 class="mt-4 text-lg font-medium text-foreground">{{ t('pages.tasks.noTasks') }}</h3>
            <p class="mt-2 text-sm text-muted-foreground">
              {{ t('pages.tasks.getStarted') }}
            </p>
            <div class="mt-6">
              <UiButton>{{ t('pages.tasks.createTask') }}</UiButton>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
})
</script>