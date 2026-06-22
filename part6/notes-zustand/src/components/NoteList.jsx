import { useNotes } from '../store'
import Note from './Note'

const NoteList = () => {
  const notes = useNotes()

  return (
    <ul className="list-disc p-6 bg-slate-100 list-inside rounded-lg border border-slate-300 shadow-sm space-y-1.5">
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </ul>
  )
}

export default NoteList
