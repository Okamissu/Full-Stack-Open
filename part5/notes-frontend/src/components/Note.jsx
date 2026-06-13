import { useParams, useNavigate } from 'react-router-dom'

const Note = ({ note, toggleImportance, deleteNote }) => {
  const id = useParams().id
  const navigate = useNavigate()

  if (!note) {
    return null
  }

  const handleDelete = () => {
    if (window.confirm(`Delete note ${note.content}`)) {
      deleteNote(id)
      navigate('/notes')
    }
  }

  const label = note.important ? 'Set not important' : 'Set important'

  return (
    <li className="note">
      <p>{note.content}</p>
      <button onClick={() => toggleImportance(id)}>{label}</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  )
}

export default Note
