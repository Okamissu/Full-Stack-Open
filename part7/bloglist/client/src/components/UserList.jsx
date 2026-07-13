import useUsers from '../hooks/useUsers'
import { Table, Th, Td, TableLink } from '../styles'

const UserList = () => {
  const { data: users = [], isLoading } = useUsers()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h2>Users</h2>

      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Username</Th>
            <Th>Blogs created</Th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <Td>
                <TableLink to={`/users/${user.id}`}>{user.name}</TableLink>
              </Td>
              <Td>{user.username}</Td>
              <Td>{user.blogs.length}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default UserList
