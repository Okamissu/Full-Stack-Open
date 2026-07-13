import { useState, useEffect } from 'react'
import useNotification from './hooks/useNotification'
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
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './components/NotFound'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const { dispatch } = useNotification()

  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
      dispatch({ type: 'like_error' })
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

      dispatch({
        type: 'remove_info',
        title: blog.title,
        author: blog.author,
      })

      navigate('/')
    } catch {
      dispatch({ type: 'remove_error' })
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

      dispatch({ type: 'add_info' })
    } catch {
      dispatch({ type: 'add_error' })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    dispatch({ type: 'log_out' })
    navigate('/')
  }

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />

      <main className="app">
        <ErrorBoundary>
          <Notification />
          <Routes>
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/" replace />
                ) : (
                  <LoginForm user={user} setUser={setUser} />
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

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </>
  )
}

export default App
