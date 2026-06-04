import { test, expect } from '@playwright/test'

test.describe('Note app', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:5173')

    const locator = page.getByRole('heading', { name: /notes/i })
    await expect(locator).toBeVisible()
    await expect(
      page.getByText(
        'Note app, Department of Computer Science, University of Helsinki 2026',
      ),
    ).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await page.goto('http://localhost:5173')

    await page.getByRole('button', { name: /log in/i }).click()
    await page.getByLabel(/username/i).fill('mluukkai')
    await page.getByLabel(/password/i).fill('salainen')
    await page.getByRole('button', { name: /log in/i }).click()

    await expect(page.getByText(/Matti Luukkainen logged in/i)).toBeVisible()
  })
})
