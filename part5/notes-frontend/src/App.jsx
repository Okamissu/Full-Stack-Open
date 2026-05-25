import { useEffect, useRef, useState } from 'react'
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
  const noteFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const createNote = (noteObject) => {
    noteService.create(noteObject).then((returnedNote) => {
      setNotes((prevNotes) => [...prevNotes, returnedNote])
      noteFormRef.current.toggleVisibility()
    })
  }

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
          <Togglable buttonLabel="New note" ref={noteFormRef}>
            <NoteForm createNote={createNote} />
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
