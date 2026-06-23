import { create } from 'zustand'

const initialNotes = [
  {
    id: 1,
    content: 'Zustand is less complex than Redux',
    important: true,
  },
  {
    id: 2,
    content: 'React app benefits from custom hooks',
    important: false,
  },
  {
    id: 3,
    content: 'Remember to sleep well',
    important: true,
  },
]

const useNoteStore = create((set) => ({
  notes: initialNotes,
  filter: 'all',
  actions: {
    add: (note) => set((state) => ({ notes: [...state.notes, note] })),
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
