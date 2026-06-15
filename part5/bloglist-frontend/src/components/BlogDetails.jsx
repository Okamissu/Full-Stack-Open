const BlogDetails = ({ blog, handleLike, handleDelete, user }) => {
  if (!blog) {
    return null
  }

  const canDelete = user && blog.user && blog.user.id === user.id

  return (
    <div className="blog details">
      <div className="preview">
        <h3>{blog.title}</h3>
      </div>

      <div className="details">
        <p>
          <span className="label">Author:</span> {blog.author}
        </p>
        <p>
          <span className="label">Likes:</span> {blog.likes}
        </p>
        <p>
          <span className="label">Added by:</span> {blog.user.username}
        </p>
        <p>
          <span className="label">URL:</span> <a href={blog.url}>{blog.url}</a>
        </p>
        {!!user && (
          <div className="buttons">
            <button onClick={() => handleLike(blog)}>💜 Like</button>
            {canDelete && (
              <button onClick={() => handleDelete(blog)}>🗑️ Remove</button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
export default BlogDetails
