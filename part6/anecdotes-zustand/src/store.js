import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const sort = (anecdotes) => anecdotes.toSorted((a, b) => b.votes - a.votes)

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: (notes) =>
      set(() => ({
        anecdotes: sort(notes),
      })),
    vote: (id) =>
      set((state) => ({
        anecdotes: sort(
          state.anecdotes.map((anecdote) =>
            anecdote.id === id
              ? { ...anecdote, votes: anecdote.votes + 1 }
              : anecdote,
          ),
        ),
      })),
    add: async (content) => {
      const newAnecdote = await anecdoteService.create(content)
      set((state) => ({ anecdotes: sort([...state.anecdotes, newAnecdote]) }))
    },

    setFilter: (filter) =>
      set(() => ({
        filter,
      })),
  },
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions)
