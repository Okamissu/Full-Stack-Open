import { useState } from 'react'
import NoteListItem from './NoteListItem'
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
const NoteList = ({ notes }) => {
  const [showAll, setShowAll] = useState(true)
  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <>
      <button onClick={() => setShowAll((prevShowAll) => !prevShowAll)}>
        {showAll ? 'Show important only' : 'Show all'}
      </button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Content</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Important?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notesToShow.map((note) => (
              <NoteListItem key={note.id} note={note} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default NoteList
