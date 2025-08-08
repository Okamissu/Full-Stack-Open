require('dotenv').config()

const express = require('express')
const Person = require('./models/person')
const morgan = require('morgan')
const errorHandler = require('./utils/middleware/errorHandler')

const app = express()

app.use(express.json())
app.use(
  morgan(`:method :url :status :res[content-length] - :response-time ms :body`)
)

app.use(express.static('dist'))

// Custom token for POST requestuest bodies
morgan.token('body', (request) => {
  return request.method === 'POST' ? JSON.stringify(request.body) : ''
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((people) => response.json(people))
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number is missing' })
  }
  // else if (persons.some((person) => person.name === body.name)) {
  //   return response.status(400).json({ error: 'name must be unique' })
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then((savedPerson) => response.status(201).json(savedPerson))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => response.json(person))
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => response.status(204).end())
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id)
    .then((person) => {
      if (!person) return response.status(404).end()

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => response.json(updatedPerson))
    })
    .catch((error) => next(error))
})

app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then((count) => {
      const date = new Date()
      response.send(
        `<p>Phonebook has info for ${count} people.</p><p>${date}</p>`
      )
    })
    .catch((error) => next(error))
})

app.use((request, response) => {
  response.status(404).json({ error: 'Unknown endpoint' })
})

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
