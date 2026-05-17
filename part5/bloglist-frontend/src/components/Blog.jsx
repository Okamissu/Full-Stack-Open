import { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
  const [visible, setVisible] = useState(false)

  return (
    <li>
      <p>
        <b>{blog.title}</b> - {blog.author}
      </p>

      <button onClick={() => setVisible((prev) => !prev)}>
        {visible ? 'Hide' : 'Show'}
      </button>

      {visible && (
        <div>
          <a href={blog.url}>{blog.url}</a>
          <p>Likes: {blog.likes}</p>
          <p>Added by: {blog.user.username}</p>
          <button onClick={() => handleLike(blog)}>💜</button>
        </div>
      )}
    </li>
  )
}
export default Blog
