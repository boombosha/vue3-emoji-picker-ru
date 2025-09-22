# Кастомная локализация Vue3 Emoji Picker RU / Custom Localization Vue3 Emoji Picker RU

> **Пакет:** `vue3-emoji-picker-ru`  
> **Package:** `vue3-emoji-picker-ru`

## Обзор / Overview

Система локализации поддерживает **кастомные пути** для файлов локализации. Вы можете указать точные пути к файлам конфигурации и данных смайлов, вместо автоматического поиска. / The localization system supports **custom paths** for localization files. You can specify exact paths to configuration and emoji data files instead of automatic search.

### Установка / Installation

```bash
npm install vue3-emoji-picker-ru
# or
yarn add vue3-emoji-picker-ru
```

## Новые возможности / New Features

### 1. Кастомные пути к файлам локализации / Custom paths to localization files

- Укажите точный путь к файлу конфигурации (`configPath`) / Specify exact path to configuration file (`configPath`)
- Укажите точный путь к файлу переводов смайлов (`emojisPath`) / Specify exact path to emoji translations file (`emojisPath`)
- Поддержка любых языков через JSON файлы / Support for any languages through JSON files

### 2. Гибкая система локализации / Flexible localization system

- Встроенные локали (`en`, `ru`) работают как раньше / Built-in locales (`en`, `ru`) work as before
- Внешние локали можно загружать с кастомными путями / External locales can be loaded with custom paths
- Fallback на английский при ошибках загрузки / Fallback to English on loading errors

## Использование / Usage

### Базовое использование с кастомными путями / Basic usage with custom paths

```vue
<template>
  <!-- Кастомная локализация / Custom localization -->
  <picker
    locale="my-custom-lang"
    :custom-locale="customLocaleOptions"
    @select="onSelect"
  />
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const customLocaleOptions = {
      locale: 'my-custom-lang',
      configPath: '/my-locales/config-my-lang.json',
      emojisPath: '/my-locales/emojis-my-lang.json',
    }

    return {
      customLocaleOptions,
    }
  },
}
</script>
```

### Полный пример с французской локализацией / Complete example with French localization

```vue
<template>
  <picker locale="fr" :custom-locale="frenchOptions" @select="onSelect" />
</template>

<script>
export default {
  setup() {
    const frenchOptions = {
      locale: 'fr',
      configPath: '/locales/french/config.json',
      emojisPath: '/locales/french/emojis.json',
    }

    return { frenchOptions }
  },
}
</script>
```

## Структура файлов / File Structure

### 1. Файл конфигурации локали / Locale configuration file

Создайте файл по указанному пути (например, `/my-locales/config-my-lang.json`): / Create a file at the specified path (e.g., `/my-locales/config-my-lang.json`):

```json
{
  "locale": "my-lang",
  "groupNames": {
    "recent": "Недавно использованные",
    "smileys_people": "Смайлы и люди",
    "animals_nature": "Животные и природа",
    "food_drink": "Еда и напитки",
    "activities": "Активности",
    "travel_places": "Путешествия и места",
    "objects": "Объекты",
    "symbols": "Символы",
    "flags": "Флаги"
  },
  "staticTexts": {
    "placeholder": "Поиск смайлов",
    "skinTone": "Тон кожи",
    "noResults": "Смайлы не найдены!"
  }
}
```

### 2. Файл переводов смайлов / Emoji translations file

Создайте файл по указанному пути (например, `/my-locales/emojis-my-lang.json`): / Create a file at the specified path (e.g., `/my-locales/emojis-my-lang.json`):

```json
{
  "smileys_people": [
    {
      "n": ["grinning face", "grinning", "улыбающееся лицо", "улыбка"],
      "u": "1f600"
    },
    {
      "n": ["dog face", "dog", "собачья морда", "собака"],
      "u": "1f436"
    }
  ],
  "animals_nature": [
    {
      "n": ["cat face", "cat", "кошачья морда", "кот"],
      "u": "1f431"
    }
  ]
}
```

## API

### Новые пропсы компонента / New component props

| Проп / Prop    | Тип / Type            | Описание / Description                                    |
| -------------- | --------------------- | --------------------------------------------------------- |
| `customLocale` | `CustomLocaleOptions` | Опции кастомной локализации / Custom localization options |

### Интерфейс CustomLocaleOptions / CustomLocaleOptions Interface

