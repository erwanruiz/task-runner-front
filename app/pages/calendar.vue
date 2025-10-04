<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-foreground">{{ t('pages.calendar.title') }}</h1>
        <UiButton>
          <svg class="w-4 h-4 mr-2" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {{ t('pages.calendar.addEvent') }}
        </UiButton>
      </div>

      <UiCard>
        <UiCardContent class="p-6">
          <div class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 class="mt-4 text-lg font-medium text-foreground">{{ t('pages.calendar.calendarView') }}</h3>
            <p class="mt-2 text-sm text-muted-foreground">
              {{ t('pages.calendar.calendarDescription') }}
            </p>
            <div class="mt-6">
              <UiButton>{{ t('pages.calendar.scheduleEvent') }}</UiButton>
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