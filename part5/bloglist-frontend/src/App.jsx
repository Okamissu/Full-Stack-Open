import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    type: 'info',
    message: 'test',
  })

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification(null)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [notification])

  const handleLike = async (blog) => {
    try {
      const updatedBlog = await blogService.update({
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      })

      setBlogs((blogs) =>
        blogs.map((b) =>
          b.id === blog.id ? { ...updatedBlog, user: blog.user } : b,
        ),
      )
    } catch {
      setNotification({
        type: 'error',
        message: "Couldn't handle the like request",
      })
    }
  }

  const handleDelete = async (blog) => {
    const confirmed = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`,
    )

    if (!confirmed) return

    try {
      await blogService.remove(blog.id)

      setBlogs((blogs) => blogs.filter((b) => b.id !== blog.id))

      setNotification({
        type: 'info',
        message: `Removed blog: ${blog.title} by ${blog.author}`,
      })
    } catch {
      setNotification({
        type: 'error',
        message: "Couldn't remove the blog",
      })
    }
  }

  const createBlog = async (newBlog) => {
    try {
      const response = await blogService.create(newBlog)

      setBlogs((prevBlogs) => [
        ...prevBlogs,
        {
          ...response,
          user: user,
        },
      ])

      setNotification({
        type: 'info',
        message: 'Blog added',
      })

      blogFormRef.current.toggleVisibility()
    } catch {
      setNotification({
        type: 'error',
        message: 'Missing or incorrect blog data',
      })
    }
  }

  return (
    <>
      <h1>Blogs</h1>
      <Notification notification={notification} />

      <LoginForm
        user={user}
        setUser={setUser}
        setNotification={setNotification}
      />

      {user && (
        <Togglable buttonLabel="Create a new blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
      )}

      <BlogList
        blogs={blogs}
        setBlogs={setBlogs}
        setNotification={setNotification}
        handleLike={handleLike}
        handleDelete={handleDelete}
        user={user}
      />
    </>
  )
}
export default App
