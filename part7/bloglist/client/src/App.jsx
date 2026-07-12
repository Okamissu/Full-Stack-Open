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
import { Route, Routes, Link, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './components/NotFound'
import {
  useNotification,
  useNotificationActions,
} from './hooks/useNotification'
import { useBlogActions } from './hooks/useBlog'

const App = () => {
  const [user, setUser] = useState(null)
  const notification = useNotification()
  const { setNotification, resetNotification } = useNotificationActions()

  const navigate = useNavigate()

  const { initializeBlogs } = useBlogActions()

  useEffect(() => {
    initializeBlogs()
  }, [initializeBlogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (!notification.type && !notification.message) return

    const timeout = setTimeout(() => {
      resetNotification()
    }, 5000)

    return () => clearTimeout(timeout)
  }, [notification, resetNotification])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setNotification('info', 'Logged out')
    navigate('/')
  }

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
                  <LoginForm setUser={setUser} />
                )
              }
            />

            <Route
              path="/create"
              element={user ? <BlogForm /> : <Navigate to="/login" replace />}
            />

            <Route path="/" element={<BlogList />} />
            <Route path="/blogs" element={<Navigate to="/" />}></Route>

            <Route path="/blogs/:id" element={<BlogDetails user={user} />} />

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </>
  )
}
export default App
