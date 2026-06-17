import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
  width: 300px;
`

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
      <Input
        value={newNote}
        placeholder="a new note..."
        onChange={handleNoteChange}
        minLength={5}
        id="newNote"
      />

      <Button type="submit">Save</Button>
    </form>
  )
}

export default NoteForm
