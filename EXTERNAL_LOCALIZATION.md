# Локализация Vue3 Emoji Picker

## Быстрый старт

### Встроенные языки
Библиотека уже поддерживает:
- **Английский** (`en`) - по умолчанию
- **Русский** (`ru`) - встроен

```vue
<template>
  <!-- Английский (по умолчанию) -->
  <picker @select="onSelect" />
  
  <!-- Русский -->
  <picker locale="ru" @select="onSelect" />
</template>
```

### Добавление своего языка
Если нужен другой язык (немецкий, французский и т.д.), создайте JSON файлы:

1. **Создайте файлы локализации** в папке `public/`
2. **Укажите язык** в компоненте: `<picker locale="de" />`

## Как это работает

Библиотека автоматически ищет файлы локализации в следующих местах:

1. **Папка public**: `/emojis-{locale}.json` и `/config-{locale}.json`
2. **Подпапка public**: `/locales/emojis-{locale}.json` и `/locales/config-{locale}.json`

## Структура файлов

### 1. Файл с переводами смайлов

Создайте файл `emojis-{locale}.json` в корне проекта или в папке `public/locales/`:

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

**Где:**
- `n` - массив названий смайла на разных языках
- `u` - Unicode код смайла

### 2. Файл конфигурации локализации

Создайте файл `config-{locale}.json`:

```json
{
  "locale": "ru",
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

## Пошаговые примеры

### Пример 1: Немецкая локализация

**Шаг 1:** Создайте файл `public/config-de.json`:
```json
{
  "locale": "de",
  "groupNames": {
    "recent": "Kürzlich verwendet",
    "smileys_people": "Smileys & Personen",
    "animals_nature": "Tiere & Natur",
    "food_drink": "Essen & Trinken",
    "activities": "Aktivitäten",
    "travel_places": "Reisen & Orte",
    "objects": "Objekte",
    "symbols": "Symbole",
    "flags": "Flaggen"
  },
  "staticTexts": {
    "placeholder": "Emoji suchen",
    "skinTone": "Hautton",
    "noResults": "Kein Emoji gefunden!"
  }
}
```

**Шаг 2:** Создайте файл `public/emojis-de.json` (опционально):
```json
{
  "smileys_people": [
    {
      "n": ["grinning face", "grinning", "grinsendes Gesicht", "grinsen"],
      "u": "1f600"
    }
  ]
}
```

**Шаг 3:** Используйте в компоненте:
```vue
<template>
  <picker locale="de" @select="onSelect" />
</template>
```

### Пример 2: Французская локализация

**Шаг 1:** Создайте файл `public/locales/config-fr.json`:
```json
{
  "locale": "fr",
  "groupNames": {
    "recent": "Récemment utilisés",
    "smileys_people": "Emojis & Personnes",
    "animals_nature": "Animaux & Nature"
  },
  "staticTexts": {
    "placeholder": "Rechercher des emojis",
    "skinTone": "Teinte de peau",
    "noResults": "Aucun emoji trouvé!"
  }
}
```

**Шаг 2:** Используйте в компоненте:
```vue
<template>
  <picker locale="fr" @select="onSelect" />
</template>
```

## Все доступные языки

### Встроенные (готовы к использованию)
- **`en`** - Английский (по умолчанию)
- **`ru`** - Русский

### Внешние (нужно создать файлы)
- **`de`** - Немецкий
- **`fr`** - Французский  
- **`es`** - Испанский
- **`it`** - Итальянский
- **`pt`** - Португальский
- **`ja`** - Японский
- **`ko`** - Корейский
- **`zh`** - Китайский
- И любые другие!

## Важные моменты

### Обязательные файлы
- **`config-{locale}.json`** - обязательно для любого языка
- **`emojis-{locale}.json`** - опционально (только если нужны переводы названий смайлов)

### Fallback
Если внешние файлы не найдены:
- Для `en` и `ru` - используются встроенные переводы
- Для других языков - показывается английский интерфейс

### Отладка
Откройте консоль браузера для проверки загрузки:
```
✅ Загружена локализация для de
⚠️ Файл config-fr.json не найден
```

## Готовые примеры

В папке `public/` уже есть примеры:
- `config-de.json` - немецкая конфигурация
- `emojis-de.json` - немецкие переводы смайлов
