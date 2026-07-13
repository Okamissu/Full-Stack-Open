import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })
}

export default useUsers
