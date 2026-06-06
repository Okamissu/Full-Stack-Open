const loginWith = async (page, username, password) => {
  const loginForm = page.locator('form')
  await loginForm.getByLabel(/username/i).fill(username)
  await loginForm.getByLabel(/password/i).fill(password)
  await loginForm.getByRole('button', { name: /login/i }).click()
}

const createBlog = async (page, name, author, url) => {
  await page.getByRole('button', { name: /create a new blog/i }).click()

  const createBlogForm = page.locator('form')
  await createBlogForm.getByLabel(/title/i).fill(name)
  await createBlogForm.getByLabel(/author/i).fill(author)
  await createBlogForm.getByLabel(/url/i).fill(url)

  await createBlogForm.getByRole('button', { name: /create/i }).click()

  await page.getByText(name).waitFor()
}

export { loginWith, createBlog }
