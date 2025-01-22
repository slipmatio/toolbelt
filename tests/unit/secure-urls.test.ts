import { expect, test } from 'vitest'

import { isValidSecureUrl } from '@/browser'

test('isValidSecureUrl', () => {
  expect(isValidSecureUrl('https://www.fi')).toBe(true)
  expect(isValidSecureUrl('https://example.com/')).toBe(true)
  expect(isValidSecureUrl('not-an-url.io')).toBe(false)

  expect(isValidSecureUrl('https://next.slipmat.io/djuninen/')).toBe(true)

  expect(isValidSecureUrl('http://localhost')).toBe(true)
  expect(isValidSecureUrl('http://localhost:8000')).toBe(true)
  expect(isValidSecureUrl('http://localhost:8000/login/')).toBe(true)
})
