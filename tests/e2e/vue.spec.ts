import { expect, test } from '@playwright/test'
import { testUrls } from '../../src/testurls'

test('getNextPath should work on all inputs', async ({ page }) => {
  for (const { testid, url, expected } of testUrls) {
    await page.goto(url)
    expect(page.getByTestId('path')).toHaveText(expected)
    console.log(`url: ${url}, expected: ${expected}`)
  }
})
