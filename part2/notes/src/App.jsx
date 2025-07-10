import { useEffect, useState } from 'react'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch('http://localhost:3001/notes', {
        method: 'GET',
      })
      const data = await response.json()
      setNotes(data)
    }
    fetchNotes()
  }, [])

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    setNotes((prevNotes) => [...prevNotes, noteObject])
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll((prevShowAll) => !prevShowAll)}>
        {showAll ? 'Show important only' : 'Show all'}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          placeholder="a new note..."
          onChange={handleNoteChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App
