const PersonForm = ({ handleSubmit, handleChange, newPerson }) => {
  return (
    <>
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
            value={newPerson.number}
            placeholder="123567930"
            name="number"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm
