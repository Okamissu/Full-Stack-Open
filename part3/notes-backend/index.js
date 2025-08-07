require('dotenv').config()
const express = require('express')
const Note = require('./models/note')
const requestLogger = require('./utils/logger')

const app = express()

app.use(requestLogger)
app.use(express.json())
app.use(express.static('dist'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({})
    .then((notes) => {
      response.json(notes)
    })
    .catch((err) => {
      console.error('Error fetching notes:', err)
      response.status(500).send('Internal Server Error')
    })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then((note) => {
    response.json(note)
  })
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then((savedNote) => response.json(savedNote))
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  // notes = notes.filter((note) => note.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
