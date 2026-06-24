import { create } from 'zustand'

const asObject = (anecdote) => ({
  content: anecdote,
  votes: 0,
})

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
    add: (content) =>
      set((state) => ({
        anecdotes: sort([...state.anecdotes, asObject(content)]),
      })),
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
