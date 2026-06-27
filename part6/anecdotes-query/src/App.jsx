import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import useAnecdotes from './hooks/useAnecdotes'
import useNotify from './hooks/useNotify'

const App = () => {
  const { isPending, isError, anecdotes, voteAnecdote } = useAnecdotes()
  const { sendNotification } = useNotify()

  const handleVote = (anecdote) => {
    voteAnecdote(anecdote)
    sendNotification(`Voted: ${anecdote.content}`)
  }

  if (isPending) return <p>Loading data...</p>

  if (isError)
    return <div>Anecdote service not available due to problems in server</div>

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
