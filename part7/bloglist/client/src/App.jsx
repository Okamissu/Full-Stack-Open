import { useEffect } from 'react'
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
import { Route, Routes, Link, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './components/NotFound'
import { useBlogActions } from './hooks/useBlog'
import { useUser, useUserActions } from './hooks/useUser'

const App = () => {
  const user = useUser()

  const { setUser } = useUserActions()

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
  }, [setUser])

  return (
    <>
      <NavBar />

      <main className="app">
        <ErrorBoundary>
          <Notification />
          <Routes>
            <Route
              path="/login"
              element={user ? <Navigate to="/" replace /> : <LoginForm />}
            />

            <Route
              path="/create"
              element={user ? <BlogForm /> : <Navigate to="/login" replace />}
            />

            <Route path="/" element={<BlogList />} />
            <Route path="/blogs" element={<Navigate to="/" />}></Route>

            <Route path="/blogs/:id" element={<BlogDetails />} />

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </>
  )
}
export default App
