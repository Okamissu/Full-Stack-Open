import { useNoteActions, useNotes } from './store'

const App = () => {
  const notes = useNotes()
  const { add } = useNoteActions()

  const generateId = () => Number(Math.random() * 1000000).toFixed()

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value

    add({ id: generateId(), content, important: false })
    event.target.reset()
  }
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto p-6 text-slate-900 space-y-4">
        <h1 className="text-3xl font-bold">Notes</h1>
        <form
          className="bg-slate-100 p-4 rounded-lg border border-slate-300 shadow-sm w-fit"
          onSubmit={addNote}
        >
          <input
            className="bg-white border border-slate-300 shadow px-3 py-2 rounded-l-md"
            name="note"
          />
          <button
            className="bg-slate-300 border border-slate-300 p-2 shadow rounded-r-md cursor-pointer transition-colors hover:bg-slate-400"
            type="submit"
          >
            Add
          </button>
        </form>

        <ul className="list-disc p-6 bg-slate-100 list-inside rounded-lg border border-slate-300 shadow-sm space-y-1.5">
          {notes.map((note) => (
            <li key={note.id}>
              {note.important ? <strong>{note.content}</strong> : note.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default App
