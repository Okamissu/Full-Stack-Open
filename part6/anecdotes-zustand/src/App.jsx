import { useAnecdoteActions, useAnecdotes } from './store'
import './index.css'

const App = () => {
  const anecdotes = useAnecdotes()

  const { vote } = useAnecdoteActions()

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
      <form className="card">
        <h2>Create new</h2>
        <div>
          <input type="text" />
        </div>
        <button>Create</button>
      </form>
    </div>
  )
}

export default App
