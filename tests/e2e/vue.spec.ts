import { testUrls } from '@/testurls'
import { expect, test } from '@playwright/test'

test('getNextPath should work on all inputs', async ({ page }) => {
  for (const { testid, url, expected } of testUrls) {
    await page.goto(url)
    await expect(page.getByTestId('path')).toHaveText(expected)
    console.log(`url: ${url}, expected: ${expected}`)
  }
})
