import { useState } from 'react'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [notes, setNotes] = useState([])
  const [user, setUser] = useState(null)

  return (
    <>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      <LoginForm
        user={user}
        setUser={setUser}
        setErrorMessage={setErrorMessage}
      />
      {user && <div>{<NoteForm setNotes={setNotes} />}</div>}

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
