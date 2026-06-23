import './index.css'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  return (
    <div>
      <h1>Anecdotes</h1>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
