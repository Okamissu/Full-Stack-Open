import { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ user = null, setUser, setErrorMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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
    return <p>{user.name} logged in</p>
  }
}

export default LoginForm
