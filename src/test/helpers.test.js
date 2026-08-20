import { describe, it, expect } from 'vitest'
import {
  unicodeToEmoji,
  filterEmojis,
  snakeToCapitalizedCase,
  isNativeOnlyEmoji,
  normalizeEmojiSrc,
} from '../helpers'
import emojis from '../data/emojis.json'
import { EMOJI_REMOTE_SRC } from '../constant'

describe('helpers', () => {
  // Test unicodeToEmoji
  it('unicodeToEmoji: test valid input', () => {
    expect(unicodeToEmoji('1f602')).toBe('😂')
  })

  // Test filterEmojis
  it('filterEmojis: test search result', () => {
    const result = filterEmojis(emojis, 'face with tears of joy', 'neutral', [])
    expect(result).toStrictEqual({
      smileys_people: [
        {
          n: ['face with tears of joy', 'joy'],
          r: '1f602',
          u: '1f602',
        },
        {
          n: ['cat face with tears of joy', 'joy_cat'],
          r: '1f639',
          u: '1f639',
        },
      ],
    })
  })

  it('filterEmojis: applies light skin tone (first variation, index 0)', () => {
    const result = filterEmojis(emojis, 'thumbs up sign', '1f3fb', [])
    expect(result.smileys_people[0].r).toBe('1f44d-1f3fb')
  })

  it('filterEmojis: applies medium-light skin tone', () => {
    const result = filterEmojis(emojis, 'thumbs up sign', '1f3fc', [])
    expect(result.smileys_people[0].r).toBe('1f44d-1f3fc')
  })

  // Test snakeToCapitalizedCase
  it('snakeToCapitalizedCase: Test valid input', () => {
    expect(snakeToCapitalizedCase('hello_world_a')).toBe('Hello World A')
  })

  it('isNativeOnlyEmoji: standalone signs without Apple images', () => {
    expect(isNativeOnlyEmoji('2640-fe0f')).toBe(true)
    expect(isNativeOnlyEmoji('2642-fe0f')).toBe(true)
    expect(isNativeOnlyEmoji('2695-fe0f')).toBe(true)
    expect(isNativeOnlyEmoji('1f469-200d-2695-fe0f')).toBe(false)
    expect(isNativeOnlyEmoji('1f600')).toBe(false)
    expect(
      isNativeOnlyEmoji(
        '2640-fe0f',
        'https://cdn.jsdelivr.net/npm/emoji-datasource-google@6.0.1/img/google/64'
      )
    ).toBe(false)
  })

  it('normalizeEmojiSrc: falls back to Apple CDN and strips slashes', () => {
    expect(normalizeEmojiSrc()).toBe(EMOJI_REMOTE_SRC)
    expect(normalizeEmojiSrc('')).toBe(EMOJI_REMOTE_SRC)
    expect(normalizeEmojiSrc('https://example.com/emoji/')).toBe(
      'https://example.com/emoji'
    )
  })
})
