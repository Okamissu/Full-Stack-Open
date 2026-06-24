import { useAnecdotes, useFilter, useAnecdoteActions } from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const filter = useFilter()

  const { vote, remove } = useAnecdoteActions()

  const visibleAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <div className="space-y-3">
      {visibleAnecdotes.map((anecdote) => (
        <div className="card" key={anecdote.id}>
          <p className="leading-relaxed">{anecdote.content}</p>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {anecdote.votes} votes
            </span>

            <div className="space-x-2">
              {anecdote.votes === 0 && (
                <button onClick={() => remove(anecdote.id)}>Delete</button>
              )}
              <button onClick={() => vote(anecdote.id).then()}>Vote</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
