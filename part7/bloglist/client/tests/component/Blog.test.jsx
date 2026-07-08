import { screen } from '@testing-library/react'
import { renderWithRouter } from './test-utils'
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
      blogs: ['6a072c79378a01c18f57f744'],
      id: '69f2f3d8f256672399fb81d2',
    },
  }

  test('Renders title and author', () => {
    renderWithRouter(<Blog blog={blog} />)

    const authorElement = screen.getByText(/Rick Riordan/i)
    const titleElement = screen.getByText(/Percy Jackson and the Olympians/i)

    expect(authorElement).toBeInTheDocument()
    expect(titleElement).toBeInTheDocument()
  })
})
