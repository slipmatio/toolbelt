import { expect, test } from 'vitest'

import { isAllowedDomain } from '@/utils'

test('isAllowedDomain', () => {
  const allowed = ['www.example.com', 'slipmat.io', 'localhost:8000']

  expect(isAllowedDomain('https://www.fi', allowed)).toBe(false)
  expect(isAllowedDomain('https://example.com/', allowed)).toBe(false)
  expect(isAllowedDomain('https://notslipmat.io', allowed)).toBe(false)

  expect(isAllowedDomain('https://next.slipmat.io/djuninen/', allowed)).toBe(true)
  expect(isAllowedDomain('https://slipmat.io', allowed)).toBe(true)
  expect(isAllowedDomain('https://account.slipmat.io', allowed)).toBe(true)

  expect(isAllowedDomain('http://localhost', allowed)).toBe(false)
  expect(isAllowedDomain('http://localhost:8000', allowed)).toBe(true)
  expect(isAllowedDomain('http://localhost:8000/login/', allowed)).toBe(true)
})
