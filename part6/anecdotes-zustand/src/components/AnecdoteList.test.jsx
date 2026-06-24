import { render, screen, renderHook, act, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  const renderInitializedList = async () => {
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    render(<AnecdoteList />)
  }

  test('receives the anecdotes from the store sorted by votes', async () => {
    await renderInitializedList()

    const paragraphs = screen.queryAllByText(/testing/i)

    expect(paragraphs[0]).toHaveTextContent('Testing 2')
    expect(paragraphs[1]).toHaveTextContent('Testing 1')
    expect(paragraphs[2]).toHaveTextContent('Testing 0')
  })

  test('receives a properly filtered list of anecdotes', async () => {
    useAnecdoteStore.setState({ filter: '1' })
    await renderInitializedList()

    expect(screen.getByText('Testing 1')).toBeInTheDocument()
    expect(screen.queryByText('Testing 0')).not.toBeInTheDocument()
    expect(screen.queryByText('Testing 2')).not.toBeInTheDocument()
  })

  test('voting increases the number of votes for an anecdote.', async () => {
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)
    anecdoteService.update.mockResolvedValue({
      content: 'Testing 0',
      votes: 1,
      id: 'Dp1Ai7Y2137',
    })

    await renderInitializedList()

    const user = await userEvent.setup()

    const card = screen.getByText('Testing 0').closest('.card')

    const voteButton = within(card).getByRole('button', {
      name: /vote/i,
    })

    await user.click(voteButton)

    expect(anecdoteService.update).toHaveBeenCalledTimes(1)

    const updatedCard = screen.getByText('Testing 0').closest('.card')

    expect(within(updatedCard).getByText('1 votes')).toBeInTheDocument()
  })
})
