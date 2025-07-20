const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

const generateId = () => {
  let id
  do {
    id = Math.floor(Math.random() * 1_000_000_000).toString()
  } while (persons.some((person) => person.id === id))
  return id
}

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number is missing' })
  } else if (persons.some((person) => person.name === body.name)) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)
  res.status(201).json(person)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find((person) => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).json({ error: `Person with id ${id} not found` })
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter((person) => person.id !== id)

  res.status(204).end()
})

app.get('/info', (req, res) => {
  const count = persons.length
  const date = new Date()
  res.send(`<p>Phonebook has info for ${count} people.</p><p>${date}</p>`)
})

app.use((req, res) => {
  res.status(404).json({ error: 'Unknown endpoint' })
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
