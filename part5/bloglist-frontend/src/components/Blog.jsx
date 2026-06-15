import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <li className="blog">
      <div className="preview">
        <Link to={`/blogs/${blog.id}`}>
          <b>{blog.title}</b> - {blog.author}
        </Link>
      </div>
    </li>
  )
}
export default Blog
