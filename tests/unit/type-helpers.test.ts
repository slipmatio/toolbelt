import { expect, test } from 'vitest'

import { isString } from '@/type-helpers'

test('entries', async () => {
  expect(isString('')).toBe(true)
  expect(isString('foo')).toBe(true)
  expect(isString([null])).toBe(false)
  expect(isString(['foo'])).toBe(false)
  expect(isString(['foo', 'bar'])).toBe(false)
})
