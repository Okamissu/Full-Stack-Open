import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../../src/components/Blog'

describe('<Blog />', () => {
  const blog = {
    author: 'Rick Riordan',
    id: '6a072c79378a01c18f57f744',
    likes: 0,
    title: 'Percy Jackson and the Olympians',
    url: 'https://rickriordan.com/series/percy-jackson-and-the-olympians/',
    user: {
      username: 'mikkalesen',
      name: 'Mike',
      blogs: [
        '69f302987ca769522f4c24bf',
        '69f302a17ca769522f4c24c3',
        '69f30459fcdd20c52d5ffddb',
        '69f30687cf7600b701d24784',
        '69f30af22a82df56852987cb',
        '69f30cd8516fd29b63aeac48',
        '69f30cee516fd29b63aeac4c',
        '6a072442378a01c18f57f646',
        '6a072572378a01c18f57f6a9',
        '6a0725d1378a01c18f57f6b7',
        '6a072c3a378a01c18f57f740',
        '6a072c79378a01c18f57f744',
      ],
      id: '69f2f3d8f256672399fb81d2',
    },
  }
  test('Renders title and author, does not render URL or number of likes by default', () => {
    render(<Blog blog={blog} />)

    const authorElement = screen.getByText(/Rick Riordan/i)
    const titleElement = screen.getByText(/Percy Jackson and the Olympians/i)

    const urlElement = screen.queryByText(blog.url)
    const likesElement = screen.queryByText(/Likes/i)

    expect(authorElement).toBeInTheDocument()
    expect(titleElement).toBeInTheDocument()

    expect(urlElement).not.toBeInTheDocument()
    expect(likesElement).not.toBeInTheDocument()
  })

  test('URL and likes are shown after details button has been clicked', async () => {
    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const detailsButton = screen.getByRole('button', { name: /show/i })
    await user.click(detailsButton)

    const urlElement = screen.getByText(blog.url)
    const likesElement = screen.getByText(/Likes/i)

    expect(urlElement).toBeInTheDocument()
    expect(likesElement).toBeInTheDocument()
  })

  test('Upon clicking like button twice, the like handler was called twice', async () => {
    const mockHandler = vi.fn()

    render(<Blog blog={blog} handleLike={mockHandler} />)

    const user = userEvent.setup()
    const detailsButton = screen.getByRole('button', { name: /show/i })
    await user.click(detailsButton)

    const likeButton = screen.getByRole('button', { name: /like/i })
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler).toHaveBeenCalledTimes(2)
  })
})
