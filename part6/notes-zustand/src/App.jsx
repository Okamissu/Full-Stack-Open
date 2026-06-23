import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import VisibilityFilter from './components/VisibilityFilter'
import { useEffect } from 'react'
import { useNoteActions } from './store'

const App = () => {
  const { initialize } = useNoteActions()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto p-6 text-slate-900 space-y-4">
        <h1 className="text-3xl font-bold">Notes</h1>
        <NoteForm />
        <VisibilityFilter />
        <NoteList />
      </div>
    </div>
  )
}
export default App
