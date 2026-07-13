import { useMemo } from 'react'
import Blog from './Blog'

const BlogList = ({ blogs }) => {
  const sortedBlogs = useMemo(() => {
    return [...blogs].sort((a, b) => b.likes - a.likes)
  }, [blogs])

  return (
    <ul>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </ul>
  )
}

export default BlogList
