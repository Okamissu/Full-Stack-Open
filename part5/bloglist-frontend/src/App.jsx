import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    type: 'info',
    message: 'test',
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }, [notification])

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
        <div>
          {<BlogForm setBlogs={setBlogs} setNotification={setNotification} />}
        </div>
      )}

      <BlogList blogs={blogs} setBlogs={setBlogs} />
    </>
  )
}

export default App
