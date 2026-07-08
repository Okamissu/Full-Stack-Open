import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { Form, Input, Button, Label } from '../styles'

const LoginForm = ({ setUser, setNotification }) => {
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

  return (
    <Form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        <Label htmlFor="username">
          Username
          <Input
            type="text"
            value={username}
            id="username"
            onChange={({ target }) => {
              setUsername(target.value)
            }}
          />
        </Label>
      </div>
      <div>
        <Label htmlFor="password">
          Password
          <Input
            type="password"
            value={password}
            id="password"
            onChange={({ target }) => {
              setPassword(target.value)
            }}
          />
        </Label>
      </div>
      <Button type="submit">Log in</Button>
    </Form>
  )
}

export default LoginForm
