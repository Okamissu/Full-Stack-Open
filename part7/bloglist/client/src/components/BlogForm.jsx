import useField from '../hooks/useField'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Label } from '../styles'

const BlogForm = ({ createBlog }) => {
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('url')

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    })

    resetTitle()
    resetAuthor()
    resetUrl()

    navigate('/')
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2>Create a new blog</h2>
        <Label>
          Title:
          <Input name="title" placeholder="A blog title..." {...title} />
        </Label>

        <Label>
          Author:
          <Input name="author" placeholder="Blog author" {...author} />
        </Label>

        <Label>
          URL:
          <Input
            name="url"
            placeholder="https://example.com"
            autoComplete="url"
            {...url}
          />
        </Label>

        <Button type="submit">Create</Button>
      </Form>
    </>
  )
}

export default BlogForm
