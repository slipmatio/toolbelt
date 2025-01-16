import { expect, test } from 'vitest'

import { isAllowedDomain } from '@/browser'

test('isAllowedDomain', async () => {
  const allowed = ['www.example.com', 'slipmat.io']

  expect(isAllowedDomain('https://www.fi', allowed)).toBe(false)
  expect(isAllowedDomain('https://example.com/', allowed)).toBe(false)
  expect(isAllowedDomain('https://notslipmat.io', allowed)).toBe(false)
  expect(isAllowedDomain('https://next.slipmat.io/djuninen/', allowed)).toBe(true)
  expect(isAllowedDomain('https://slipmat.io', allowed)).toBe(true)
  expect(isAllowedDomain('https://account.slipmat.io', allowed)).toBe(true)
})
