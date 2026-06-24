import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const sort = (anecdotes) => anecdotes.toSorted((a, b) => b.votes - a.votes)

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes: sort(anecdotes) }))
    },
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
    remove: async (id) => {
      try {
        const anecdote = get().anecdotes.find((a) => a.id === id)
        if (anecdote.votes > 0)
          throw new Error('Only ancedotes with 0 votes can be removed')

        await anecdoteService.remove(id)
        set((state) => ({
          anecdotes: state.anecdotes.filter((a) => a.id !== id),
        }))

        useNotificationStore
          .getState()
          .actions.setNotification(`Removed: "${anecdote.content}"`)
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

export default useAnecdoteStore
