import { NavButton } from '../styles'

const LogoutButton = ({ handleLogout, user }) => {
  return <NavButton onClick={handleLogout}>Log out - {user.username}</NavButton>
}

export default LogoutButton
