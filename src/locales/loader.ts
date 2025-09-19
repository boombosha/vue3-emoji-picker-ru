import { Locale, LocaleConfig } from '../types'
import { enLocale } from './en'
import { ruLocale } from './ru'

/**
 * Интерфейс для локализованных данных смайлов
 */
export interface LocalizedEmojiData {
  [groupKey: string]: Array<{
    n: string[]
    u: string
  }>
}

/**
 * Загружает локализованные данные смайлов из внешнего файла
 */
export async function loadLocalizedEmojis(locale: Locale): Promise<LocalizedEmojiData | null> {
  try {
    // Пытаемся загрузить файл локализации из папки public
    const response = await fetch(`/emojis-${locale}.json`)
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    // Тихо игнорируем ошибки для несуществующих файлов
  }

  try {
    // Альтернативный путь - из подпапки locales
    const response = await fetch(`/locales/emojis-${locale}.json`)
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    // Тихо игнорируем ошибки для несуществующих файлов
  }

  return null
}

/**
 * Загружает конфигурацию локализации из внешнего файла
 */
export async function loadLocaleConfig(locale: Locale): Promise<LocaleConfig | null> {
  try {
    // Пытаемся загрузить конфигурацию локализации из папки public
    const response = await fetch(`/config-${locale}.json`)
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    // Тихо игнорируем ошибки для несуществующих файлов
  }

  try {
    // Альтернативный путь - из подпапки locales
    const response = await fetch(`/locales/config-${locale}.json`)
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    // Тихо игнорируем ошибки для несуществующих файлов
  }

  return null
}

/**
 * Получает полную конфигурацию локализации (встроенную + внешнюю)
 */
export async function getFullLocaleConfig(locale: Locale): Promise<LocaleConfig> {
  // Сначала получаем встроенную конфигурацию
  const builtInConfig = locale === 'ru' ? ruLocale : enLocale
  
  // Для встроенных локалей (en, ru) не пытаемся загружать внешние файлы
  if (locale === 'en' || locale === 'ru') {
    return builtInConfig
  }
  
  // Пытаемся загрузить внешнюю конфигурацию только для внешних локалей
  const externalConfig = await loadLocaleConfig(locale)
  
  if (externalConfig) {
    // Объединяем конфигурации (внешняя имеет приоритет)
    return {
      ...builtInConfig,
      ...externalConfig,
      groupNames: { ...builtInConfig.groupNames, ...externalConfig.groupNames },
      staticTexts: { ...builtInConfig.staticTexts, ...externalConfig.staticTexts }
    }
  }
  
  return builtInConfig
}

/**
 * Получает локализованные данные смайлов (встроенные + внешние)
 */
export async function getLocalizedEmojis(locale: Locale, fallbackEmojis: any): Promise<any> {
  // Пытаемся загрузить внешние данные
  const externalEmojis = await loadLocalizedEmojis(locale)
  
  if (externalEmojis) {
    // Объединяем данные (внешние имеют приоритет)
    return {
      ...fallbackEmojis,
      ...externalEmojis
    }
  }
  
  return fallbackEmojis
}
