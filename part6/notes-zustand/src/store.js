import { create } from 'zustand'
import noteService from './services/notes'

const useNoteStore = create((set) => ({
  notes: [],
  filter: 'all',
  actions: {
    initialize: async () => {
      const notes = await noteService.getAll()
      set(() => ({ notes }))
    },
    add: async (content) => {
      const newNote = await noteService.createNew(content)
      set((state) => ({ notes: [...state.notes, newNote] }))
    },
    toggleImportance: (id) =>
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === id ? { ...note, important: !note.important } : note,
        ),
      })),
    setFilter: (value) => set(() => ({ filter: value })),
  },
}))

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
