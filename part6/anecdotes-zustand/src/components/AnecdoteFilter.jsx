import { useAnecdoteActions, useFilter } from '../store'

const AnecdoteFilter = () => {
  const { setFilter } = useAnecdoteActions()
  const filter = useFilter()

  return (
    <>
      <label htmlFor="anecdote-filter" className="sr-only">
        Filter anecdotes
      </label>
      <input
        value={filter}
        id="anecdote-filter"
        placeholder="Search anecdotes..."
        onChange={(e) => setFilter(e.target.value)}
      />
    </>
  )
}

export default AnecdoteFilter
