import { BlogCard, BlogTitle, BlogButtons, BlogButton } from '../styles'

const BlogDetails = ({ blog, handleLike, handleDelete, user }) => {
  if (!blog) return null

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
          <BlogButton onClick={() => handleLike(blog)}>💜 Like</BlogButton>

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
