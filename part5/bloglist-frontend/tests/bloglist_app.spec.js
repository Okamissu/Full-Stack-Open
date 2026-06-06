import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      },
    })

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

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      const loginForm = page.locator('form')

      await loginForm.getByLabel('Username').fill('mluukkai')
      await loginForm.getByLabel('Password').fill('salainen')
      await loginForm.getByRole('button', { name: /login/i }).click()

      await expect(page.getByText(/Matti Luukkainen logged in/i)).toBeVisible()
    })
    test('fails with invalid credentials', async ({ page }) => {
      const loginForm = page.locator('form')

      await loginForm.getByLabel('Username').fill('wrongwrrong')
      await loginForm.getByLabel('Password').fill('wrongwrrong')
      await loginForm.getByRole('button', { name: /login/i }).click()

      await expect(page.getByText(/wrong credentials/i)).toBeVisible()
    })
  })
})
