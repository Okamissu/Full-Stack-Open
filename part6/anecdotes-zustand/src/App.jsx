import { useAnecdoteActions, useAnecdotes } from './store'
import './index.css'

const App = () => {
  const anecdotes = useAnecdotes()

  const { vote, add } = useAnecdoteActions()

  const addAnecdote = (event) => {
    event.preventDefault()
    add(event.target.anecdote.value)
    event.target.reset()
  }

  return (
    <div>
      <h1>Anecdotes</h1>
      {anecdotes.map((anecdote) => (
        <div className="card" key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            <button onClick={() => vote(anecdote.id)}>vote</button>
            {anecdote.votes} votes
          </div>
        </div>
      ))}
      <form className="card" onSubmit={addAnecdote}>
        <h2>Create new</h2>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button>Create</button>
      </form>
    </div>
  )
}

export default App
