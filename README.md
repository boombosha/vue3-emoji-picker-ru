# Vue3 Emoji Picker RU / Vue3 Эмодзи Пикер RU. [Live preview](https://codesandbox.io/p/github/delowardev/vue3-emoji-picker/main?file=%2FREADME.md)

[![Test Automation](https://github.com/delowardev/vue3-emoji-picker/actions/workflows/TestAutomation.yaml/badge.svg)](https://github.com/delowardev/vue3-emoji-picker/actions/workflows/TestAutomation.yaml)
[![npm version](https://badge.fury.io/js/vue3-emoji-picker.svg)](https://badge.fury.io/js/vue3-emoji-picker)
[![downloads](https://img.shields.io/npm/dm/vue3-emoji-picker.svg)](https://www.npmjs.com/package/vue3-emoji-picker)

A Vue 3 emoji picker component with built-in Russian localization and custom localization support. / Компонент выбора эмодзи для Vue 3 со встроенной русской локализацией и поддержкой кастомной локализации.

<img src="https://i.imgur.com/CQc1nCF.png" width="280" />
<img src="https://i.imgur.com/RGGRQSk.png" width="280" />

## Features / Особенности

- 🎨 **Multiple Themes** - Light, Dark, Auto themes
- 🌍 **Multi-language Support** - Built-in English, Russian + custom localization
- 🔍 **Smart Search** - Search emojis in multiple languages
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Vue 3 Compatible** - Built for Vue 3 Composition API
- 🎯 **Customizable** - Extensive customization options
- 📦 **TypeScript Support** - Full TypeScript definitions

## Installation / Установка:

```
npm install vue3-emoji-picker-ru

// or
yarn add vue3-emoji-picker-ru
```

_Important note: If you're using TypeScript, don't forget to add type declarations. See [vue3-emoji-picker-ru.d.ts](./vue3-emoji-picker-ru.d.ts) for the complete type definitions._
_Важно: Если вы используете TypeScript, не забудьте добавить декларации типов. См. [vue3-emoji-picker-ru.d.ts](./vue3-emoji-picker-ru.d.ts) для полных определений типов._

### TypeScript Setup / Настройка TypeScript

Create a `types.d.ts` file in your project root and add: / Создайте файл `types.d.ts` в корне вашего проекта и добавьте:

```typescript
declare module 'vue3-emoji-picker-ru' {
  import { DefineComponent } from 'vue'

  export interface EmojiExt {
    i: string
    n: string[]
    r: string
    t: string
    u: string
  }

  export interface CustomLocaleOptions {
    locale: string
    configPath?: string
    emojisPath?: string
  }

  const EmojiPicker: DefineComponent<any>
  export default EmojiPicker
}

declare module 'vue3-emoji-picker-ru/css' {
  const content: string
  export default content
}
```

Or copy the complete type definitions from [types.d.ts.example](./types.d.ts.example) / Или скопируйте полные определения типов из [types.d.ts.example](./types.d.ts.example)

## Usage / Использование:

```javascript
// import picker component / импорт компонента пикера
import EmojiPicker from 'vue3-emoji-picker-ru'

// import css / импорт стилей
import 'vue3-emoji-picker-ru/css'
// or import directly: / или импорт напрямую:
// import'node_modules/vue3-emoji-picker-ru/dist/style.css'
```

```vue
// use picker component / использование компонента пикера
<EmojiPicker :native="true" @select="onSelectEmoji" />

// with localization / с локализацией
<EmojiPicker locale="ru" @select="onSelectEmoji" />

// with custom localization / с кастомной локализацией
<EmojiPicker
  locale="my-lang"
  :custom-locale="{
    locale: 'my-lang',
    configPath: '/my-locales/config.json',
    emojisPath: '/my-locales/emojis.json',
  }"
  @select="onSelectEmoji"
/>
```

```javascript
// event callback / обработчик события
function onSelectEmoji(emoji) {
  console.log(emoji)
  /*
    // result / результат
    { 
        i: "😚", 
        n: ["kissing face"], 
        r: "1f61a", // with skin tone / с тоном кожи
        t: "neutral", // skin tone / тон кожи
        u: "1f61a" // without tone / без тона
    }
    */
}
```

## Options (`props`) / Опции (пропсы)

| Prop                       | Type    | Default Value | Description                                                                                                                                                                                         |
| :------------------------- | :------ | :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| native                     | Boolean | false         | Load native emoji instead of image. / Загружать нативные эмодзи вместо изображений.                                                                                                                 |
| emoji-src                  | String  | Apple CDN     | Base URL for emoji PNG images (no trailing slash). Example: Google `https://cdn.jsdelivr.net/npm/emoji-datasource-google@6.0.1/img/google/64`. Reactive. / Базовый URL картинок эмодзи. Реактивный. |
| hide-search                | Boolean | false         | Show/hide search input. / Показать/скрыть поле поиска.                                                                                                                                              |
| hide-group-icons           | Boolean | false         | Show/hide header group icons. / Показать/скрыть иконки групп в заголовке.                                                                                                                           |
| hide-group-names           | Boolean | false         | Show/hide group names. / Показать/скрыть названия групп.                                                                                                                                            |
| disable-sticky-group-names | Boolean | false         | Disable sticky for group names / Отключить липкие названия групп                                                                                                                                    |
| disable-skin-tones         | Boolean | false         | Disable skin tones. / Отключить тона кожи.                                                                                                                                                          |
| disabled-groups            | Array   | []            | Disable any group/category. See [Available groups](#available-groups) / Отключить любую группу/категорию. См. [Доступные группы](#available-groups)                                                 |
| group-names                | Object  | {}            | Change any group name. See [Default group names](#default-group-names) / Изменить любое название группы. См. [Названия групп по умолчанию](#default-group-names)                                    |
| static-texts               | Object  | Object        | See [static-texts](#propsstatic-texts) table / См. таблицу [static-texts](#propsstatic-texts)                                                                                                       |
| pickerType                 | string  | ''            | Choose picker type, possible options: `input`, `textarea` (Popup with input/textarea), `''` / Выбрать тип пикера, возможные варианты: `input`, `textarea` (Всплывающее окно с input/textarea), `''` |
| mode                       | string  | 'insert'      | Choose insert mode, possible options: `prepend`, `insert`, `append` / Выбрать режим вставки, возможные варианты: `prepend`, `insert`, `append`                                                      |
| offset                     | Number  | '6'           | Choose emoji popup offset / Выбрать отступ всплывающего окна эмодзи                                                                                                                                 |
| additional-groups          | Object  | {}            | Add additional customized groups, keys are the group names translated from snake_case / Добавить дополнительные настраиваемые группы, ключи - это названия групп, переведенные из snake_case        |
| group-order                | Array   | []            | Override ordering of groups / Переопределить порядок групп                                                                                                                                          |
| group-icons                | Object  | {}            | Override group icons by passing svg's on keys / Переопределить иконки групп, передавая SVG по ключам                                                                                                |
| display-recent             | Boolean | false         | Display Recently used emojis / Показать недавно использованные эмодзи                                                                                                                               |
| theme                      | String  | 'light'       | Available options, 'light', 'dark', and 'auto' / Доступные варианты: 'light', 'dark' и 'auto'                                                                                                       |
| locale                     | String  | 'auto'        | Language code (en, ru, de, fr, or custom). See [Localization](#localization--локализация)                                                                                                           |
| custom-locale              | Object  | undefined     | Custom localization options. See [Custom Localization](#custom-localization--кастомная-локализация)                                                                                                 |

## Static text option (`props['static-texts']`) / Опция статического текста

| Prop        | Type   | Default Value | Description / Описание                                                          |
| :---------- | :----- | :------------ | :------------------------------------------------------------------------------ |
| placeholder | String | Search emoji  | Update search input placeholder text. / Обновить текст placeholder поля поиска. |
| skinTone    | String | Skin tone     | Footer skin tone button text. / Текст кнопки тона кожи в футере.                |

Example / Пример:
`:static-texts="{ placeholder: 'Search emoji'}" `<br/>

## Events / Callbacks / События / Обработчики

### `@select`

This event fires when an emoji gets selected/clicked. / Это событие срабатывает при выборе/клике на эмодзи.<br/>
Event callback will receive selected emoji in the first argument. / Обработчик события получит выбранный эмодзи в первом аргументе.

```
<EmojiPicker @select="onSelectEmoji" />

function onSelectEmoji(emoji) { /* do something */ }
```

### `@update:text`

This event fires when input text gets changed. / Это событие срабатывает при изменении текста в поле ввода.<br/>
Event callback will receive the text in the first argument. / Обработчик события получит текст в первом аргументе.

```
<EmojiPicker @update:text="onChangeText" />

function onChangeText(text) { /* do something */ }
```

## Available groups / Доступные группы

```json
[
  "smileys_people",
  "animals_nature",
  "food_drink",
  "activities",
  "travel_places",
  "objects",
  "symbols",
  "flags"
]
```

## Default group names / Названия групп по умолчанию

```json
{
  "smileys_people": "Smiles & People",
  "animals_nature": "Animals & Nature",
  "food_drink": "Food & Drink",
  "activities": "Activities",
  "travel_places": "Travel places",
  "objects": "Objects",
  "symbols": "Symbols",
  "flags": "Flags",
  "recent": "Recently used"
}
```

## Overriding group names / Переопределение названий групп

```vue
<picker :group-names="{ smileys_people: 'My customized group name' }" />
```

## Overriding group icons / Переопределение иконок групп

```vue
<template>
  <picker :group-icons="{ smileys_people: customSVG }" />
</template>

<script setup>
import customSVG from './path/to/svg'
</script>
```

## Override group order / Переопределение порядка групп

This will make it so flags is first and then any other non-defined group will follow. / Это сделает так, что флаги будут первыми, а затем последуют любые другие неопределенные группы.

```vue
<picker :group-order="['flags']" />
```

## Add additional groups / Добавление дополнительных групп

To see any existing emoji's see `src/data/emojis.json` / Чтобы увидеть любые существующие эмодзи, см. `src/data/emojis.json`

```vue
<picker
  :additional-groups="{
    my_custom_group: [
      { n: ['grinning face', 'grinning'], u: '1f600' },
      { n: ['grinning face with smiling eyes', 'grin'], u: '1f601' },
    ],
  }"
  :group-names="{ my_custom_group: 'Frequently used' }"
/>
```

## Localization / Локализация

### Built-in Languages / Встроенные языки

```vue
<!-- English (default) -->
<picker @select="onSelect" />

<!-- Russian -->
<picker locale="ru" @select="onSelect" />

<!-- German -->
<picker locale="de" @select="onSelect" />
```

### Supported Languages / Поддерживаемые языки

| Language | Code | Status           |
| -------- | ---- | ---------------- |
| English  | `en` | ✅ Built-in      |
| Russian  | `ru` | ✅ Built-in      |
| German   | `de` | ✅ External JSON |
| French   | `fr` | ✅ External JSON |

### Custom Localization / Кастомная локализация

You can specify custom paths for localization files: / Вы можете указать кастомные пути для файлов локализации:

```vue
<template>
  <picker
    locale="my-lang"
    :custom-locale="customLocaleOptions"
    @select="onSelect"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CustomLocaleOptions } from 'vue3-emoji-picker-ru'

const customLocaleOptions: CustomLocaleOptions = {
  locale: 'my-lang',
  configPath: '/my-locales/config.json', // Path to config file / Путь к файлу конфигурации
  emojisPath: '/my-locales/emojis.json', // Path to emojis file / Путь к файлу эмодзи
}

function onSelect(emoji: any) {
  console.log('Selected emoji:', emoji)
}
</script>
```

### Localization Files Structure / Структура файлов локализации

#### 1. Configuration File / Файл конфигурации

Create a config file (e.g., `/my-locales/config.json`):

```json
{
  "locale": "my-lang",
  "groupNames": {
    "recent": "Recently used",
    "smileys_people": "Smiles & People",
    "animals_nature": "Animals & Nature",
    "food_drink": "Food & Drink",
    "activities": "Activities",
    "travel_places": "Travel places",
    "objects": "Objects",
    "symbols": "Symbols",
    "flags": "Flags"
  },
  "staticTexts": {
    "placeholder": "Search emoji",
    "skinTone": "Skin tone",
    "noResults": "No emoji found!"
  }
}
```

#### 2. Emojis Translation File / Файл переводов смайлов

Create an emojis file (e.g., `/my-locales/emojis.json`):

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
  ]
}
```

### New Props / Новые пропсы

| Prop            | Type     | Description                               |
| --------------- | -------- | ----------------------------------------- |
| `locale`        | `String` | Language code (en, ru, de, fr, or custom) |
| `custom-locale` | `Object` | Custom localization options               |

### Custom Locale Options / Опции кастомной локализации

```typescript
interface CustomLocaleOptions {
  locale: string // Language code
  configPath?: string // Path to config file
  emojisPath?: string // Path to emojis file
}
```

### Examples / Примеры

#### CDN Localization / Локализация с CDN

```vue
<picker
  locale="es"
  :custom-locale="{
    locale: 'es',
    configPath: 'https://cdn.example.com/locales/es/config.json',
    emojisPath: 'https://cdn.example.com/locales/es/emojis.json',
  }"
  @select="onSelect"
/>
```

#### API Localization / Локализация через API

```vue
<picker
  locale="dynamic"
  :custom-locale="{
    locale: 'dynamic',
    configPath: '/api/locales/config',
    emojisPath: '/api/locales/emojis',
  }"
  @select="onSelect"
/>
```

#### Local Files / Локальные файлы

```vue
<picker
  locale="custom"
  :custom-locale="{
    locale: 'custom',
    configPath: '/assets/locales/my-lang/config.json',
    emojisPath: '/assets/locales/my-lang/emojis.json',
  }"
  @select="onSelect"
/>
```

### Search in Multiple Languages / Поиск на нескольких языках

The search works across all languages in the emoji names array:

```javascript
// English search
'smile' // finds 😊

// Russian search
'улыбка' // finds 😊

// Any language
'смайл' // finds 😊
```

### Fallback System / Система отката

- If custom files are not found, falls back to English / Если кастомные файлы не найдены, откатывается на английский
- If built-in locale is not available, falls back to English / Если встроенная локаль недоступна, откатывается на английский
- Console warnings for debugging / Предупреждения в консоли для отладки

### Migration / Миграция

No migration needed for existing code. New functionality is additive: / Миграция не требуется для существующего кода. Новая функциональность является дополнительной:

**Before / До:**

```vue
<picker locale="de" />
```

**After (optional) / После (опционально):**

```vue
<picker
  locale="de"
  :custom-locale="{ locale: 'de', configPath: '/custom/de.json' }"
/>
```

For detailed documentation, see [CUSTOM_LOCALIZATION.md](./CUSTOM_LOCALIZATION.md) / Для подробной документации см. [CUSTOM_LOCALIZATION.md](./CUSTOM_LOCALIZATION.md)
