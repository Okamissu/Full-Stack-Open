import { expect } from '@playwright/test'

const loginWith = async (page, username, password) => {
  await page.goto('/')
  await page.getByRole('link', { name: /login/i }).click()
  const loginForm = page.locator('form')

  await loginForm.getByLabel(/username/i).fill(username)
  await loginForm.getByLabel(/password/i).fill(password)
  await loginForm.getByRole('button', { name: /log in/i }).click()

  const successNotification = page.getByText(/logged in/i)
  const failureNotification = page.getByText(/wrong credentials/i)

  await expect(successNotification.or(failureNotification)).toBeVisible()
}

const createBlog = async (page, name, author, url) => {
  await page.goto('/')
  await page.getByRole('link', { name: /new blog/i }).click()

  const createBlogForm = page.locator('form')
  await createBlogForm.getByLabel(/title/i).fill(name)
  await createBlogForm.getByLabel(/author/i).fill(author)
  await createBlogForm.getByLabel(/url/i).fill(url)

  await createBlogForm.getByRole('button', { name: /create/i }).click()

  await page.getByText(name).waitFor()
}

export { loginWith, createBlog }
