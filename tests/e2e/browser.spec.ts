import { expect, test } from '@playwright/test'

test('clipboard should work', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('clipboard').click()
  await expect(page.getByTestId('clipboard-result')).toHaveText('true')
})

test('getCookie should work', async ({ browser }) => {
  // FIXME: not sure why Playwright is ignoring the FastAPI cookie 🤷‍♂️
  // This works locally with normal browser + Playwright no, tho
  const context = await browser.newContext()
  await context.addCookies([{ name: 'test-cookie', value: 'this-is-a-test', url: 'http://localhost:5173/' }])
  const page = await context.newPage()
  await page.goto('/')
  const cookies = await context.cookies()
  expect(cookies).toHaveLength(1)
  await page.waitForSelector('[data-testid=cookie-results]')

  await expect(page.getByTestId('cookie-result1')).toHaveText('null')
  await expect(page.getByTestId('cookie-result2')).toHaveText('this-is-a-test')
})

test('localStorage should be available', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('localstorage').click()
  await expect(page.getByTestId('localstorage-result')).toHaveText('true')
})
