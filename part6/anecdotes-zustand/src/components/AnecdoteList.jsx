import { useAnecdotes, useAnecdoteActions } from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()

  const { vote } = useAnecdoteActions()

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div className="card" key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            <button onClick={() => vote(anecdote.id)}>vote</button>
            {anecdote.votes} votes
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
