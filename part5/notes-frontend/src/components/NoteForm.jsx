import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()

    createNote({
      content: newNote,
      important: true,
    })

    setNewNote('')
  }

  return (
    <form onSubmit={addNote}>
      <label htmlFor="newNote">Content:</label>
      <input
        value={newNote}
        placeholder="a new note..."
        onChange={handleNoteChange}
        minLength={5}
        id="newNote"
      />

      <button type="submit">Save</button>
    </form>
  )
}

export default NoteForm
