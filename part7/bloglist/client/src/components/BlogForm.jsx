import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Label } from '../styles'

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
      <Form onSubmit={handleSubmit}>
        <h2>Create a new blog</h2>
        <Label>
          Title:
          <Input
            name="title"
            type="text"
            placeholder="A blog title..."
            value={newBlog.title}
            onChange={handleChange}
          />
        </Label>

        <Label>
          Author:
          <Input
            name="author"
            type="text"
            placeholder="Blog author"
            value={newBlog.author}
            onChange={handleChange}
          />
        </Label>

        <Label>
          URL:
          <Input
            name="url"
            type="url"
            placeholder="https://www.example.com"
            value={newBlog.url}
            onChange={handleChange}
          />
        </Label>

        <Button type="submit">Create</Button>
      </Form>
    </>
  )
}

export default BlogForm
