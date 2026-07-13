import { useParams } from 'react-router-dom'
import useUsers from '../hooks/useUsers'
import {
  BlogCard,
  BlogTitle,
  CommentItem,
  CommentList,
  LinkButton,
} from '../styles'

const UserDetails = () => {
  const { id } = useParams()

  const { data: users = [], isLoading } = useUsers()

  if (isLoading) return <div>Loading...</div>

  const user = users.find((user) => user.id === id)

  if (!user) return <div>User not found</div>

  return (
    <BlogCard>
      <BlogTitle>{user.name}</BlogTitle>
      <div>
        <h4>Added blogs</h4>

        <CommentList>
          {user.blogs.length > 0 ? (
            user.blogs.map((blog) => (
              <CommentItem key={blog.id}>{blog.title}</CommentItem>
            ))
          ) : (
            <p>No blog was added yet</p>
          )}
        </CommentList>
      </div>

      <LinkButton to="/users">← Back to users</LinkButton>
    </BlogCard>
  )
}

export default UserDetails
