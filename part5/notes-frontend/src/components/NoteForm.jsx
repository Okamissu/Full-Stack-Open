import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'

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
      <TextField label="Content" value={newNote} onChange={handleNoteChange} />

      <Button
        type="submit"
        variant="contained"
        style={{ display: 'block', marginTop: 10 }}
      >
        Save
      </Button>
    </form>
  )
}

export default NoteForm
