import useUsers from '../hooks/useUsers'

const UserList = () => {
  const { data: users = [], isLoading } = useUsers()

  if (isLoading) {
    return <div>Loading...</div>
  }

  console.log(users)

  return (
    <>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default UserList
