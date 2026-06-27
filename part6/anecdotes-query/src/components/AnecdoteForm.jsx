import useAnecdotes from '../hooks/useAnecdotes'
import useNotify from '../hooks/useNotify'

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes()
  const { sendNotification } = useNotify()

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    addAnecdote(content)
    sendNotification(`Added: ${content}`)
    event.target.reset()
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
