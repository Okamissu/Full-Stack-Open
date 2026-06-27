const baseUrl = 'http://localhost:3001/anecdotes'

export const getNotes = async () => {
  const response = await fetch('http://localhost:3001/anecdotes')

  if (!response.ok) {
    throw new Error('Failed to fetch notes')
  }

  return response.json()
}
