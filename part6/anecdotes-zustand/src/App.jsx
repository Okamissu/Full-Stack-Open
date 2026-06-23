import './index.css'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteFilter from './components/AnecdoteFilter'

const App = () => {
  return (
    <main className="max-w-3xl mx-auto p-4 space-y-3">
      <h1>Anecdotes</h1>
      <AnecdoteFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </main>
  )
}

export default App
