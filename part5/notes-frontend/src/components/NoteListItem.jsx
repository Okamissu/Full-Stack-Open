import { Link } from 'react-router-dom'
import { TableRow, TableCell } from '@mui/material'

const NoteListItem = ({ note }) => {
  return (
    <TableRow>
      <TableCell>
        <Link to={`/notes/${note.id}`}>{note.content}</Link>
      </TableCell>
      <TableCell>{note?.user?.username ?? '-'}</TableCell>
      <TableCell>{note.important ? 'yes' : ''}</TableCell>
    </TableRow>
  )
}

export default NoteListItem
