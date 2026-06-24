import { describe, test, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/notes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
  },
}))

import noteService from './services/notes'
import useNoteStore, { useNoteActions, useNotes } from './store'

beforeEach(() => {
  useNoteStore.setState({ notes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useNoteActions', () => {
  test('initialize loads notes from service', async () => {
    const mockNotes = [{ id: 1, content: 'Test', important: false }]
    noteService.getAll.mockResolvedValue(mockNotes)

    const { result } = renderHook(() => useNoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: notesResult } = renderHook(() => useNotes())

    expect(notesResult.current).toEqual(mockNotes)
  })

  test('add appends a new note', async () => {
    const newNote = { id: 2, content: 'New note', important: false }
    noteService.createNew.mockResolvedValue(newNote)

    const { result } = renderHook(() => useNoteActions())

    await act(async () => {
      await result.current.add('New note')
    })

    const { result: notesResult } = renderHook(() => useNotes())
    expect(notesResult.current).toContainEqual(newNote)
  })

  test('toggleImportance flips important flag', async () => {
    const note = { id: 1, content: 'Test', important: false }

    useNoteStore.setState({ notes: [note] })
    noteService.update.mockResolvedValue({ ...note, important: true })

    const { result } = renderHook(() => useNoteActions())

    await act(async () => {
      await result.current.toggleImportance(1)
    })

    const { result: notesResult } = renderHook(() => useNotes())
    expect(notesResult.current[0].important).toBe(true)
  })
})

describe('useNotes filtering', () => {
  const notes = [
    { id: 1, content: 'A', important: true },
    { id: 2, content: 'B', important: false },
  ]

  beforeEach(() => {
    useNoteStore.setState({ notes })
  })

  test('returns all notes when filter is empty', () => {
    const { result } = renderHook(() => useNotes())
    expect(result.current).toEqual(notes)
  })

  test('returns only important notes when filter is "important"', () => {
    useNoteStore.setState({ filter: 'important' })
    const { result } = renderHook(() => useNotes())
    expect(result.current).toEqual([notes[0]])
  })

  test('returns only non-important notes when filter is "nonimportant"', () => {
    useNoteStore.setState({ filter: 'nonimportant' })
    const { result } = renderHook(() => useNotes())
    expect(result.current).toEqual([notes[1]])
  })
})
