import { useEffect } from 'react'
import useNotification from './hooks/useNotification'
import useBlogs from './hooks/useBlogs'
import useUser from './hooks/useUser'
import blogService from './services/blogs'
import persistentUser from './services/persistentUser'
import BlogDetails from './components/BlogDetails'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import UserDetails from './components/UserDetails'
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
import UserList from './components/UserList'

const App = () => {
  const [user, userDispatch] = useUser()
  const { dispatch } = useNotification()
  const navigate = useNavigate()

  useEffect(() => {
    const persistedUser = persistentUser.getUser()

    if (persistedUser) {
      userDispatch({
        type: 'SET_USER',
        payload: persistedUser,
      })

      blogService.setToken(persistedUser.token)
    }
  }, [userDispatch])

  const handleLogout = () => {
    persistentUser.removeUser()
    userDispatch({
      type: 'LOGOUT',
    })
    dispatch({ type: 'log_out' })
    navigate('/')
  }

  const { blogs, createBlog, likeBlog, deleteBlog, addComment } = useBlogs(
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
              element={user ? <Navigate to="/" replace /> : <LoginForm />}
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
                  addComment={addComment}
                />
              }
            />

            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetails />} />

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </>
  )
}

export default App
