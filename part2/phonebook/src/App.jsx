import { useEffect, useState } from 'react'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', phone: '' })
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/persons')
      setPersons(response.data)
    }
    fetchData()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedName = newPerson.name.trim()
    const isDuplicate = persons.some(
      (person) => person.name.trim().toLowerCase() === trimmedName.toLowerCase()
    )
    if (!isDuplicate) {
      setPersons([...persons, { ...newPerson, name: trimmedName }])
      setNewPerson({ name: '', number: '' })
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
    <li key={`${person.name}-${person.number}`}>
      {person.name} - {person.number}
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
