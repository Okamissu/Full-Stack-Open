const LogoutButton = ({ setUser }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser')
    setUser(null)
  }

  return <button onClick={handleLogout}>Log out</button>
}

export default LogoutButton
