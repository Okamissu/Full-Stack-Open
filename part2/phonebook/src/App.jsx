import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '123456789' },
    { name: 'Harto Mamarti', phone: '333444555' },
    { name: 'Ben Hulajnoga', phone: '321123321' },
    { name: 'Piri Kebi', phone: '777888999' },
  ])
  const [newPerson, setNewPerson] = useState({ name: '', phone: '' })
  const [searchName, setSearchName] = useState('')

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

  const currentSearch = searchName
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchName.toLowerCase())
      )
    : persons

  const personsToShow = currentSearch.map((person) => (
    <li key={`${person.name}-${person.phone}`}>
      {person.name} - {person.phone}
    </li>
  ))

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        Search by name:{' '}
        <input
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        ></input>{' '}
      </div>
      <h2>Add a new person</h2>
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
