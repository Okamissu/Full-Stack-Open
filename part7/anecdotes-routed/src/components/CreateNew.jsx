import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({ addAnecdote }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({ content, author, info, votes: 0 })
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label>
          content
          <input name="content" {...content} />
        </label>
        <label>
          author
          <input name="author" {...author} />
        </label>
        <label>
          url for more info
          <input name="info" {...info} />
        </label>
        <button style={{ maxWidth: 'fit-content' }}>create</button>
      </form>
    </div>
  )
}

export default CreateNew
