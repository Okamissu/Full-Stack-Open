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
  },
}))

export const useBlogs = () => useBlogStore((state) => state.blogs)
export const useBlogActions = () => useBlogStore((state) => state.actions)
