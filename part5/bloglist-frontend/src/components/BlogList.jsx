import { useEffect, useMemo } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'

const BlogList = ({ blogs, setBlogs }) => {
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [setBlogs])

  const sortedBlogs = useMemo(() => {
    return [...blogs].sort((a, b) => b.likes - a.likes)
  }, [blogs])

  return (
    <>
      <h2>Bloglist</h2>
      <ul>
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </>
  )
}

export default BlogList
