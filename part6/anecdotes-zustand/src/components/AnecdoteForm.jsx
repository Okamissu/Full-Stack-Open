import { useAnecdoteActions } from '../store'

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions()

  const addAnecdote = (event) => {
    event.preventDefault()
    add(event.target.anecdote.value)
    event.target.reset()
  }

  return (
    <form className="card" onSubmit={addAnecdote}>
      <h2>Create new</h2>
      <div>
        <input type="text" name="anecdote" />
      </div>
      <button>Create</button>
    </form>
  )
}

export default AnecdoteForm
