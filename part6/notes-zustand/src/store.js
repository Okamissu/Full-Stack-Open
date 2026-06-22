import { create } from 'zustand'

const useNoteStore = create((set) => ({
  notes: [
    {
      id: 1,
      content: 'Zustand is less complex than Redux',
      important: true,
    },
  ],
  actions: {
    add: (note) => set((state) => ({ notes: [...state.notes, note] })),
  },
}))

export const useNotes = () => useNoteStore((state) => state.notes)
export const useNoteActions = () => useNoteStore((state) => state.actions)
