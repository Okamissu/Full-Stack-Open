import { useEffect, useState } from 'react'
import phonebookService from './services/phonebook'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [searchName, setSearchName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)

  const showInfo = (msg, timeout = 5000) => {
    setInfoMessage(msg)
    setTimeout(() => setInfoMessage(null), timeout)
  }

  const showError = (msg, timeout = 5000) => {
    setErrorMessage(msg)
    setTimeout(() => setErrorMessage(null), timeout)
  }

  // Example messages on mount - can be deleted later
  useEffect(() => {
    showError('Example error', 2000)
    showInfo('Example info', 2000)
  }, [])

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
          showInfo(`${trimmedName} was added to the phonebook.`)
        })
        .catch(() => {
          showError('Failed to add person. Try again later.')
        })
    } else {
      const replace = window.confirm(
        `${newPerson.name} is already in the phonebook - replace the old number with a new one?`
      )

      if (replace) {
        const personToUpdate = persons.find(
          (p) => p.name.toLowerCase() === newPerson.name.trim().toLowerCase()
        )

        if (personToUpdate) {
          phonebookService
            .patchNumber(personToUpdate.id, newPerson.number)
            .then((updatedPerson) => {
              setPersons((prevPersons) =>
                prevPersons.map((p) =>
                  p.id === updatedPerson.id ? updatedPerson : p
                )
              )
              setNewPerson({ name: '', number: '' })
              showInfo(
                `Successfully updated number of ${personToUpdate.name} to ${newPerson.number}.`
              )
            })
            .catch(() => {
              showError('Failed to add number. Try again later.')
            })
        }
      }
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
        showInfo(`Successfully deleted ${name}.`)
      })
      .catch(() => {
        showError('Already deleted from the server - refresh.')
      })
  }

  const currentSearch = searchName
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchName.toLowerCase())
      )
    : persons

  return (
    <div>
      <Notification message={errorMessage} type="error" />
      <h1>Phonebook</h1>
      <Search searchName={searchName} setSearchName={setSearchName} />
      <PersonForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newPerson={newPerson}
      />
      <Notification message={infoMessage} type="info" />
      <Persons persons={currentSearch} onDelete={handleDelete} />
    </div>
  )
}

export default App
