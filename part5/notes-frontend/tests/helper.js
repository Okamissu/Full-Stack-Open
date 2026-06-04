const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: /log in/i }).click()
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: /log in/i }).click()
}

export { loginWith }
