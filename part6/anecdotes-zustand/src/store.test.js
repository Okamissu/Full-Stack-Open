import { beforeEach, describe, test, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './store'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
  // Write a test that verifies the state is initialized with the anecdotes returned by the backend.
  test('initialize loads sorted anecdotes from backend via getAll service method', async () => {
    const mockAnecdotes = [
      {
        content: 'Testing 2',
        votes: 2,
        id: 'Dp1Ai7Y3676',
      },
      {
        content: 'Testing 1',
        votes: 1,
        id: 'Dp1Ai7Y3578',
      },
      {
        content: 'Testing 0',
        votes: 0,
        id: 'Dp1Ai7Y2137',
      },
    ]

    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })
})

// Write a test that verifies the component displaying anecdotes receives the anecdotes from the store sorted by votes.

// Write a test that verifies the correct React component receives a properly filtered list of anecdotes.

// Write a test that verifies that voting increases the number of votes for an anecdote.
