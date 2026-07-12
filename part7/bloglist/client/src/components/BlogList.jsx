import { useMemo } from 'react'
import Blog from './Blog'
import { useBlogs } from '../hooks/useBlog'

const BlogList = () => {
  const blogs = useBlogs()

  const sortedBlogs = useMemo(() => {
    return [...blogs].sort((a, b) => b.likes - a.likes)
  }, [blogs])

  return (
    <>
      <ul>
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </>
  )
}

export default BlogList
