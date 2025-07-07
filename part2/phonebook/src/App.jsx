import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '123456789' },
  ])
  const [newPerson, setNewPerson] = useState({ name: '', phone: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedName = newPerson.name.trim()
    const isDuplicate = persons.some((person) => person.name === trimmedName)

    if (!isDuplicate) {
      setPersons([...persons, { ...newPerson, name: trimmedName }])
      setNewPerson({ name: '', phone: '' })
    } else {
      alert(`${trimmedName} is already in the phonebook`)
    }
  }

  const handleChange = (e) => {
    setNewPerson((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const personsToShow = persons.map((person) => (
    <li key={`${person.name}-${person.phone}`}>
      {person.name} - {person.phone}
    </li>
  ))

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={handleSubmit}>
        <div>
          name:{' '}
          <input
            autoFocus
            value={newPerson.name}
            placeholder="Chapello Roam"
            name="name"
            onChange={handleChange}
          />
          <br />
          number:{' '}
          <input
            value={newPerson.phone}
            placeholder="123567930"
            name="phone"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{personsToShow}</ul>
    </div>
  )
}

export default App
