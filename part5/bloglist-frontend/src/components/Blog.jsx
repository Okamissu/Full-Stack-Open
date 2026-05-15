const Blog = ({ blog }) => (
  <li>
    <a href={blog.url}>{blog.title}</a> - by: {blog.author}
  </li>
)

export default Blog
