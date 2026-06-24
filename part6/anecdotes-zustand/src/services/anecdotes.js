const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) throw new Error('Failed to fetch notes')

  const data = await response.json()
  return data
}

export default { getAll }
