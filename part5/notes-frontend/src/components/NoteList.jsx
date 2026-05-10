import { useState, useEffect } from 'react'
import noteService from '../services/notes'
import Note from '../components/Note'

const NoteList = ({ notes, setNotes, setErrorMessage }) => {
  const [showAll, setShowAll] = useState(true)
  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  useEffect(() => {
    noteService.getAll().then((response) => setNotes(response || []))
  }, [setNotes])

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((response) =>
        setNotes(notes.map((note) => (note.id === id ? response : note))),
      )
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`,
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  return (
    <>
      <button onClick={() => setShowAll((prevShowAll) => !prevShowAll)}>
        {showAll ? 'Show important only' : 'Show all'}
      </button>
      {notesToShow && notesToShow.length > 0 ? (
        <ul>
          {notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </ul>
      ) : (
        <p>There are no notes...</p>
      )}
    </>
  )
}

export default NoteList
