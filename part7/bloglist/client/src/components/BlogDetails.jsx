import { BlogCard, BlogTitle, BlogButtons, BlogButton } from '../styles'
import useField from '../hooks/useField'
import NotFound from './NotFound'

const BlogDetails = ({ blog, handleLike, handleDelete, user, addComment }) => {
  const { reset: resetComment, ...comment } = useField('text')

  if (!blog) return <NotFound />

  const canDelete = user && blog.user && blog.user.id === user.id

  const handleSubmit = (event) => {
    event.preventDefault()

    addComment(blog.id, comment.value)

    resetComment()
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
          <BlogButton onClick={() => handleLike(blog)}>💜 Like</BlogButton>

          {canDelete && (
            <BlogButton onClick={() => handleDelete(blog)}>
              🗑️ Remove
            </BlogButton>
          )}
        </BlogButtons>
      )}

      <form onSubmit={handleSubmit}>
        <input {...comment} />
        <button type="submit">add comment</button>
      </form>

      <h3>Comments</h3>

      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </BlogCard>
  )
}

export default BlogDetails
