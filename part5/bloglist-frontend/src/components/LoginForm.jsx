import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ user, setUser, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setNotification({ type: 'error', message: 'Wrong credentials' })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setNotification({ type: 'info', message: 'Logged out' })
  }

  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          <label htmlFor="username">
            Username
            <input
              type="text"
              value={username}
              id="username"
              onChange={({ target }) => {
                setUsername(target.value)
              }}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password
            <input
              type="password"
              value={password}
              id="password"
              onChange={({ target }) => {
                setPassword(target.value)
              }}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    )
  } else {
    return (
      <>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Log out</button>
      </>
    )
  }
}

export default LoginForm
