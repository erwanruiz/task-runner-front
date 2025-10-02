import { ref, computed, readonly } from 'vue'
import { locales, type Locale, type LocaleMessages, defaultLocale } from '~/locales'

const currentLocale = ref<Locale>(defaultLocale)

export const useI18n = () => {
  // Get current translations
  const messages = computed<LocaleMessages>(() => locales[currentLocale.value])

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = messages.value

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        console.warn(`Translation key "${key}" not found for locale "${currentLocale.value}"`)
        return key
      }
    }

    return typeof value === 'string' ? value : key
  }

  // Set locale
  const setLocale = (locale: Locale) => {
    if (locale in locales) {
      currentLocale.value = locale
      // Save to localStorage if available
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferred-locale', locale)
      }
    }
  }

  // Get locale from localStorage on client side
  const initLocale = () => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('preferred-locale') as Locale
      if (savedLocale && savedLocale in locales) {
        currentLocale.value = savedLocale
      } else {
        // Try to detect browser language
        const browserLang = navigator.language.split('-')[0] as Locale
        if (browserLang in locales) {
          currentLocale.value = browserLang
        }
      }
    }
  }

  return {
    currentLocale: readonly(currentLocale),
    messages,
    t,
    setLocale,
    initLocale
  }
}