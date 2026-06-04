import { test, expect } from '@playwright/test'

test.describe('Note app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset')
    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      },
    })

    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByRole('heading', { name: /notes/i })
    await expect(locator).toBeVisible()
    await expect(
      page.getByText(
        'Note app, Department of Computer Science, University of Helsinki 2026',
      ),
    ).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await page.getByRole('button', { name: /log in/i }).click()
    await page.getByLabel(/username/i).fill('mluukkai')
    await page.getByLabel(/password/i).fill('salainen')
    await page.getByRole('button', { name: /log in/i }).click()

    await expect(page.getByText(/Matti Luukkainen logged in/i)).toBeVisible()
  })

  test.describe('when logged in', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: /log in/i }).click()
      await page.getByLabel(/username/i).fill('mluukkai')
      await page.getByLabel(/password/i).fill('salainen')
      await page.getByRole('button', { name: /log in/i }).click()
    })

    test('a new note can be created', async ({ page }) => {
      await page.getByRole('button', { name: /new note/i }).click()
      await page.getByLabel(/content/i).fill('a new test note')
      await page.getByRole('button', { name: /save/i }).click()

      await expect(page.getByText('a new test note')).toBeVisible()
    })
    test.describe('and a note exists', () => {
      test.beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: /new note/i }).click()
        await page.getByLabel(/content/i).fill('another test note')
        await page.getByRole('button', { name: /save/i }).click()

        await expect(page.getByText('another test note')).toBeVisible()
      })

      test('importance can be changed', async ({ page }) => {
        await page.getByRole('button', { name: /set not important/i }).click()
        await expect(page.getByText(/set important/i)).toBeVisible()
      })
    })
  })
})
