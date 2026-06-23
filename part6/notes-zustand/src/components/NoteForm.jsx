import { useNoteActions } from '../store'
import noteService from '../services/notes'

const NoteForm = () => {
  const { add } = useNoteActions()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    const newNote = await noteService.createNew(content)

    add(newNote)
    event.target.reset()
  }

  return (
    <form
      className="bg-slate-100 p-4 rounded-lg border border-slate-300 shadow-sm w-fit"
      onSubmit={addNote}
    >
      <input
        className="bg-white border border-slate-300 shadow px-3 py-2 rounded-l-sm"
        name="note"
      />
      <button
        className="bg-slate-300 border border-slate-300 p-2 shadow rounded-r-sm cursor-pointer transition-colors hover:bg-slate-400"
        type="submit"
      >
        Add
      </button>
    </form>
  )
}

export default NoteForm
