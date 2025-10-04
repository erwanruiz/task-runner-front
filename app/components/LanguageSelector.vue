<template>
  <div class="relative">
    <UiButton
      @click="isOpen = !isOpen"
      variant="ghost"
      size="sm"
      class="flex items-center gap-2"
    >
      <span class="text-lg">{{ currentLanguage.flag }}</span>
      <span class="hidden sm:inline">{{ currentLanguage.name }}</span>
      <svg
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </UiButton>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50"
    >
      <div class="py-1">
        <button
          v-for="locale in availableLocales"
          :key="locale.code"
          @click="selectLanguage(locale.code)"
          class="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-muted transition-colors"
          :class="{ 'bg-muted': currentLocale === locale.code }"
        >
          <span class="text-lg">{{ locale.flag }}</span>
          <span>{{ locale.name }}</span>
          <svg
            v-if="currentLocale === locale.code"
            class="w-4 h-4 ml-auto text-primary"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { availableLocales, type Locale } from '~/locales'

const { currentLocale, setLocale } = useI18n()
const isOpen = ref(false)

const currentLanguage = computed(() => {
  return availableLocales.find(lang => lang.code === currentLocale.value) || availableLocales[0]
})

const selectLanguage = (locale: Locale) => {
  setLocale(locale)
  isOpen.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (isOpen.value) {
    const target = event.target as HTMLElement
    if (!target.closest('.relative')) {
      isOpen.value = false
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>