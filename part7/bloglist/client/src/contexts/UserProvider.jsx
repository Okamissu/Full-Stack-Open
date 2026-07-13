import { useReducer } from 'react'
import UserContext from './UserContext'
import userReducer from '../reducers/userReducer'

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[user, dispatch]}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