```typescript
interface CustomLocaleOptions {
  locale: string // Код языка / Language code
  configPath?: string // Путь к файлу конфигурации / Path to configuration file
  emojisPath?: string // Путь к файлу переводов смайлов / Path to emoji translations file
}
```

### Новые функции / New Functions

```typescript
import {
  loadCustomLocaleConfig,
  loadCustomLocalizedEmojis,
  getFullLocaleConfigWithCustom,
  getLocalizedEmojisWithCustom,
} from 'vue3-emoji-picker-ru'

// Загрузка кастомной конфигурации / Load custom configuration
const config = await loadCustomLocaleConfig({
  locale: 'my-lang',
  configPath: '/my-locales/config.json',
})

// Загрузка кастомных переводов смайлов / Load custom emoji translations
const emojis = await loadCustomLocalizedEmojis({
  locale: 'my-lang',
  emojisPath: '/my-locales/emojis.json',
})
```

## Примеры использования / Usage Examples

### 1. Локализация с CDN / CDN Localization

```vue
<template>
  <picker
    locale="es"
    :custom-locale="{
      locale: 'es',
      configPath: 'https://cdn.example.com/locales/es/config.json',
      emojisPath: 'https://cdn.example.com/locales/es/emojis.json',
    }"
    @select="onSelect"
  />
</template>
```

### 2. Локализация из API / API Localization

```vue
<template>
  <picker
    locale="dynamic"
    :custom-locale="dynamicLocaleOptions"
    @select="onSelect"
  />
</template>

<script>
export default {
  setup() {
    const dynamicLocaleOptions = {
      locale: 'dynamic',
      configPath: '/api/locales/config',
      emojisPath: '/api/locales/emojis',
    }

    return { dynamicLocaleOptions }
  },
}
</script>
```

### 3. Локализация из локальной папки / Local Files Localization

```vue
<template>
  <picker
    locale="custom"
    :custom-locale="{
      locale: 'custom',
      configPath: '/assets/locales/my-lang/config.json',
      emojisPath: '/assets/locales/my-lang/emojis.json',
    }"
    @select="onSelect"
  />
</template>
```

## Обратная совместимость / Backward Compatibility

- Все существующие API работают без изменений / All existing APIs work without changes
- Встроенные локали (`en`, `ru`) работают как раньше / Built-in locales (`en`, `ru`) work as before
- Внешние локали без `customLocale` используют стандартный поиск / External locales without `customLocale` use standard search
- Fallback на английский при ошибках загрузки / Fallback to English on loading errors

## Обработка ошибок / Error Handling

Система автоматически обрабатывает ошибки: / The system automatically handles errors:

1. **Файл не найден** - используется fallback на английский / **File not found** - fallback to English is used
2. **Ошибка парсинга JSON** - выводится предупреждение в консоль / **JSON parsing error** - warning is displayed in console
3. **Ошибка сети** - используется fallback на английский / **Network error** - fallback to English is used

```javascript
// В консоли браузера / In browser console
⚠️ Ошибка загрузки кастомной конфигурации локали из /my-locales/config.json: 404 Not Found
```

## Лучшие практики / Best Practices

1. **Всегда указывайте `locale`** - это код языка для fallback / **Always specify `locale`** - this is the language code for fallback
2. **Используйте относительные пути** - `/locales/` вместо `./locales/` / **Use relative paths** - `/locales/` instead of `./locales/`
3. **Проверяйте доступность файлов** - тестируйте загрузку / **Check file availability** - test loading
4. **Обрабатывайте ошибки** - показывайте пользователю fallback / **Handle errors** - show fallback to user
5. **Кэшируйте файлы** - используйте CDN или Service Worker / **Cache files** - use CDN or Service Worker

## Миграция / Migration

Если у вас уже есть внешние локали, миграция не требуется. Новая функциональность добавляется как дополнительная опция. / If you already have external locales, migration is not required. New functionality is added as an additional option.

**Было / Before:**

```vue
<picker locale="de" />
```

**Стало (опционально) / After (optional):**

```vue
<picker
  locale="de"
  :custom-locale="{ locale: 'de', configPath: '/custom/de.json' }"
/>
```

---

## Дополнительная документация / Additional Documentation

- [README.md](./README.md) - Основная документация / Main documentation
- [vue3-emoji-picker-ru.d.ts](./vue3-emoji-picker-ru.d.ts) - TypeScript декларации / TypeScript declarations
- [types.d.ts.example](./types.d.ts.example) - Пример файла типов / Type definitions example
