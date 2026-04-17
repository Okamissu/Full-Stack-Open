const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})

notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id)

    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

notesRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const user = await User.findById(body.userId)

    if (!user) {
      return response.status(400).json({ error: 'UserId missing or not valid' })
    }
    const note = new Note({
      content: body.content,
      important: body.important || false,
      user: user.__id,
    })

    const savedNote = await note.save()
    user.notes = [...user.notes, savedNote.__id]
    await user.save()

    response.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }
})

notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

notesRouter.put('/:id', (request, response, next) => {
  try {
    const { content, important } = request.body

    Note.findById(request.params.id).then((note) => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
  } catch (error) {
    next(error)
  }
})

module.exports = notesRouter
