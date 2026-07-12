import { Link } from 'react-router-dom'
import { Nav, NavLink } from '../styles'
import LogoutButton from './LogoutButton'

const NavBar = ({ user, handleLogout }) => {
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
