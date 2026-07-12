import { useParams } from 'react-router-dom'
import { useBlogs, useBlogActions } from '../hooks/useBlog'
import NotFound from './NotFound'
import { BlogCard, BlogTitle, BlogButtons, BlogButton } from '../styles'

const BlogDetails = ({ user }) => {
  const { id } = useParams()

  const blogs = useBlogs()
  const { likeBlog, deleteBlog } = useBlogActions()

  const blog = blogs.find((b) => b.id === id)

  if (!blog) return <NotFound />

  const canDelete = user && blog.user && blog.user.id === user.id

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
            <BlogButton onClick={() => deleteBlog(blog)}>🗑️ Remove</BlogButton>
          )}
        </BlogButtons>
      )}
    </BlogCard>
  )
}

export default BlogDetails
