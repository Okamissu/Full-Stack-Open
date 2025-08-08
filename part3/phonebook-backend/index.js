require('dotenv').config()

const express = require('express')
const Person = require('./models/person')
const morgan = require('morgan')

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

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then((people) => response.json(people))
    .catch((err) => {
      console.error('Error fetching people: ', err)
      response.status(500).send('Internal Server Error')
    })
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

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then((person) => response.json(person))
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

app.get('/info', (request, response) => {
  Person.countDocuments({}).then((count) => {
    const date = new Date()
    response.send(
      `<p>Phonebook has info for ${count} people.</p><p>${date}</p>`
    )
  })
})

app.use((request, response) => {
  response.status(404).json({ error: 'Unknown endpoint' })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
