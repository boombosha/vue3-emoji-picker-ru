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

  export interface PickerProps {
    native?: boolean
    hideSearch?: boolean
    hideGroupIcons?: boolean
    hideGroupNames?: boolean
    disableStickyGroupNames?: boolean
    disableSkinTones?: boolean
    disabledGroups?: string[]
    groupNames?: Record<string, string>
    staticTexts?: {
      placeholder?: string
      skinTone?: string
      noResults?: string
    }
    pickerType?: string
    mode?: 'prepend' | 'insert' | 'append'
    offset?: number
    additionalGroups?: Record<string, any[]>
    groupOrder?: string[]
    groupIcons?: Record<string, any>
    displayRecent?: boolean
    theme?: 'light' | 'dark' | 'auto'
    locale?: string
    customLocale?: CustomLocaleOptions
    text?: string
  }

  const EmojiPicker: DefineComponent<PickerProps>

  export default EmojiPicker
}

declare module 'vue3-emoji-picker-ru/css' {
  const content: string
  export default content
}
