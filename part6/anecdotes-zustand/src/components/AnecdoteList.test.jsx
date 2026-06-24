import { render, screen, renderHook, act } from '@testing-library/react'
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
import { describe, expect } from 'vitest'

describe('<AnecdoteList/>', () => {
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
  test('receives the anecdotes from the store sorted by votes', async () => {
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    render(<AnecdoteList />)

    const paragraphs = screen.queryAllByText(/testing/i)

    expect(paragraphs[0]).toHaveTextContent('Testing 2')
    expect(paragraphs[1]).toHaveTextContent('Testing 1')
    expect(paragraphs[2]).toHaveTextContent('Testing 0')
  })

  test('receives a properly filtered list of anecdotes', async () => {
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    useAnecdoteStore.setState({ filter: '1' })

    render(<AnecdoteList />)

    expect(screen.getByText('Testing 1')).toBeInTheDocument()

    expect(screen.queryByText('Testing 0')).not.toBeInTheDocument()
    expect(screen.queryByText('Testing 2')).not.toBeInTheDocument()
  })
})
