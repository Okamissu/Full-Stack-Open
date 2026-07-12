import { useParams } from 'react-router-dom'
import { useBlogs, useBlogActions } from '../hooks/useBlog'
import { useUser } from '../hooks/useUser'
import { useNavigate } from 'react-router-dom'
import NotFound from './NotFound'
import { BlogCard, BlogTitle, BlogButtons, BlogButton } from '../styles'

const BlogDetails = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const blogs = useBlogs()
  const { likeBlog, deleteBlog } = useBlogActions()
  const user = useUser()

  const blog = blogs.find((b) => b.id === id)

  if (!blog) return <NotFound />

  const canDelete = user && blog.user && blog.user.id === user.id

  const handleDelete = async (blog) => {
    const confirmed = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`,
    )
    if (!confirmed) return
    try {
      deleteBlog(blog)
      navigate('/')
    } catch {
      // Notification is already shown by the store,
      // so nothing else is required here.
    }
  }

  return (
    <BlogCard>
      <BlogTitle>{blog.title}</BlogTitle>

      <p>
        <strong>Author:</strong> {blog.author}
      </p>
      <p>
        <strong>Likes:</strong> {blog.likes}
      </p>
      <p>
        <strong>Added by:</strong> {blog.user.username}
      </p>
      <p>
        <strong>URL:</strong> <a href={blog.url}>{blog.url}</a>
      </p>

      {!!user && (
        <BlogButtons>
          <BlogButton onClick={() => likeBlog(blog)}>💜 Like</BlogButton>

          {canDelete && (
            <BlogButton onClick={() => handleDelete(blog)}>
              🗑️ Remove
            </BlogButton>
          )}
        </BlogButtons>
      )}
    </BlogCard>
  )
}

export default BlogDetails
