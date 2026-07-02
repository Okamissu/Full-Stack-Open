import { useAnecdotes } from '../hooks'

const AnecdoteList = () => {
  const { anecdotes, removeAnecdote } = useAnecdotes()

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            {anecdote.content}{' '}
            <button onClick={() => removeAnecdote(anecdote.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AnecdoteList
