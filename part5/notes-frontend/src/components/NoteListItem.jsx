import { Link } from 'react-router-dom'

const NoteListItem = ({ note }) => {
  return (
    <li className="note">
      <Link to={`/notes/${note.id}`}>{note.content}</Link>
    </li>
  )
}

export default NoteListItem
