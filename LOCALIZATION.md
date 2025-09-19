# Локализация Vue3 Emoji Picker

## Обзор

Проект теперь поддерживает полную локализацию интерфейса и поиска смайлов на разных языках.

## Поддерживаемые языки

- **Английский (en)** - по умолчанию
- **Русский (ru)** - полная поддержка

## Использование

### Базовое использование

```vue
<template>
  <!-- Английский интерфейс (по умолчанию) -->
  <picker @select="onSelect" />
  
  <!-- Русский интерфейс -->
  <picker locale="ru" @select="onSelect" />
  
  <!-- Автоопределение языка браузера -->
  <picker :locale="detectedLocale" @select="onSelect" />
</template>

<script>
import { detectUserLocale } from './locales'

export default {
  setup() {
    const detectedLocale = detectUserLocale() // 'ru' или 'en'
    
    return {
      detectedLocale
    }
  }
}
</script>
```

### Программное переключение языка

```vue
<template>
  <div>
    <button @click="switchLocale('en')">English</button>
    <button @click="switchLocale('ru')">Русский</button>
    
    <picker :locale="currentLocale" @select="onSelect" />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const currentLocale = ref('en')
    
    const switchLocale = (locale) => {
      currentLocale.value = locale
    }
    
    return {
      currentLocale,
      switchLocale
    }
  }
}
</script>
```

## Поиск смайлов

Теперь поиск работает на всех поддерживаемых языках:

```javascript
// Поиск на английском
"smile" // найдет 😊

// Поиск на русском  
"улыбка" // найдет 😊

// Поиск на любом языке
"смайл" // найдет 😊
```

## Структура локализации

### Файлы локализации

```
src/locales/
├── index.ts      # Основная система локализации
├── en.ts         # Английские переводы
└── ru.ts         # Русские переводы
```

### Добавление нового языка

1. Создайте новый файл локализации:

```typescript
// src/locales/de.ts
import { LocaleConfig } from '../types'

export const deLocale: LocaleConfig = {
  locale: 'de',
  groupNames: {
    recent: 'Kürzlich verwendet',
    smileys_people: 'Smileys & Personen',
    // ...
  },
  staticTexts: {
    placeholder: 'Emoji suchen',
    skinTone: 'Hautton',
    noResults: 'Kein Emoji gefunden!',
  },
}
```

2. Добавьте в основной файл локализации:

```typescript
// src/locales/index.ts
import { deLocale } from './de'

export const locales: Record<Locale, LocaleConfig> = {
  en: enLocale,
  ru: ruLocale,
  de: deLocale, // новый язык
}
```

3. Обновите типы:

```typescript
// src/types.ts
export type Locale = 'en' | 'ru' | 'de' // добавить новый язык
```

## API

### Компонент Picker

#### Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `locale` | `Locale` | `detectUserLocale()` | Язык интерфейса |

#### События

Все существующие события работают без изменений.

### Функции локализации

```typescript
import { 
  getLocaleConfig, 
  getAvailableLocales, 
  detectUserLocale 
} from './locales'

// Получить конфигурацию языка
const config = getLocaleConfig('ru')

// Получить список доступных языков
const languages = getAvailableLocales() // ['en', 'ru']

// Автоопределение языка браузера
const userLocale = detectUserLocale() // 'ru' или 'en'
```

## Расширение данных смайлов

Для добавления переводов к смайлам, обновите файл `src/data/emojis-localized.json`:

```json
{
  "smileys_people": [
    {
      "n": ["grinning face", "grinning", "улыбающееся лицо", "улыбка"],
      "u": "1f600"
    }
  ]
}
```

Массив `n` содержит все названия смайла на разных языках. Функция поиска будет искать по всем названиям.

## Обратная совместимость

Все существующие API остаются без изменений. Локализация добавляется как дополнительная функциональность.

## Примеры

Смотрите `src/App.vue` для примеров использования различных конфигураций локализации.
