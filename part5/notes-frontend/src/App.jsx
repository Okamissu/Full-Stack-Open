import { useEffect, useState } from 'react'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import Togglable from './components/Togglable'
import LogoutButton from './components/LogoutButton.jsx'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [notes, setNotes] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  return (
    <>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && (
        <Togglable buttonLabel="Log in">
          <LoginForm
            user={user}
            setUser={setUser}
            setErrorMessage={setErrorMessage}
          />
        </Togglable>
      )}

      {user && (
        <>
          <p>{user.name} logged in</p>
          <LogoutButton setUser={setUser} />
          <Togglable buttonLabel="New note">
            <NoteForm setNotes={setNotes} />
          </Togglable>
        </>
      )}

      <NoteList
        notes={notes}
        setNotes={setNotes}
        setErrorMessage={setErrorMessage}
      />

      <Footer />
    </>
  )
}

export default App
