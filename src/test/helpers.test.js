import { describe, it, expect } from 'vitest'
import {
  unicodeToEmoji,
  filterEmojis,
  snakeToCapitalizedCase,
} from '../helpers'
import emojis from '../data/emojis.json'

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
})
