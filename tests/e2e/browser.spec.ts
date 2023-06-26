import { test, expect } from '@playwright/test'

test('clipboard should log success', async ({ page }) => {
  page.on('console', (msg) => {
    const text = msg.text()
    if (!text.startsWith('[vite]')) {
      expect(text).toBe('copied to clipboard')
    }
  })

  await page.goto('/')
  await page.getByTestId('clipboard').click()
})

test('getCookie should log null', async ({ page }) => {
  page.on('console', (msg) => {
    const text = msg.text()
    if (!text.startsWith('[vite]')) {
      expect(text).toBe('null')
    }
  })

  await page.goto('/')
  await page.getByTestId('cookie').click()
})

test('localStorage should be available', async ({ page }) => {
  page.on('console', (msg) => {
    const text = msg.text()
    if (!text.startsWith('[vite]')) {
      expect(text).toBe('localStorage is available')
    }
  })

  await page.goto('/')
  await page.getByTestId('localstorage').click()
})
