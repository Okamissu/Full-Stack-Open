import { test, expect } from '@playwright/test'

test.describe('Note app', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:5173')

    const locator = page.getByRole('heading', /notes/i)
    await expect(locator).toBeVisible()
    await expect(
      page.getByText(
        'Note app, Department of Computer Science, University of Helsinki 2026',
      ),
    ).toBeVisible()
  })
})
