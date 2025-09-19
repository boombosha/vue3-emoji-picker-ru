import { Locale, LocaleConfig } from '../types'
import { enLocale } from './en'
import { ruLocale } from './ru'

export const locales: Partial<Record<Locale, LocaleConfig>> = {
  en: enLocale,
  ru: ruLocale,
}

export function getLocaleConfig(locale: Locale): LocaleConfig {
  return locales[locale] || locales.en
}

export function getAvailableLocales(): Locale[] {
  return Object.keys(locales) as Locale[]
}

export function detectUserLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en'
  
  const browserLocale = navigator.language.toLowerCase()
  
  if (browserLocale.startsWith('ru')) return 'ru'
  if (browserLocale.startsWith('en')) return 'en'
  
  return 'en' // fallback to English
}

// Re-export loader functions
export { 
  getFullLocaleConfig, 
  getLocalizedEmojis, 
  loadLocalizedEmojis, 
  loadLocaleConfig 
} from './loader'

export { enLocale, ruLocale }
