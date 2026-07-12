import { Link, useNavigate } from 'react-router-dom'
import { Nav, NavLink } from '../styles'
import LogoutButton from './LogoutButton'
import { useUser, useUserActions } from '../hooks/useUser'
import { useNotificationActions } from '../hooks/useNotification'

const NavBar = () => {
  const user = useUser()
  const { setNotification } = useNotificationActions()
  const { setUser } = useUserActions()
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setNotification('info', 'Logged out')
    navigate('/')
  }

  return (
    <Nav>
      <h1>Blog List</h1>

      <NavLink to="/">Blogs</NavLink>
      {user && <NavLink to="/create">New Blog</NavLink>}
      {!user && <NavLink to="/login">Login</NavLink>}

      {user && <LogoutButton handleLogout={handleLogout} user={user} />}
    </Nav>
  )
}

export default NavBar
