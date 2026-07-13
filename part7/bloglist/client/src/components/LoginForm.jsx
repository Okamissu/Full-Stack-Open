import useNotification from '../hooks/useNotification'
import useField from '../hooks/useField'
import persistentUser from '../services/persistentUser'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { Form, Input, Button, Label } from '../styles'
import useUser from '../hooks/useUser'

const LoginForm = () => {
  const { reset: resetUsername, ...username } = useField('text')

  const { reset: resetPassword, ...password } = useField('password')
  const { dispatch } = useNotification()
  const [, userDispatch] = useUser()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })

      persistentUser.saveUser(user)
      blogService.setToken(user.token)

      userDispatch({
        type: 'SET_USER',
        payload: user,
      })
      resetUsername()
      resetPassword()
    } catch {
      dispatch({ type: 'wrong_credentials' })
    }
  }

  return (
    <Form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        <Label>
          Username
          <Input name="username" autoComplete="username" {...username} />
        </Label>
      </div>
      <div>
        <Label>
          Password
          <Input
            name="password"
            autoComplete="current-password"
            {...password}
          />
        </Label>
      </div>
      <Button type="submit">Log in</Button>
    </Form>
  )
}

export default LoginForm
