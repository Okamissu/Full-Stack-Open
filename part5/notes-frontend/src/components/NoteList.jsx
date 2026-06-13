import { useState } from 'react'
import NoteListItem from './NoteListItem'
const NoteList = ({ notes }) => {
  const [showAll, setShowAll] = useState(true)
  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <>
      <button onClick={() => setShowAll((prevShowAll) => !prevShowAll)}>
        {showAll ? 'Show important only' : 'Show all'}
      </button>
      {notesToShow && notesToShow.length > 0 ? (
        <ul>
          {notesToShow.map((note) => (
            <NoteListItem key={note.id} note={note} />
          ))}
        </ul>
      ) : (
        <p>There are no notes...</p>
      )}
    </>
  )
}

export default NoteList
