import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ setBlogs, setNotification }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setNewBlog({
      ...newBlog,
      [name]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await blogService.create(newBlog)

      setBlogs((prevBlogs) => [...prevBlogs, response])
      setNewBlog({
        title: '',
        author: '',
        url: '',
      })

      setNotification({
        type: 'info',
        message: 'Blog added',
      })
    } catch {
      setNotification({
        type: 'error',
        message: 'Missing or incorrect blog data',
      })
    }
  }

  return (
    <>
      <h2>Create new</h2>

      <form onSubmit={handleSubmit}>
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
