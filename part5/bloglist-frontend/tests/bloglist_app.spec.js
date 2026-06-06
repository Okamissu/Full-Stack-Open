import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const loginForm = page.locator('form')

    await expect(
      loginForm.getByRole('heading', { name: 'Login' }),
    ).toBeVisible()
    await expect(loginForm.getByLabel('Username')).toBeVisible()
    await expect(loginForm.getByLabel('Password')).toBeVisible()
    await expect(loginForm.getByRole('button', { name: 'Login' })).toBeVisible()
  })
})
