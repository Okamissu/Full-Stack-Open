import { test, expect } from '@playwright/test'
import { loginWith, createNote } from './helper'

test.describe('Note app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      },
    })

    await page.goto('/')
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
    await loginWith(page, 'mluukkai', 'salainen')

    await expect(page.getByText(/Matti Luukkainen logged in/i)).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'incorrecto')

    const errorMessage = page.getByRole('alert')

    // In real projects avaoid testing exact CSS, unless part of requirement
    await expect(errorMessage).toHaveCSS('color', 'rgb(185, 28, 28)')
    await expect(errorMessage).toHaveCSS('border-style', 'solid')

    await expect(errorMessage).toContainText(/wrong credentials/i)
    await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
  })

  test.describe('when logged in', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'a new test note')

      await expect(page.getByText('a new test note')).toBeVisible()
    })

    test.describe('and a note exists', () => {
      test.beforeEach(async ({ page }) => {
        await createNote(page, 'another test note')

        await expect(page.getByText('another test note')).toBeVisible()
      })

      test('importance can be changed', async ({ page }) => {
        await page.getByRole('button', { name: /set not important/i }).click()
        await expect(page.getByText(/set important/i)).toBeVisible()
      })
    })

    test.describe('and several notes exists', () => {
      test.beforeEach(async ({ page }) => {
        await createNote(page, 'first note')
        await createNote(page, 'second note')
        await createNote(page, 'third note')
      })

      test('one of those can be made non important', async ({ page }) => {
        const noteElement = page.getByText('second note')

        noteElement.getByRole('button', { name: /set not important/i }).click()
        await expect(noteElement.getByText(/set important/i)).toBeVisible()
      })
    })
  })
})
