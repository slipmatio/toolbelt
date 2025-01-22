import { testPaths, testUrls } from '@/testurls'
import { expect, test } from '@playwright/test'

test('getNextPath should work on all inputs', async ({ page }) => {
  for (const { url, expected } of testPaths) {
    await page.goto(url)
    await expect(page.getByTestId('path')).toHaveText(expected)
    console.log(`url: ${url}, expected: ${expected}`)
  }
})

test('getNext should work on all inputs', async ({ page }) => {
  for (const { url, expected } of testUrls) {
    await page.goto(url)
    await expect(page.getByTestId('url')).toHaveText(expected)
    console.log(`url: ${url}, expected: ${expected}`)
  }
})
