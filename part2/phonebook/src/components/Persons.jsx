const Persons = ({ persons, onDelete }) => (
  <ul>
    {persons.map((person) => (
      <li key={person.id}>
        {person.name} - {person.number}{' '}
        <button onClick={() => onDelete(person.id, person.name)}>delete</button>
      </li>
    ))}
  </ul>
)

export default Persons
