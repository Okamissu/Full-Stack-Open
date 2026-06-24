import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const sort = (anecdotes) => anecdotes.toSorted((a, b) => b.votes - a.votes)

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: (notes) =>
      set(() => ({
        anecdotes: sort(notes),
      })),
    vote: async (id) => {
      try {
        const anecdote = get().anecdotes.find((a) => a.id === id)

        const updated = await anecdoteService.update(id, {
          ...anecdote,
          votes: anecdote.votes + 1,
        })

        set((state) => ({
          anecdotes: sort(
            state.anecdotes.map((a) => (a.id === id ? updated : a)),
          ),
        }))
      } catch (error) {
        console.error(error)
      }
    },
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
