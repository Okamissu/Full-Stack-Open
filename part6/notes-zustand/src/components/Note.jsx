import { useNoteActions } from '../store'

const Note = ({ note }) => {
  const { toggleImportance } = useNoteActions()

  return (
    <li className="flex items-center justify-between py-3 px-3 rounded-sm bg-slate-50 border shadow-sm border-slate-200">
      {note.important ? <strong>{note.content}</strong> : note.content}

      <button
        onClick={() => toggleImportance(note.id)}
        className="bg-slate-200 border border-slate-300 py-1 px-2  shadow-sm rounded-md cursor-pointer transition-colors hover:bg-slate-300"
      >
        {note.important ? 'Set unimportant' : 'Set important'}
      </button>
    </li>
  )
}

export default Note
