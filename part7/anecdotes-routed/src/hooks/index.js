import { useEffect, useState } from 'react'
import anecdoteService from '../services/anecdotes'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => setValue(event.target.value)

  const reset = () => setValue('')

  return {
    type,
    value,
    onChange,
    reset,
  }
}

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then((data) => setAnecdotes(data))
  }, [])

  const addAnecdote = (newAnecdote) => {
    anecdoteService
      .createNew(newAnecdote)
      .then((result) => setAnecdotes((prev) => [...prev, result]))
  }

  const removeAnecdote = (id) => {
    anecdoteService.remove(id)
    setAnecdotes((prevAnecdotes) => prevAnecdotes.filter((a) => a.id !== id))
  }

  return { anecdotes, addAnecdote, removeAnecdote }
}
