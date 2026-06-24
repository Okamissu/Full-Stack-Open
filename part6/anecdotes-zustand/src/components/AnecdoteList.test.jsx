import { render, renderHook, act } from '@testing-library/react'
import AnecdoteList from './AnecdoteList'
vi.mock('../services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}))

import anecdoteService from '../services/anecdotes'
import useAnecdoteStore, { useAnecdoteActions } from '../store'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})
const mockAnecdotes = [
  {
    content: 'Testing 2',
    votes: 2,
    id: 'Dp1Ai7Y3676',
  },
  {
    content: 'Testing 0',
    votes: 0,
    id: 'Dp1Ai7Y2137',
  },
  {
    content: 'Testing 1',
    votes: 1,
    id: 'Dp1Ai7Y3578',
  },
]
test('renders anecdotes sorted by votes', async () => {
  anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

  const { result } = renderHook(() => useAnecdoteActions())

  await act(async () => {
    await result.current.initialize()
  })

  const { container } = render(<AnecdoteList />)

  const paragraphs = container.querySelectorAll('p')
  expect(paragraphs).toHaveLength(3)

  expect(paragraphs[0]).toHaveTextContent('Testing 2')
  expect(paragraphs[1]).toHaveTextContent('Testing 1')
  expect(paragraphs[2]).toHaveTextContent('Testing 0')
})
