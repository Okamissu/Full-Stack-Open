import { useParams, useNavigate } from 'react-router-dom'

const Note = ({ notes, toggleImportance, deleteNote }) => {
  const id = useParams().id
  const navigate = useNavigate()
  const note = notes.find((n) => n.id === id)
  const label = note.important ? 'Set not important' : 'Set important'

  const handleDelete = () => {
    if (window.confirm(`Delete note ${note.content}`)) {
      deleteNote(id)
      navigate('/notes')
    }
  }

  return (
    <li className="note">
      <p>{note.content}</p>
      <button onClick={() => toggleImportance(id)}>{label}</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  )
}

export default Note
