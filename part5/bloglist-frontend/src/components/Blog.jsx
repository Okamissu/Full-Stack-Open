import { BlogCard, BlogLink } from '../styles'

const Blog = ({ blog }) => {
  return (
    <li>
      <BlogCard>
        <BlogLink to={`/blogs/${blog.id}`}>
          <b>{blog.title}</b> - {blog.author}
        </BlogLink>
      </BlogCard>
    </li>
  )
}

export default Blog
