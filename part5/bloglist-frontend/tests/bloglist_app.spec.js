import { test, expect } from '@playwright/test'
import { createBlog, loginWith } from './helper'

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
      await loginWith(page, 'mluukkai', 'salainen')

      await expect(page.getByText(/Matti Luukkainen logged in/i)).toBeVisible()
    })
    test('fails with invalid credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrongwrong')

      await expect(page.getByText(/wrong credentials/i)).toBeVisible()
    })

    test.describe('When logged in', () => {
      test.beforeEach(async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
      })

      test('a new blog can be created', async ({ page }) => {
        await createBlog(
          page,
          'The Playwright Blog',
          'Playwright Creator',
          'http://playwright.dev/',
        )
        await expect(page.getByText('The Playwright Blog')).toBeVisible()
        await expect(page.getByText('Playwright Creator')).toBeVisible()
      })

      test('a newly created blog can be liked', async ({ page }) => {
        await createBlog(
          page,
          'The Playwright Blog',
          'Playwright Creator',
          'http://playwright.dev/',
        )

        const blog = await page
          .getByRole('listitem')
          .filter({ hasText: 'The Playwright Blog' })

        await blog.getByRole('button', { name: /show/i }).click()
        await blog.getByRole('button', { name: /like/i }).click()

        expect(blog.getByText(/likes: 0/i)).toBeVisible()
      })

      test('a newly created blog can be deleted', async ({ page }) => {
        await createBlog(
          page,
          'The Playwright Blog',
          'Playwright Creator',
          'http://playwright.dev/',
        )

        const blog = page
          .getByRole('listitem')
          .filter({ hasText: 'The Playwright Blog' })

        await blog.getByRole('button', { name: /show/i }).click()

        page.on('dialog', (dialog) => dialog.accept())

        await blog.getByRole('button', { name: /remove/i }).click()

        await expect(
          page.getByText(/Removed blog: The Playwright Blog/i),
        ).toBeVisible()

        await expect(blog).not.toBeVisible()
      })
    })
  })
})
