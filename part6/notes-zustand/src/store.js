import { create } from 'zustand'
import noteService from './services/notes'

const logger = (config) => (set, get, api) => {
  return config(
    (...args) => {
      console.log('prev state', get())
      set(...args)
      console.log('next state', get())
    },
    get,
    api,
  )
}

const useNoteStore = create(
  logger((set, get) => ({
    notes: [],
    filter: '',
    actions: {
      add: async (content) => {
        const newNote = await noteService.createNew(content)
        set((state) => ({ notes: [...state.notes, newNote] }))
      },
      toggleImportance: async (id) => {
        try {
          const note = get().notes.find((n) => n.id === id)

          const updated = await noteService.update(id, {
            ...note,
            important: !note.important,
          })

          set((state) => ({
            notes: state.notes.map((n) => (n.id === id ? updated : n)),
          }))
        } catch (error) {
          console.error(error)
        }
      },
      setFilter: (value) => set(() => ({ filter: value })),
      initialize: async () => {
        const notes = await noteService.getAll()
        set(() => ({ notes }))
      },
    },
  })),
)

export const useNotes = () => {
  const notes = useNoteStore((state) => state.notes)
  const filter = useNoteStore((state) => state.filter)

  return notes.filter((note) => {
    if (filter === 'important') return note.important
    if (filter === 'nonimportant') return !note.important
    return true
  })
}

export const useNoteActions = () => useNoteStore((state) => state.actions)
