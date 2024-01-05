import { test, expect } from '@playwright/test'

test('getNextPath with no querypath should return "/"', async ({ page }) => {
  page.on('console', (msg) => {
    const text = msg.text()
    if (!text.startsWith('[vite]')) {
      expect(text).toBe('nextPath: /')
    }
  })

  await page.goto('/vue/')
})

test('getNextPath with next=foo should return "/"', async ({ page }) => {
  page.on('console', (msg) => {
    const text = msg.text()
    if (!text.startsWith('[vite]')) {
      expect(text).toBe('nextPath: /')
    }
  })

  await page.goto('/vue/?next=foo')
})

test('getNextPath with next=http://foo.bar should return "/"', async ({ page }) => {
  page.on('console', (msg) => {
    const text = msg.text()
    if (!text.startsWith('[vite]')) {
      expect(text).toBe('nextPath: /')
    }
  })

  await page.goto('/vue/?next=http://foo.bar')
})

test('getNextPath with next=/next-url/ should return "/next-url/"', async ({ page }) => {
  page.on('console', (msg) => {
    const text = msg.text()
    if (!text.startsWith('[vite]')) {
      expect(text).toBe('nextPath: /next-url/')
    }
  })

  await page.goto('/vue/?next=/next-url/')
})
