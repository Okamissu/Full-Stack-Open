const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const helper = require('./test_helper')
const Note = require('../models/note')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await Note.deleteMany({})
  await Note.insertMany(helper.initialNotes)
})

describe('when there is initially some notes saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')
    assert.strictEqual(response.body.length, helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map((r) => r.content)
    assert(contents.includes('HTML is easy'))
  })
})

describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToView = notesAtStart[0]

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultNote.body, noteToView)
  })

  test('fails with status code 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api.get(`/api/notes/${validNonexistingId}`).expect(404)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3467'

    await api.get(`/api/notes/${invalidId}`).expect(400)
  })
})

describe('addition of a new note', () => {
  test('succeeds with valid data', async () => {
    await User.deleteMany()
    await helper.createRootUser()
    const users = await helper.usersInDb()

    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
      userId: users[0].id,
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201) // Created
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.notesInDb()
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

    const contents = notesAtEnd.map((n) => n.content)
    assert(contents.includes('async/await simplifies making async calls'))
  })

  test('fails with status code 400 with invalid data', async () => {
    const newNote = {
      important: false,
    }

    await api.post('/api/notes').send(newNote).expect(400) // Bad request

    const notesAtEnd = await helper.notesInDb()

    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
  })
})

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204) // no content

    const notesAtEnd = await helper.notesInDb()

    const ids = notesAtEnd.map((n) => n.id)
    assert(!ids.includes(noteToDelete.id))

    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany()
    await helper.createRootUser()
  })

  test('creation succeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'okamisu',
      name: 'Kamilo Kobylo',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'supiuser',
      password: 'sayageto',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
