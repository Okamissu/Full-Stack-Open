import { useAnecdoteActions } from '../store'

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions()

  const addAnecdote = (event) => {
    event.preventDefault()
    add(event.target.anecdote.value)
    event.target.reset()
  }

  return (
    <form className="card space-y-3" onSubmit={addAnecdote}>
      <h2>Create a new anecdote</h2>
      <div className="flex">
        <input
          type="text"
          name="anecdote"
          placeholder="Anecdote content..."
          className="rounded-r-none"
        />
        <button className="rounded-l-none">Create</button>
      </div>
    </form>
  )
}

export default AnecdoteForm
