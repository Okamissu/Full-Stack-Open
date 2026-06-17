import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogDetails from './components/BlogDetails'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import LogoutButton from './components/LogoutButton'
import './index.css'
import {
  Route,
  Routes,
  Link,
  useNavigate,
  Navigate,
  useMatch,
} from 'react-router-dom'
import NavBar from './components/NavBar'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    type: 'info',
    message: 'test',
  })

  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (!notification) return

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

      navigate('/')
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
    } catch {
      setNotification({
        type: 'error',
        message: 'Missing or incorrect blog data',
      })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setNotification({ type: 'info', message: 'Logged out' })
    navigate('/')
  }

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />

      <main className="app">
        <Notification notification={notification} />
        <Routes>
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <LoginForm
                  user={user}
                  setUser={setUser}
                  setNotification={setNotification}
                />
              )
            }
          />

          <Route
            path="/create"
            element={
              user ? (
                <BlogForm createBlog={createBlog} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/"
            element={<BlogList blogs={blogs} setBlogs={setBlogs} />}
          />
          <Route path="/blogs" element={<Navigate to="/" />}></Route>

          <Route
            path="/blogs/:id"
            element={
              <BlogDetails
                blog={blog}
                handleLike={handleLike}
                handleDelete={handleDelete}
                user={user}
              />
            }
          />
        </Routes>
      </main>
    </>
  )
}
export default App
