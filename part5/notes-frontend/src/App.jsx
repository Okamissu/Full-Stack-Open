import { useEffect, useRef, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom'

import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import Togglable from './components/Togglable'
import LogoutButton from './components/LogoutButton.jsx'
import Home from './components/Home'
import Note from './components/Note.jsx'

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

  useEffect(() => {
    noteService.getAll().then((response) => setNotes(response || []))
  }, [setNotes])

  const createNote = (noteObject) => {
    noteService.create(noteObject).then((returnedNote) => {
      setNotes((prevNotes) => [...prevNotes, returnedNote])

      if (noteFormRef.current) {
        noteFormRef.current.toggleVisibility()
      }
    })
  }

  const deleteNote = (id) => {
    noteService.remove(id).then(() => {
      setNotes(notes.filter((n) => n.id !== id))
    })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((response) =>
        setNotes(notes.map((note) => (note.id === id ? response : note))),
      )
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`,
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  return (
    <Router>
      <main className="app">
        <h1>Notes</h1>

        <Notification message={errorMessage} />

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/notes">Notes</Link>
          {user && <Link to="/create">New note</Link>}
          {!user && <Link to="/login">Login</Link>}
        </nav>

        {user && (
          <div className="user-bar">
            <LogoutButton setUser={setUser} />
            <span>{user.name} logged in</span>
          </div>
        )}

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/notes" element={<NoteList notes={notes} />} />

          <Route
            path="/notes/:id"
            element={
              <Note
                notes={notes}
                toggleImportance={toggleImportanceOf}
                deleteNote={deleteNote}
              />
            }
          />

          <Route
            path="/login"
            element={
              user ? (
                <Navigate replace to="/notes" />
              ) : (
                <Togglable buttonLabel="Log in">
                  <LoginForm
                    user={user}
                    setUser={setUser}
                    setErrorMessage={setErrorMessage}
                  />
                </Togglable>
              )
            }
          />

          <Route
            path="/create"
            element={
              user ? (
                <NoteForm createNote={createNote} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
        </Routes>

        <Footer />
      </main>
    </Router>
  )
}

export default App
