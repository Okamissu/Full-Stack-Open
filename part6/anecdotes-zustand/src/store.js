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

        useNotificationStore
          .getState()
          .actions.setNotification(`Voted for: "${updated.content}"`)
      } catch (error) {
        console.error(error)
        useNotificationStore
          .getState()
          .actions.setNotification(`Error: "${error}"`)
      }
    },
    add: async (content) => {
      try {
        const newAnecdote = await anecdoteService.create(content)
        set((state) => ({ anecdotes: sort([...state.anecdotes, newAnecdote]) }))
        useNotificationStore
          .getState()
          .actions.setNotification(`Created: "${newAnecdote.content}"`)
      } catch (error) {
        console.error(error)
        useNotificationStore
          .getState()
          .actions.setNotification(`Error: "${error}"`)
      }
    },
    setFilter: (filter) =>
      set(() => ({
        filter,
      })),
  },
}))

let timeoutId

const useNotificationStore = create((set) => ({
  notification: { message: '' },

  actions: {
    setNotification: (message) => {
      clearTimeout(timeoutId)

      set({
        notification: { message },
      })

      timeoutId = setTimeout(() => {
        set({
          notification: { message: '' },
        })
      }, 3000)
    },
  },
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions)

export const useFilter = () => useAnecdoteStore((state) => state.filter)

export const useNotification = () =>
  useNotificationStore((state) => state.notification)

export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions)
