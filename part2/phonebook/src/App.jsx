import { useEffect, useState } from 'react'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    phonebookService.getAll().then((response) => setPersons(response))
  }, [])

  const handleChange = (e) => {
    setNewPerson((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const trimmedName = newPerson.name.trim()
    const isDuplicate = persons.some(
      (person) => person.name.trim().toLowerCase() === trimmedName.toLowerCase()
    )

    if (!isDuplicate) {
      phonebookService
        .create(newPerson)
        .then((response) => {
          setPersons([...persons, response])
          setNewPerson({ name: '', number: '' })
        })
        .catch(() => {
          alert('Failed to add person. Try again later.')
        })
    } else {
      alert(`${trimmedName} is already in the phonebook`)
    }
  }
  const handleDelete = (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return

    phonebookService
      .remove(id)
      .then(() => {
        setPersons((prevPersons) =>
          prevPersons.filter((person) => person.id !== id)
        )
      })
      .catch(() => {
        alert('Already deleted from the server - refresh')
      })
  }

  const currentSearch = searchName
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchName.toLowerCase())
      )
    : persons

  // const personsToShow = currentSearch.map((person) => (
  //   <li key={person.id}>
  //     {person.name} - {person.number}
  //     <button onClick={() => handleDelete(person.id, person.name)}>
  //       delete
  //     </button>
  //   </li>
  // ))

  return (
    <div>
      <h1>Phonebook</h1>
      <Search searchName={searchName} setSearchName={setSearchName} />
      <PersonForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newPerson={newPerson}
      />
      <Persons persons={currentSearch} onDelete={handleDelete} />
    </div>
  )
}

export default App
