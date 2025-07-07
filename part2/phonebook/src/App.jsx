import { useState } from 'react'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

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
    const isDuplicate = persons.some(
      (person) => person.name.trim().toLowerCase() === trimmedName.toLowerCase()
    )
    
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
      <Search searchName={searchName} setSearchName={setSearchName} />
      <PersonForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newPerson={newPerson}
      />
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
