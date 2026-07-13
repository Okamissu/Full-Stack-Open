import { useState, useEffect } from 'react'
import useNotification from './hooks/useNotification'
import useBlogs from './hooks/useBlogs'
import blogService from './services/blogs'
import BlogDetails from './components/BlogDetails'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import './index.css'
import {
  Route,
  Routes,
  useNavigate,
  Navigate,
  useMatch,
} from 'react-router-dom'
import NavBar from './components/NavBar'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './components/NotFound'

const App = () => {
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    dispatch({ type: 'log_out' })
    navigate('/')
  }

  const { blogs, createBlog, likeBlog, deleteBlog } = useBlogs(
    dispatch,
    navigate,
  )

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

            <Route path="/" element={<BlogList blogs={blogs} />} />
            <Route path="/blogs" element={<Navigate to="/" />}></Route>

            <Route
              path="/blogs/:id"
              element={
                <BlogDetails
                  blog={blog}
                  handleLike={likeBlog}
                  handleDelete={deleteBlog}
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
