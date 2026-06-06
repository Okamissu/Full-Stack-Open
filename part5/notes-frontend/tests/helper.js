const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: /log in/i }).click()
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: /log in/i }).click()
}

const createNote = async (page, content) => {
  await page.getByRole('button', { name: /new note/i }).click()
  await page.getByLabel(/content/i).fill(content)
  await page.getByRole('button', { name: /save/i }).click()
  await page.getByText(content).waitFor()
}

export { loginWith, createNote }
