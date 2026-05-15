import { useEffect } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'

const BlogList = ({ blogs, setBlogs }) => {
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [setBlogs])

  return (
    <>
      <h2>Bloglist</h2>
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </>
  )
}

export default BlogList
