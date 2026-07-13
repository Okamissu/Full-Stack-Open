import { useParams } from 'react-router-dom'
import useUsers from '../hooks/useUsers'

const UserDetails = () => {
  const { id } = useParams()

  const { data: users = [], isLoading } = useUsers()

  if (isLoading) return <div>Loading...</div>

  const user = users.find((user) => user.id === id)

  if (!user) return <div>User not found</div>

  return (
    <>
      <h2>{user.name}</h2>

      <h3>Added blogs</h3>

      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default UserDetails
