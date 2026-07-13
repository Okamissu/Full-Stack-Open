import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

const useBlogs = (dispatch, navigate) => {
  const queryClient = useQueryClient()

  const invalidateBlogs = () =>
    queryClient.invalidateQueries({ queryKey: ['blogs'] })

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  const createMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      invalidateBlogs()
      dispatch({ type: 'add_info' })
    },
    onError: () => {
      dispatch({ type: 'add_error' })
    },
  })

  const likeMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: invalidateBlogs,
    onError: () => {
      dispatch({ type: 'like_error' })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (blog) => blogService.remove(blog.id),

    onSuccess: (_, blog) => {
      invalidateBlogs()

      dispatch({
        type: 'remove_info',
        title: blog.title,
        author: blog.author,
      })

      navigate('/')
    },

    onError: () => {
      dispatch({ type: 'remove_error' })
    },
  })

  return {
    blogs,
    isLoading,

    createBlog: (blog) => createMutation.mutate(blog),

    likeBlog: (blog) =>
      likeMutation.mutate({
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      }),

    deleteBlog: (blog) => deleteMutation.mutate(blog),
  }
}

export default useBlogs
