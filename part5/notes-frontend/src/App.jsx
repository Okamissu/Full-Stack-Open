import { useEffect, useState } from 'react'
import { Routes, Route, Link, Navigate, useMatch } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button } from '@mui/material'

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
  const [notification, setNotification] = useState(null)
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

  useEffect(() => {
    noteService.getAll().then((response) => setNotes(response || []))
  }, [setNotes])

  const createNote = (noteObject) => {
    noteService.create(noteObject).then((returnedNote) => {
      setNotes((prevNotes) => [...prevNotes, returnedNote])

      setNotification({
        text: `Note '${returnedNote.content}' added!`,
        type: 'success',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
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
        setNotification({
          text: `Note '${note.content}' was already removed from server`,
          type: 'error',
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const match = useMatch('/notes/:id')
  const note = match ? notes.find((note) => note.id === match.params.id) : null

  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="" sx={style}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/notes" sx={style}>
            Notes
          </Button>
          {user && (
            <Button color="inherit" component={Link} to="/create" sx={style}>
              New note
            </Button>
          )}
          {!user && (
            <Button color="inherit" component={Link} to="/login" sx={style}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Notification notification={notification} />
      <h1>Notes</h1>

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
              note={note}
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
              <LoginForm
                user={user}
                setUser={setUser}
                setNotification={setNotification}
              />
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
    </Container>
  )
}

export default App
