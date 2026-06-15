import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target

    setNewBlog({
      ...newBlog,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    createBlog(newBlog)

    setNewBlog({
      title: '',
      author: '',
      url: '',
    })

    navigate('/')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Create a new blog</h2>
        <label>
          Title:
          <input
            name="title"
            type="text"
            placeholder="A blog title..."
            value={newBlog.title}
            onChange={handleChange}
          />
        </label>

        <label>
          Author:
          <input
            name="author"
            type="text"
            placeholder="Blog author"
            value={newBlog.author}
            onChange={handleChange}
          />
        </label>

        <label>
          URL:
          <input
            name="url"
            type="url"
            placeholder="https://www.example.com"
            value={newBlog.url}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default BlogForm
