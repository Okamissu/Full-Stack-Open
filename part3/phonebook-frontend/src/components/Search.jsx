const Search = ({ searchName, setSearchName }) => {
  return (
    <div>
      Search by name:{' '}
      <input
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      ></input>{' '}
    </div>
  )
}

export default Search
