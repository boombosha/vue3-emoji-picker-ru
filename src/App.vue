<template>
  <h2>Default (English)</h2>
  <picker
    :native="false"
    :display-recent="true"
    :hide-search="false"
    locale="en"
    @select="onSelect"
  />

  <h2>Russian Locale</h2>
  <picker
    :native="false"
    :display-recent="true"
    :hide-search="false"
    locale="ru"
    @select="onSelect"
  />

  <h2>Native + Dark Theme (Russian)</h2>
  <picker
    theme="dark"
    :native="true"
    :hide-search="false"
    locale="ru"
    @select="onSelect"
  />

  <h2>With input (Russian)</h2>
  <picker
    :text="text"
    picker-type="input"
    :hide-search="false"
    locale="ru"
    @select="onSelect"
    @update:text="onChangeText"
  />

  <h2>With textarea + Dark Theme (English)</h2>
  <picker
    theme="dark"
    :text="text"
    picker-type="textarea"
    :hide-search="false"
    locale="en"
    @select="onSelect"
    @update:text="onChangeText"
  />

  <h2>Additional groups (Russian)</h2>
  <picker
    :additional-groups="additionalGroups"
    :hide-search="false"
    locale="ru"
    @select="onSelect"
  />

  <h2>German Locale (External JSON)</h2>
  <picker
    :native="false"
    :display-recent="true"
    :hide-search="false"
    locale="de"
    @select="onSelect"
  />

  <h2>Custom Locale (Custom Paths)</h2>
  <picker
    :native="false"
    :display-recent="true"
    :hide-search="false"
    locale="custom"
    :custom-locale="customLocaleOptions"
    @select="onSelect"
  />

  <h2>French Locale (Custom Paths)</h2>
  <picker
    :native="false"
    :display-recent="true"
    :hide-search="false"
    locale="fr"
    :custom-locale="frenchLocaleOptions"
    @select="onSelect"
  />
</template>

<script lang="ts">
/**
 * External dependencies
 */
import { defineComponent, ref } from 'vue'

/**
 * Internal dependencies
 */
import Picker from './components/Picker.vue'
import { CustomLocaleOptions } from './types'

/**
 * SVGs
 */
import custom from './svgs/groups/custom.svg'

export default defineComponent({
  name: 'App',
  components: {
    Picker,
  },
  setup() {
    const text = ref('input')

    /**
     * Handle text change
     * @param new_text
     */
    function onChangeText(new_text: string | undefined) {
      text.value = new_text || ''
    }

    function onSelect(emoji: any) {
      alert(`${emoji.i} selected, check console log for emoji details.`)
      console.log(emoji)
    }

    const additionalGroups = {
      my_custom_group: [
        { n: ['grinning face', 'grinning'], u: '1f600' },
        { n: ['grinning face with smiling eyes', 'grin'], u: '1f601' },
      ],
    }

    // Пример кастомной локализации с указанием путей
    const customLocaleOptions: CustomLocaleOptions = {
      locale: 'custom',
      configPath: '/examples/locales/config-fr.json',
      emojisPath: '/examples/locales/emojis-fr.json',
    }

    // Пример французской локализации с кастомными путями
    const frenchLocaleOptions: CustomLocaleOptions = {
      locale: 'fr',
      configPath: '/examples/locales/config-fr.json',
      emojisPath: '/examples/locales/emojis-fr.json',
    }

    /**
     * Return vars
     */
    return {
      onChangeText,
      text,
      onSelect,
      additionalGroups,
      custom,
      customLocaleOptions,
      frenchLocaleOptions,
    }
  },
})
</script>

<style lang="scss">
h2 {
  margin-top: 60px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto 0;
  max-width: 560px;
}
.input-wrap {
  input {
    display: block;
    height: 40px;
    width: 400px;
    margin: 0 auto 30px;
    padding: 0 20px;
  }
}
</style>
