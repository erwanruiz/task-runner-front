import en from './en'
import fr from './fr'

export const locales = {
  en,
  fr
}

export type Locale = keyof typeof locales
export type LocaleMessages = typeof en

export const defaultLocale: Locale = 'en'

export const availableLocales: { code: Locale; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
]