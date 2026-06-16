import { test, expect } from '@playwright/test'
import { createBlog, loginWith } from './helper'

test.describe('Blog app', () => {
  test.beforeEach(async ({ request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      },
    })
  })

  test.describe('Login site', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login')
    })

    test('Login form is shown', async ({ page }) => {
      const loginForm = page.locator('form')

      await expect(
        loginForm.getByRole('heading', { name: 'Login' }),
      ).toBeVisible()
      await expect(loginForm.getByLabel('Username')).toBeVisible()
      await expect(loginForm.getByLabel('Password')).toBeVisible()
      await expect(
        loginForm.getByRole('button', { name: 'Log in' }),
      ).toBeVisible()
    })

    test('Login succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')

      await expect(page.getByText(/Matti Luukkainen logged in/i)).toBeVisible()
    })
    test('Login fails with invalid credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrongwrong')

      await expect(page.getByText(/wrong credentials/i)).toBeVisible()
    })
  })

  test.describe('Blog creation site', () => {
    test.describe('When logged in & there is a blog created by logged user', () => {
      test.beforeEach(async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
        await createBlog(
          page,
          'The Playwright Blog',
          'Playwright Creator',
          'http://playwright.dev/',
        )
      })

      test('the created blog (done in beforeEach for this group) is visible', async ({
        page,
      }) => {
        await page.goto('/')
        await expect(page.getByText('The Playwright Blog')).toBeVisible()
        await expect(page.getByText('Playwright Creator')).toBeVisible()
      })

      test('a newly created blog can be liked', async ({ page }) => {
        const blog = page.getByRole('link', { name: 'The Playwright Blog' })

        await blog.click()
        await page.getByRole('button', { name: /like/i }).click()

        await expect(page.getByText(/likes: 1/i)).toBeVisible()
      })

      test('a newly created blog can be deleted', async ({ page }) => {
        const blog = page.getByRole('link', { name: 'The Playwright Blog' })

        await blog.click()

        page.on('dialog', (dialog) => dialog.accept())

        await page.getByRole('button', { name: /remove/i }).click()

        await expect(
          page.getByText(/Removed blog: The Playwright Blog/i),
        ).toBeVisible()

        await expect(blog).toHaveCount(0)
      })

      test('only user who added the blog sees delete button', async ({
        page,
        request,
      }) => {
        await page.getByRole('link', { name: 'The Playwright Blog' }).click()

        await expect(
          page.getByRole('button', { name: /remove/i }),
        ).toBeVisible()

        await request.post('http://localhost:3001/api/users', {
          data: {
            name: 'Kamil Koby',
            username: 'okamilo',
            password: 'pingi125',
          },
        })

        await page.getByRole('button', { name: /log out/i }).click()

        await loginWith(page, 'okamilo', 'pingi125')

        await page.getByRole('link', { name: 'The Playwright Blog' }).click()

        await expect(page.getByRole('button', { name: /remove/i })).toHaveCount(
          0,
        )
      })

      test('blogs are sorted in descending likes order', async ({ page }) => {
        await createBlog(
          page,
          'blogTwo',
          'authorTwo',
          'https://www.blogTwo.com',
        )
        await createBlog(
          page,
          'blogThree',
          'authorThree',
          'https://www.blogThree.com',
        )

        await page.getByRole('link', { name: 'The Playwright Blog' }).click()
        await page.getByRole('button', { name: /like/i }).click()
        await page.getByRole('button', { name: /like/i }).click()
        await expect(page.getByText(/Likes: 2/i)).toBeVisible()
        await page.getByRole('link', { name: 'Blogs' }).click()

        await page.getByRole('link', { name: 'blogTwo' }).click()
        await page.getByRole('button', { name: /like/i }).click()
        await expect(page.getByText(/Likes: 1/i)).toBeVisible()
        await page.getByRole('link', { name: 'Blogs' }).click()

        await page.getByRole('link', { name: 'blogThree' }).click()
        await expect(page.getByText(/Likes: 0/i)).toBeVisible()
        await page.getByRole('link', { name: 'Blogs' }).click()

        const blogs = page.getByRole('listitem')
        await expect(blogs).toHaveCount(3)

        await expect(blogs.nth(0)).toContainText(/The Playwright Blog/i)
        await expect(blogs.nth(1)).toContainText(/blogTwo/i)
        await expect(blogs.nth(2)).toContainText(/blogThree/i)
      })
    })
  })
})
