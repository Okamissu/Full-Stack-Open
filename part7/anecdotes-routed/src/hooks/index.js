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
  const [anecdotes, setAnegdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then((data) => setAnegdotes(data))
  }, [])

  const addAnecdote = (newAnecdote) => {
    anecdoteService
      .createNew(newAnecdote)
      .then((result) => setAnegdotes((prev) => [...prev, result]))
  }

  return { anecdotes, addAnecdote }
}
