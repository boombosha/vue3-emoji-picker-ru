import { Locale, LocaleConfig, CustomLocaleOptions } from '../types'
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
export async function loadLocalizedEmojis(
  locale: Locale
): Promise<LocalizedEmojiData | null> {
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
export async function loadLocaleConfig(
  locale: Locale
): Promise<LocaleConfig | null> {
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
export async function getFullLocaleConfig(
  locale: Locale
): Promise<LocaleConfig> {
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
      staticTexts: {
        ...builtInConfig.staticTexts,
        ...externalConfig.staticTexts,
      },
    }
  }

  return builtInConfig
}

/**
 * Получает локализованные данные смайлов (встроенные + внешние)
 */
export async function getLocalizedEmojis(
  locale: Locale,
  fallbackEmojis: any
): Promise<any> {
  // Пытаемся загрузить внешние данные
  const externalEmojis = await loadLocalizedEmojis(locale)

  if (externalEmojis) {
    // Объединяем данные (внешние имеют приоритет)
    return {
      ...fallbackEmojis,
      ...externalEmojis,
    }
  }

  return fallbackEmojis
}

/**
 * Загружает конфигурацию локализации по кастомному пути
 */
export async function loadCustomLocaleConfig(
  customOptions: CustomLocaleOptions
): Promise<LocaleConfig | null> {
  if (!customOptions.configPath) {
    return null
  }

  try {
    const response = await fetch(customOptions.configPath)
    if (response.ok) {
      const config = await response.json()
      return {
        ...config,
        locale: customOptions.locale,
      }
    }
  } catch (error) {
    console.warn(
      `Ошибка загрузки кастомной конфигурации локали из ${customOptions.configPath}:`,
      error
    )
  }

  return null
}

/**
 * Загружает локализованные данные смайлов по кастомному пути
 */
export async function loadCustomLocalizedEmojis(
  customOptions: CustomLocaleOptions
): Promise<LocalizedEmojiData | null> {
  if (!customOptions.emojisPath) {
    return null
  }

  try {
    const response = await fetch(customOptions.emojisPath)
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.warn(
      `Ошибка загрузки кастомных данных смайлов из ${customOptions.emojisPath}:`,
      error
    )
  }

  return null
}

/**
 * Получает полную конфигурацию локализации с поддержкой кастомных путей
 */
export async function getFullLocaleConfigWithCustom(
  locale: Locale,
  customOptions?: CustomLocaleOptions
): Promise<LocaleConfig> {
  // Если переданы кастомные опции, используем их
  if (customOptions) {
    const customConfig = await loadCustomLocaleConfig(customOptions)
    if (customConfig) {
      return customConfig
    }
  }

  // Иначе используем стандартную логику
  return getFullLocaleConfig(locale)
}

/**
 * Получает локализованные данные смайлов с поддержкой кастомных путей
 */
export async function getLocalizedEmojisWithCustom(
  locale: Locale,
  fallbackEmojis: any,
  customOptions?: CustomLocaleOptions
): Promise<any> {
  // Если переданы кастомные опции, используем их
  if (customOptions) {
    const customEmojis = await loadCustomLocalizedEmojis(customOptions)
    if (customEmojis) {
      return {
        ...fallbackEmojis,
        ...customEmojis,
      }
    }
  }

  // Иначе используем стандартную логику
  return getLocalizedEmojis(locale, fallbackEmojis)
}
