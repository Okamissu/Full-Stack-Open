import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({ addAnecdote }) => {
  const { reset: resetContent, ...content } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetInfo, ...info } = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({ content, author, info, votes: 0 })
    navigate('/')
  }

  const handleReset = () => {
    resetAuthor()
    resetContent()
    resetInfo()
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
        <div>
          <button>create</button>
          <button type="reset" onClick={handleReset}>
            reset
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateNew
