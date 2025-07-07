import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const isDuplicate = persons.some((person) => person.name === newName)

    if (!isDuplicate) {
      setPersons((prevPersons) => [...prevPersons, { name: newName }])
      setNewName('')
    } else {
      alert(`${newName} is already in the phonebook`)
    }
  }

  const personsToShow = persons.map((person) => (
    <li key={person.name}>{person.name}</li>
  ))

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <div>
          name:{' '}
          <input
            value={newName}
            placeholder="Chapello Roam"
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{personsToShow}</ul>
    </div>
  )
}

export default App
