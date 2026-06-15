import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from './test-utils'
import Blog from '../../src/components/Blog'
import BlogDetails from '../../src/components/BlogDetails'
import { expect } from 'vitest'

describe('<BlogDetails/>', () => {
  const blog = {
    author: 'Rick Riordan',
    id: '6a072c79378a01c18f57f744',
    likes: 0,
    title: 'Percy Jackson and the Olympians',
    url: 'https://rickriordan.com/series/percy-jackson-and-the-olympians/',
    user: {
      username: 'mikkalesen',
      name: 'Mike',
      blogs: ['6a072c79378a01c18f57f744'],
      id: '69f2f3d8f256672399fb81d2',
    },
  }

  const creatorUser = {
    token: 'totallyValidToken',
    username: 'mikkalesen',
    name: 'Mike',
    blogs: ['6a072c79378a01c18f57f744'],
    id: '69f2f3d8f256672399fb81d2',
  }

  const notCreatorUser = {
    token: 'totallyValidTokenOnceAgain',
    username: 'mluukkai',
    name: 'Maciej',
    blogs: ['69f302987ca769522f4c24bf'],
    id: '67g3a5gh75a2652369fcb1d3',
  }

  test('displays blog information: title, author, likes, added by, url', () => {
    renderWithRouter(<BlogDetails blog={blog} />)

    expect(
      screen.getByRole('heading', { name: blog.title }),
    ).toBeInTheDocument()

    expect(screen.getByText(blog.author)).toBeInTheDocument()

    expect(screen.getByText(blog.likes.toString())).toBeInTheDocument()

    expect(screen.getByText(blog.user.username)).toBeInTheDocument()

    expect(screen.getByRole('link', { name: blog.url })).toBeInTheDocument()
  })

  test('doesnt display like & remove buttons to unauthenticated users', () => {
    renderWithRouter(<BlogDetails blog={blog} />)

    expect(
      screen.queryByRole('button', { name: /like/i }),
    ).not.toBeInTheDocument()

    expect(
      screen.queryByRole('button', { name: /remove/i }),
    ).not.toBeInTheDocument()
  })

  test("displays like button, but doesnt display remove button to authenticated users who are not the blog's creator", () => {
    renderWithRouter(<BlogDetails blog={blog} user={notCreatorUser} />)

    expect(screen.getByRole('button', { name: /like/i })).toBeInTheDocument()

    expect(
      screen.queryByRole('button', { name: /remove/i }),
    ).not.toBeInTheDocument()
  })

  test("displays the remove button to authenticated user who's the creator", () => {
    renderWithRouter(<BlogDetails blog={blog} user={creatorUser} />)

    expect(screen.getByRole('button', { name: /like/i })).toBeInTheDocument()

    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument()
  })

  test('upon clicking like button twice, the like handler was called twice', async () => {
    const mockHandler = vi.fn()

    renderWithRouter(
      <BlogDetails
        blog={blog}
        handleLike={mockHandler}
        user={notCreatorUser}
      />,
    )

    const user = userEvent.setup()

    const likeButton = screen.getByRole('button', { name: /like/i })
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler).toHaveBeenCalledTimes(2)
  })

  test('clicking remove calls delete handler', async () => {
    const mockHandler = vi.fn()

    renderWithRouter(
      <BlogDetails blog={blog} user={creatorUser} handleDelete={mockHandler} />,
    )

    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /remove/i }))

    expect(mockHandler).toHaveBeenCalledTimes(1)
  })
})
