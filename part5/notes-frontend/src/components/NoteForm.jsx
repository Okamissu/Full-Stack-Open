import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')
  const navigate = useNavigate()

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()

    createNote({
      content: newNote,
      important: true,
    })

    navigate('/notes')
    setNewNote('')
  }

  return (
    <form onSubmit={addNote}>
      <h2>Create a new note</h2>
      <label htmlFor="newNote">Content</label>
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
