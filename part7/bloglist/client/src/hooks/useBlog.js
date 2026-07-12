import { create } from 'zustand'
import blogService from '../services/blogs'
import useNotificationStore from './useNotification'

const useBlogStore = create((set) => ({
  blogs: [],
  actions: {
    initializeBlogs: async () => {
      const blogs = await blogService.getAll()
      set(() => ({ blogs }))
    },
    addBlog: async (blog) => {
      try {
        const newBlog = await blogService.create(blog)
        set((state) => ({ blogs: [...state.blogs, newBlog] }))
        useNotificationStore
          .getState()
          .actions.setNotification('info', 'Blog added')

        return newBlog
      } catch (error) {
        useNotificationStore
          .getState()
          .actions.setNotification('error', 'Missing or incorrect blog data')

        throw error
      }
    },
    likeBlog: async (blog) => {
      try {
        const updatedBlog = await blogService.update({
          ...blog,
          likes: blog.likes + 1,
          user: blog.user.id,
        })

        set((state) => ({
          blogs: state.blogs.map((b) =>
            b.id === blog.id ? { ...updatedBlog, user: blog.user } : b,
          ),
        }))
      } catch (error) {
        useNotificationStore
          .getState()
          .actions.setNotification('error', "Couldn't handle the like request")

        throw error
      }
    },
    deleteBlog: async (blog) => {
      try {
        await blogService.remove(blog.id)
        set((state) => ({
          blogs: state.blogs.filter((b) => b.id !== blog.id),
        }))
        useNotificationStore
          .getState()
          .actions.setNotification(
            'info',
            `Removed blog: ${blog.title} by ${blog.author}`,
          )
      } catch (error) {
        useNotificationStore
          .getState()
          .actions.setNotification('error', "Couldn't remove the blog")
        throw error
      }
    },
  },
}))

export const useBlogs = () => useBlogStore((state) => state.blogs)
export const useBlogActions = () => useBlogStore((state) => state.actions)
