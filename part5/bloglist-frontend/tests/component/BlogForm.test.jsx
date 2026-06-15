import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../../src/components/BlogForm'

describe('<BlogForm />', () => {
  test('Submit handler gets called with right details', async () => {
    const mockHandler = vi.fn()
    render(<BlogForm createBlog={mockHandler} />)

    const user = userEvent.setup()

    const titleInput = screen.getByLabelText(/title/i)
    const authorInput = screen.getByLabelText(/author/i)
    const urlInput = screen.getByLabelText(/url/i)
    const createButton = screen.getByRole('button', { name: /create/i })

    await user.type(titleInput, 'BlogTitle')
    await user.type(authorInput, 'BlogAuthor')
    await user.type(urlInput, 'https://www.blog.com')
    await user.click(createButton)

    expect(mockHandler).toHaveBeenCalledTimes(1)
    expect(mockHandler).toHaveBeenCalledWith({
      title: 'BlogTitle',
      author: 'BlogAuthor',
      url: 'https://www.blog.com',
    })
  })
})
