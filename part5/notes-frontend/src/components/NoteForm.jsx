import { useState } from 'react'
import noteService from '../services/notes'

const NoteForm = ({ setNotes, toggleVisibility }) => {
  const [newNote, setNewNote] = useState('')
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: true,
    }

    noteService
      .create(noteObject)
      .then((response) => setNotes((prevNotes) => [...prevNotes, response]))
    setNewNote('')
    toggleVisibility()
  }

  return (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        placeholder="a new note..."
        onChange={handleNoteChange}
      />
      <button type="submit">Save</button>
    </form>
  )
}

export default NoteForm
