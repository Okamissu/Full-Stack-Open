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
      <input
        value={newNote}
        placeholder="a new note..."
        onChange={handleNoteChange}
        minLength={5}
      />
      <button type="submit">Save</button>
    </form>
  )
}

export default NoteForm
