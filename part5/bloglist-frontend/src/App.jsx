import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      // setErrorMessage('wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h1>Bloglist</h1>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button>Log in</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h1>Bloglist</h1>

      <h2>blogs</h2>
      <p>{user.username} logged in</p>
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </div>
  )
}

export default App
