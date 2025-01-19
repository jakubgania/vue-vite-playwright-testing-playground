import { expect, test, describe } from 'vitest'
import { sum } from '../../src/utils/sum'

describe('sum function', () => {
  test('adds 1 + 3 to equal 4', () => {
    expect(sum(1, 3)).toBe(4)
  })
})